

import React from 'react';
import type { Category } from '../types';

interface CategoryCardProps {
  category: Category;
  onClick: (category: Category) => void;
}

const CategoryCard: React.FC<CategoryCardProps> = ({ category, onClick }) => {
  const Icon = category.icon;
  // Fix: The original inline style caused a TypeScript error and had an invalid value.
  // This approach is cleaner and uses Tailwind's features correctly by dynamically creating a focus ring class
  // that matches the card's background color.
  const ringColorClass = category.color.replace('bg-', 'focus:ring-');

  return (
    <button
      onClick={() => onClick(category)}
      className={`group flex flex-col items-center justify-center p-6 rounded-2xl shadow-lg hover:shadow-2xl transform hover:-translate-y-2 transition-all duration-300 ease-in-out cursor-pointer text-white ${category.color} focus:outline-none focus:ring-4 focus:ring-opacity-50 ${ringColorClass}`}
    >
      <div className="bg-white bg-opacity-20 p-4 rounded-full mb-4">
        <Icon className="w-12 h-12" />
      </div>
      <h3 className="text-xl font-bold">{category.name}</h3>
      <p className="text-sm mt-1 opacity-90 text-center">{category.description}</p>
    </button>
  );
};

export default CategoryCard;