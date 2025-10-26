
import React, { useState, useEffect, useRef, useCallback } from 'react';
import { ChatBubble } from './components/ChatBubble';
import { ChatInput } from './components/ChatInput';
import { TypingIndicator } from './components/TypingIndicator';
import { Header } from './components/Header';
import { getAimaResponse, initializeChat } from './services/geminiService';
import { Message } from './types';
import { WELCOME_MESSAGE, FALLBACK_MESSAGES } from './constants';
import type { Chat } from '@google/genai';

const App: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const chatRef = useRef<Chat | null>(null);
  const chatContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    try {
      const storedMessages = localStorage.getItem('aima-chat-history');
      if (storedMessages) {
        setMessages(JSON.parse(storedMessages));
      } else {
        setMessages([WELCOME_MESSAGE]);
      }
    } catch (error) {
      console.error("Failed to parse chat history from localStorage", error);
      setMessages([WELCOME_MESSAGE]);
    }
    chatRef.current = initializeChat();
  }, []);

  useEffect(() => {
    localStorage.setItem('aima-chat-history', JSON.stringify(messages));
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
    }
  }, [messages]);
  
  const handleSendMessage = useCallback(async (text: string) => {
    if (!text.trim()) return;

    const userMessage: Message = { id: Date.now(), text, sender: 'user' };
    setMessages(prev => [...prev, userMessage]);
    setIsLoading(true);

    try {
      if (!chatRef.current) {
         chatRef.current = initializeChat();
      }
      const response = await getAimaResponse(chatRef.current, text);
      const aimaMessage: Message = { id: Date.now() + 1, text: response, sender: 'ai' };
      setMessages(prev => [...prev, aimaMessage]);
    } catch (error) {
      console.error('Gemini API error:', error);
      const fallbackText = FALLBACK_MESSAGES[Math.floor(Math.random() * FALLBACK_MESSAGES.length)];
      const fallbackMessage: Message = { id: Date.now() + 1, text: fallbackText, sender: 'ai' };
      setMessages(prev => [...prev, fallbackMessage]);
    } finally {
      setIsLoading(false);
    }
  }, []);

  return (
    <div className="flex flex-col h-screen bg-pink-50/50">
      <Header />
      <div ref={chatContainerRef} className="flex-1 overflow-y-auto p-4 md:p-6 space-y-4">
        {messages.map((msg) => (
          <ChatBubble key={msg.id} message={msg} />
        ))}
        {isLoading && <TypingIndicator />}
      </div>
      <ChatInput onSendMessage={handleSendMessage} isLoading={isLoading} />
    </div>
  );
};

export default App;
