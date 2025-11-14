
import type { Category, Prompt } from './types';

export const INITIAL_CATEGORIES: Category[] = [
  { id: '1', name: 'Study' },
  { id: '2', name: 'Business' },
  { id: '3', name: 'Creative' },
  { id: '4', name: 'Coding' },
];

export const INITIAL_PROMPTS: Prompt[] = [
  {
    id: 'p1',
    heading: 'Explain Quantum Computing',
    description: 'Explain the concept of quantum computing in simple terms, as if you were teaching it to a high school student. Cover qubits, superposition, and entanglement.',
    categoryId: '1',
  },
  {
    id: 'p2',
    heading: 'Draft a Marketing Email',
    description: 'Draft a marketing email for a new product launch. The product is a smart coffee mug that keeps drinks at the perfect temperature. The target audience is tech-savvy professionals. Highlight key features and include a call-to-action with a limited-time discount.',
    categoryId: '2',
  },
  {
    id: 'p3',
    heading: 'Brainstorm Short Story Ideas',
    description: 'Generate five short story ideas based on the theme of "a lost memory". Each idea should include a protagonist, a setting, and a potential conflict.',
    categoryId: '3',
  },
  {
    id: 'p4',
    heading: 'Write a Python Function',
    description: 'Write a Python function that takes a list of URLs as input, asynchronously fetches the content from each URL, and returns a list of the website titles. Handle potential errors like network issues or invalid URLs.',
    categoryId: '4',
  },
   {
    id: 'p5',
    heading: 'Summarize a Research Paper',
    description: 'I will provide you with a research paper on [topic]. Please summarize the key findings, methodology, and conclusions in three concise paragraphs.',
    categoryId: '1',
  },
   {
    id: 'p6',
    heading: 'Generate a Business Plan Outline',
    description: 'Create a comprehensive business plan outline for a startup offering personalized subscription boxes for eco-friendly products. Include sections for Executive Summary, Market Analysis, Products & Services, Marketing & Sales Strategy, and Financial Projections.',
    categoryId: '2',
  },
];
