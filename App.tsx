import React, { useState, useEffect, useCallback } from 'react';
import type { Category, CategoryInfo } from './types';
import CategoryCard from './components/CategoryCard';
import DetailView from './components/DetailView';
import { generateScienceContent } from './services/geminiService';
import { PawIcon, LeafIcon, MeatIcon, SnakeIcon, SnailIcon, BirdIcon, FishIcon, InsectIcon, AmphibianIcon, OmnivoreIcon } from './components/IconComponents';

const categories: Category[] = [
  { id: 'mammals', name: 'Mammals', icon: PawIcon, color: 'bg-blue-500', description: 'Friends with fur and milk!' },
  { id: 'reptiles', name: 'Reptiles', icon: SnakeIcon, color: 'bg-green-600', description: 'Animals with scaly skin' },
  { id: 'birds', name: 'Birds', icon: BirdIcon, color: 'bg-cyan-500', description: 'Feathered flying friends!' },
  { id: 'fish', name: 'Fish', icon: FishIcon, color: 'bg-indigo-500', description: 'Swimmers of the deep!' },
  { id: 'amphibians', name: 'Amphibians', icon: AmphibianIcon, color: 'bg-teal-500', description: 'Live in water and on land!' },
  { id: 'insects', name: 'Insects', icon: InsectIcon, color: 'bg-lime-600', description: 'Tiny six-legged critters!' },
  { id: 'invertebrates', name: 'Invertebrates', icon: SnailIcon, color: 'bg-purple-500', description: 'Creatures without a backbone' },
  { id: 'herbivores', name: 'Herbivores', icon: LeafIcon, color: 'bg-yellow-500', description: 'The vegetable lovers!' },
  { id: 'carnivores', name: 'Carnivores', icon: MeatIcon, color: 'bg-red-500', description: 'The skilled hunters!' },
  { id: 'omnivores', name: 'Omnivores', icon: OmnivoreIcon, color: 'bg-orange-500', description: 'They eat plants and meat!' },
];

const App: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<Category | null>(null);
  const [categoryInfo, setCategoryInfo] = useState<CategoryInfo | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const fetchContent = useCallback(async () => {
    if (!selectedCategory) return;

    setIsLoading(true);
    setError(null);
    setCategoryInfo(null);

    try {
      const content = await generateScienceContent(selectedCategory.name);
      setCategoryInfo(content);
    } catch (e: any) {
      setError('Oops! Something went wrong while fetching the info. Please try again.');
      console.error(e);
    } finally {
      setIsLoading(false);
    }
  }, [selectedCategory]);

  useEffect(() => {
    fetchContent();
  }, [fetchContent]);

  const handleSelectCategory = (category: Category) => {
    setSelectedCategory(category);
  };

  const handleGoBack = () => {
    setSelectedCategory(null);
    setCategoryInfo(null);
    setError(null);
  };

  return (
    <div className="bg-gray-100 min-h-screen p-4 sm:p-6 md:p-8">
      <div className="max-w-7xl mx-auto">
        <header className="text-center mb-8">
          <h1 className="text-4xl sm:text-5xl font-extrabold text-gray-800">
            The Wonderful World of Science
          </h1>
          <p className="text-lg text-gray-600 mt-2">
            Choose a category and start learning!
          </p>
        </header>

        <main>
          {!selectedCategory ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
              {categories.map(cat => (
                <CategoryCard key={cat.id} category={cat} onClick={handleSelectCategory} />
              ))}
            </div>
          ) : (
            <DetailView 
              info={categoryInfo}
              isLoading={isLoading}
              error={error}
              onBack={handleGoBack}
            />
          )}
        </main>
      </div>
    </div>
  );
};

export default App;