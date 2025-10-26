
import React from 'react';

export const TypingIndicator: React.FC = () => (
  <div className="flex items-center space-x-1.5 self-start">
    <div className="w-2 h-2 bg-pink-300 rounded-full animate-pulse"></div>
    <div className="w-2 h-2 bg-pink-300 rounded-full animate-pulse" style={{ animationDelay: '0.2s' }}></div>
    <div className="w-2 h-2 bg-pink-300 rounded-full animate-pulse" style={{ animationDelay: '0.4s' }}></div>
  </div>
);
