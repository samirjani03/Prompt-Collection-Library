
import React from 'react';
import { PlusIcon } from './icons/PlusIcon';

interface HeaderProps {
  onAddNewClick: () => void;
}

export const Header: React.FC<HeaderProps> = ({ onAddNewClick }) => {
  return (
    <header className="bg-gray-900/80 backdrop-blur-sm sticky top-0 z-10 border-b border-gray-800">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <h1 className="text-2xl font-bold tracking-tight text-white">
            Prompt<span className="text-indigo-400">Library</span>
          </h1>
          <button
            onClick={onAddNewClick}
            className="flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-2 px-4 rounded-lg transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-900 focus:ring-indigo-500"
          >
            <PlusIcon />
            <span>New Prompt</span>
          </button>
        </div>
      </div>
    </header>
  );
};
