
import React from 'react';
import { Message } from '../types';

interface ChatBubbleProps {
  message: Message;
}

export const ChatBubble: React.FC<ChatBubbleProps> = ({ message }) => {
  const isUser = message.sender === 'user';
  const bubbleClasses = isUser
    ? 'bg-purple-500 text-white self-end rounded-br-none'
    : 'bg-white text-gray-800 self-start rounded-bl-none shadow-sm';

  return (
    <div className={`flex ${isUser ? 'justify-end' : 'justify-start'} animate-fade-in`}>
      <div className={`max-w-xs md:max-w-md lg:max-w-lg px-4 py-3 rounded-2xl ${bubbleClasses}`}>
        <p className="whitespace-pre-wrap">{message.text}</p>
      </div>
    </div>
  );
};

// Add keyframes for animation in index.html or a global style setup if needed.
// For simplicity here, we can add a style tag or rely on Tailwind's animation capabilities.
// Let's add it via Tailwind config if we had one, but with CDN we can do this:
const style = document.createElement('style');
style.innerHTML = `
  @keyframes fade-in {
    from { opacity: 0; transform: translateY(10px); }
    to { opacity: 1; transform: translateY(0); }
  }
  .animate-fade-in {
    animation: fade-in 0.3s ease-out;
  }
`;
document.head.appendChild(style);
