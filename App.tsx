
import React, { useState, useEffect, useMemo } from 'react';
import type { Prompt, Category } from './types';
import { INITIAL_PROMPTS, INITIAL_CATEGORIES } from './constants';
import { Header } from './components/Header';
import { PromptCard } from './components/PromptCard';
import { PromptModal } from './components/PromptModal';

const App: React.FC = () => {
  const [prompts, setPrompts] = useState<Prompt[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategoryId, setSelectedCategoryId] = useState<string>('all');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingPrompt, setEditingPrompt] = useState<Prompt | null>(null);

  useEffect(() => {
    try {
      const storedPrompts = localStorage.getItem('prompts');
      const storedCategories = localStorage.getItem('categories');
      if (storedPrompts && storedCategories) {
        setPrompts(JSON.parse(storedPrompts));
        setCategories(JSON.parse(storedCategories));
      } else {
        setPrompts(INITIAL_PROMPTS);
        setCategories(INITIAL_CATEGORIES);
      }
    } catch (error) {
      console.error("Failed to parse from localStorage", error);
      setPrompts(INITIAL_PROMPTS);
      setCategories(INITIAL_CATEGORIES);
    }
  }, []);

  useEffect(() => {
    try {
      localStorage.setItem('prompts', JSON.stringify(prompts));
    } catch (error) {
      console.error("Failed to save prompts to localStorage", error);
    }
  }, [prompts]);
  
  useEffect(() => {
    try {
      localStorage.setItem('categories', JSON.stringify(categories));
    } catch (error) {
      console.error("Failed to save categories to localStorage", error);
    }
  }, [categories]);

  const handleAddNewClick = () => {
    setEditingPrompt(null);
    setIsModalOpen(true);
  };

  const handleEditPrompt = (prompt: Prompt) => {
    setEditingPrompt(prompt);
    setIsModalOpen(true);
  };

  const handleDeletePrompt = (id: string) => {
    if(window.confirm('Are you sure you want to delete this prompt?')) {
      setPrompts(prompts.filter(p => p.id !== id));
    }
  };

  const handleSavePrompt = (promptToSave: Omit<Prompt, 'id'> & { id?: string }, newCategoryName?: string) => {
    let finalCategoryId = promptToSave.categoryId;
    let updatedCategories = categories;

    if (newCategoryName) {
      const existingCategory = categories.find(c => c.name.toLowerCase() === newCategoryName.toLowerCase());
      if (existingCategory) {
        finalCategoryId = existingCategory.id;
      } else {
        const newCategory: Category = { id: crypto.randomUUID(), name: newCategoryName };
        updatedCategories = [...categories, newCategory];
        setCategories(updatedCategories);
        finalCategoryId = newCategory.id;
      }
    }
    
    if (promptToSave.id) {
      setPrompts(prompts.map(p => p.id === promptToSave.id ? { ...p, ...promptToSave, categoryId: finalCategoryId } : p));
    } else {
      const newPrompt: Prompt = { ...promptToSave, id: crypto.randomUUID(), categoryId: finalCategoryId };
      setPrompts([newPrompt, ...prompts]);
    }
    setIsModalOpen(false);
    setEditingPrompt(null);
  };

  const filteredPrompts = useMemo(() => {
    return prompts
      .filter(prompt => selectedCategoryId === 'all' || prompt.categoryId === selectedCategoryId)
      .filter(prompt => 
        prompt.heading.toLowerCase().includes(searchTerm.toLowerCase()) || 
        prompt.description.toLowerCase().includes(searchTerm.toLowerCase())
      );
  }, [prompts, selectedCategoryId, searchTerm]);

  const getCategoryNameById = (id: string) => {
    return categories.find(c => c.id === id)?.name || 'Uncategorized';
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white font-sans">
      <Header onAddNewClick={handleAddNewClick} />
      <main className="container mx-auto p-4 sm:p-6 lg:p-8">
        <div className="flex flex-col md:flex-row gap-4 mb-8">
          <input
            type="text"
            placeholder="Search prompts..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full md:w-1/2 bg-gray-800 border border-gray-700 rounded-lg py-2 px-4 focus:ring-2 focus:ring-indigo-500 focus:outline-none transition"
          />
          <div className="flex-grow">
            <select
              value={selectedCategoryId}
              onChange={(e) => setSelectedCategoryId(e.target.value)}
              className="w-full bg-gray-800 border border-gray-700 rounded-lg py-2 px-4 focus:ring-2 focus:ring-indigo-500 focus:outline-none transition appearance-none"
            >
              <option value="all">All Categories</option>
              {categories.map(category => (
                <option key={category.id} value={category.id}>{category.name}</option>
              ))}
            </select>
          </div>
        </div>

        {filteredPrompts.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredPrompts.map(prompt => (
              <PromptCard 
                key={prompt.id} 
                prompt={prompt} 
                categoryName={getCategoryNameById(prompt.categoryId)}
                onEdit={handleEditPrompt}
                onDelete={handleDeletePrompt}
              />
            ))}
          </div>
        ) : (
          <div className="text-center py-16">
            <h2 className="text-2xl font-semibold text-gray-400">No Prompts Found</h2>
            <p className="text-gray-500 mt-2">Try adjusting your search or filter, or add a new prompt!</p>
          </div>
        )}
      </main>
      
      {isModalOpen && (
        <PromptModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          onSave={handleSavePrompt}
          prompt={editingPrompt}
          categories={categories}
        />
      )}
    </div>
  );
};

export default App;
