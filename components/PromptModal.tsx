
import React, { useState, useEffect } from 'react';
import type { Prompt, Category } from '../types';
import { XMarkIcon } from './icons/XMarkIcon';

interface PromptModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (prompt: Omit<Prompt, 'id'> & { id?: string }, newCategoryName?: string) => void;
  prompt: Prompt | null;
  categories: Category[];
}

export const PromptModal: React.FC<PromptModalProps> = ({ isOpen, onClose, onSave, prompt, categories }) => {
  const [heading, setHeading] = useState('');
  const [description, setDescription] = useState('');
  const [categoryId, setCategoryId] = useState('');
  const [newCategoryName, setNewCategoryName] = useState('');

  useEffect(() => {
    if (prompt) {
      setHeading(prompt.heading);
      setDescription(prompt.description);
      setCategoryId(prompt.categoryId);
      setNewCategoryName('');
    } else {
      setHeading('');
      setDescription('');
      setCategoryId(categories.length > 0 ? categories[0].id : 'new');
      setNewCategoryName('');
    }
  }, [prompt, categories, isOpen]);

  const handleSave = () => {
    if (!heading.trim() || !description.trim()) {
      alert('Heading and description cannot be empty.');
      return;
    }
    if (categoryId === 'new' && !newCategoryName.trim()) {
      alert('Please provide a name for the new category.');
      return;
    }

    onSave({
      id: prompt?.id,
      heading,
      description,
      categoryId: categoryId === 'new' ? '' : categoryId
    }, categoryId === 'new' ? newCategoryName : undefined);
  };
  
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-75 flex justify-center items-center z-50 p-4" onClick={onClose}>
      <div className="bg-gray-800 rounded-xl shadow-2xl w-full max-w-2xl transform transition-all" onClick={e => e.stopPropagation()}>
        <div className="flex justify-between items-center p-5 border-b border-gray-700">
          <h2 className="text-xl font-bold text-white">{prompt ? 'Edit Prompt' : 'Add New Prompt'}</h2>
          <button onClick={onClose} className="text-gray-400 hover:text-white transition-colors">
            <XMarkIcon />
          </button>
        </div>
        <div className="p-6 space-y-6">
          <div>
            <label htmlFor="heading" className="block text-sm font-medium text-gray-300 mb-1">Heading</label>
            <input
              id="heading"
              type="text"
              value={heading}
              onChange={e => setHeading(e.target.value)}
              className="w-full bg-gray-900 border border-gray-700 rounded-lg py-2 px-4 text-white focus:ring-2 focus:ring-indigo-500 focus:outline-none transition"
              placeholder="e.g., Explain Quantum Computing"
            />
          </div>
          <div>
            <label htmlFor="description" className="block text-sm font-medium text-gray-300 mb-1">Prompt</label>
            <textarea
              id="description"
              value={description}
              onChange={e => setDescription(e.target.value)}
              rows={8}
              className="w-full bg-gray-900 border border-gray-700 rounded-lg py-2 px-4 text-white focus:ring-2 focus:ring-indigo-500 focus:outline-none transition"
              placeholder="Enter the full prompt text here..."
            />
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label htmlFor="category" className="block text-sm font-medium text-gray-300 mb-1">Category</label>
              <select
                id="category"
                value={categoryId}
                onChange={e => setCategoryId(e.target.value)}
                className="w-full bg-gray-900 border border-gray-700 rounded-lg py-2 px-4 text-white focus:ring-2 focus:ring-indigo-500 focus:outline-none transition appearance-none"
              >
                {categories.map(cat => <option key={cat.id} value={cat.id}>{cat.name}</option>)}
                <option value="new">-- Add New Category --</option>
              </select>
            </div>
            {categoryId === 'new' && (
              <div>
                <label htmlFor="newCategory" className="block text-sm font-medium text-gray-300 mb-1">New Category Name</label>
                <input
                  id="newCategory"
                  type="text"
                  value={newCategoryName}
                  onChange={e => setNewCategoryName(e.target.value)}
                  className="w-full bg-gray-900 border border-gray-700 rounded-lg py-2 px-4 text-white focus:ring-2 focus:ring-indigo-500 focus:outline-none transition"
                  placeholder="e.g., Productivity"
                />
              </div>
            )}
          </div>
        </div>
        <div className="bg-gray-800/50 px-6 py-4 border-t border-gray-700 flex justify-end gap-3 rounded-b-xl">
          <button onClick={onClose} className="py-2 px-4 bg-gray-700 hover:bg-gray-600 text-white font-semibold rounded-lg transition-colors">
            Cancel
          </button>
          <button onClick={handleSave} className="py-2 px-4 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold rounded-lg transition-colors">
            Save Prompt
          </button>
        </div>
      </div>
    </div>
  );
};
