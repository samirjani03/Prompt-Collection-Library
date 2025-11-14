
import React, { useState } from 'react';
import type { Prompt } from '../types';
import { CopyIcon } from './icons/CopyIcon';
import { EditIcon } from './icons/EditIcon';
import { TrashIcon } from './icons/TrashIcon';
import { CheckIcon } from './icons/CheckIcon';

interface PromptCardProps {
  prompt: Prompt;
  categoryName: string;
  onEdit: (prompt: Prompt) => void;
  onDelete: (id: string) => void;
}

export const PromptCard: React.FC<PromptCardProps> = ({ prompt, categoryName, onEdit, onDelete }) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(prompt.description);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="bg-gray-800 border border-gray-700 rounded-xl shadow-lg flex flex-col h-full overflow-hidden transform hover:-translate-y-1 transition-transform duration-300">
      <div className="p-5 flex-grow">
        <div className="flex justify-between items-start mb-2">
          <h3 className="text-lg font-bold text-white pr-2">{prompt.heading}</h3>
          <span className="flex-shrink-0 bg-indigo-500/20 text-indigo-300 text-xs font-semibold px-2.5 py-0.5 rounded-full">{categoryName}</span>
        </div>
        <p className="text-gray-400 text-sm line-clamp-4">
          {prompt.description}
        </p>
      </div>
      <div className="bg-gray-800/50 border-t border-gray-700 p-3 flex items-center justify-end gap-2">
        <button
          onClick={handleCopy}
          className={`flex items-center gap-1.5 text-sm font-medium py-2 px-3 rounded-md transition-colors duration-200 ${
            copied 
              ? 'bg-green-600 text-white' 
              : 'bg-gray-700 hover:bg-gray-600 text-gray-300'
          }`}
          aria-label={copied ? 'Copied' : 'Copy prompt'}
        >
          {copied ? <CheckIcon /> : <CopyIcon />}
          <span>{copied ? 'Copied!' : 'Copy'}</span>
        </button>
        <button 
          onClick={() => onEdit(prompt)} 
          className="p-2 text-gray-400 hover:text-white hover:bg-gray-700 rounded-md transition-colors"
          aria-label="Edit prompt"
        >
          <EditIcon />
        </button>
        <button 
          onClick={() => onDelete(prompt.id)} 
          className="p-2 text-gray-400 hover:text-red-500 hover:bg-gray-700 rounded-md transition-colors"
          aria-label="Delete prompt"
        >
          <TrashIcon />
        </button>
      </div>
    </div>
  );
};
