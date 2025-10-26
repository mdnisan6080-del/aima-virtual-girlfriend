
import React, { useState } from 'react';

interface ChatInputProps {
  onSendMessage: (text: string) => void;
  isLoading: boolean;
}

export const ChatInput: React.FC<ChatInputProps> = ({ onSendMessage, isLoading }) => {
  const [text, setText] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (text.trim() && !isLoading) {
      onSendMessage(text);
      setText('');
    }
  };

  return (
    <div className="p-4 bg-white/80 backdrop-blur-md shadow-[0_-2px_5px_-1px_rgba(0,0,0,0.05)]">
      <form onSubmit={handleSubmit} className="flex items-center space-x-3">
        <input
          type="text"
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="এখানে মেসেজ লিখুন..."
          disabled={isLoading}
          className="flex-1 w-full px-4 py-2 text-gray-700 bg-gray-100 border border-transparent rounded-full focus:outline-none focus:ring-2 focus:ring-pink-400 focus:border-transparent transition"
        />
        <button
          type="submit"
          disabled={isLoading}
          className="flex-shrink-0 w-10 h-10 bg-pink-500 text-white rounded-full flex items-center justify-center hover:bg-pink-600 disabled:bg-pink-300 disabled:cursor-not-allowed transform transition-transform duration-200 hover:scale-110 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-pink-500"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
        </button>
      </form>
    </div>
  );
};
