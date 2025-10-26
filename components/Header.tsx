
import React from 'react';

export const Header: React.FC = () => (
  <header className="bg-white/80 backdrop-blur-md shadow-md p-4 flex items-center sticky top-0 z-10">
    <div className="relative">
      <img
        src="https://picsum.photos/seed/aima-avatar/40/40"
        alt="Aima's avatar"
        className="w-10 h-10 rounded-full"
      />
      <span className="absolute bottom-0 right-0 block h-2.5 w-2.5 rounded-full bg-green-400 ring-2 ring-white"></span>
    </div>
    <div className="ml-3">
      <h1 className="text-lg font-bold text-gray-800">Aima 💞</h1>
      <p className="text-sm text-green-600">Online</p>
    </div>
  </header>
);
