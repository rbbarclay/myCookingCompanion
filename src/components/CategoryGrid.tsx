import React from 'react';
import { recipeCategories, getCategoryById } from '../data/categories';
import { Recipe } from '../types/recipe';

interface CategoryGridProps {
  recipes: Recipe[];
  onCategorySelect: (categoryId: string | null) => void;
  selectedCategory: string | null;
}

export const CategoryGrid: React.FC<CategoryGridProps> = ({ 
  recipes, 
  onCategorySelect, 
  selectedCategory 
}) => {
  const getCategoryRecipeCount = (categoryId: string) => {
    return recipes.filter(recipe => recipe.category === categoryId).length;
  };

  const categoryGroups = [
    {
      title: 'Everyday Survival',
      description: 'Making it work when funds are low',
      categories: ['before-payday', 'cheap-cheerful', 'fridge-cleanout']
    },
    {
      title: 'Impress Without Stress',
      description: 'Look like a pro without the price tag',
      categories: ['date-night', 'flatmate-feast', 'meet-parents']
    },
    {
      title: 'Quick Saves',
      description: 'Fast solutions for busy lives',
      categories: ['ten-minutes', 'one-pan', 'no-stove']
    },
    {
      title: 'Health on a Budget',
      description: 'Nutritious meals that don\'t cost extra',
      categories: ['energy-boost', 'veggie-first', 'feel-good']
    },
    {
      title: 'Weekend Projects',
      description: 'When you have time to get creative',
      categories: ['meal-prep', 'bake-relax', 'diy-takeout']
    }
  ];

  return (
    <div className="space-y-8">
      <div className="text-center mb-8">
        <h2 className="text-2xl font-bold text-gray-800 mb-2">Find Your Vibe</h2>
        <p className="text-gray-600">Choose a category that matches your mood, budget, or situation</p>
      </div>

      {/* All Recipes Button */}
      <div className="mb-6">
        <button
          onClick={() => onCategorySelect(null)}
          className={`w-full p-4 rounded-xl border-2 transition-all duration-200 ${
            selectedCategory === null
              ? 'border-blue-500 bg-blue-50 text-blue-700'
              : 'border-gray-200 bg-white text-gray-700 hover:border-gray-300 hover:bg-gray-50'
          }`}
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <span className="text-2xl">🍽️</span>
              <div className="text-left">
                <div className="font-semibold">All Recipes</div>
                <div className="text-sm opacity-75">Browse everything we've got</div>
              </div>
            </div>
            <div className="text-sm font-medium">
              {recipes.length} recipes
            </div>
          </div>
        </button>
      </div>

      {categoryGroups.map((group) => (
        <div key={group.title} className="space-y-4">
          <div className="text-center">
            <h3 className="text-lg font-semibold text-gray-800">{group.title}</h3>
            <p className="text-sm text-gray-600">{group.description}</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {group.categories.map((categoryId) => {
              const category = getCategoryById(categoryId);
              if (!category) return null;
              
              const recipeCount = getCategoryRecipeCount(categoryId);
              const isSelected = selectedCategory === categoryId;
              
              return (
                <button
                  key={categoryId}
                  onClick={() => onCategorySelect(categoryId)}
                  className={`p-4 rounded-xl border-2 transition-all duration-200 text-left ${
                    isSelected
                      ? `border-blue-500 ${category.bgColor} ${category.color}`
                      : `border-gray-200 bg-white text-gray-700 hover:border-gray-300 hover:${category.bgColor}`
                  }`}
                >
                  <div className="flex items-start gap-3">
                    <span className="text-2xl">{category.icon}</span>
                    <div className="flex-1 min-w-0">
                      <div className="font-semibold text-sm mb-1">{category.name}</div>
                      <div className="text-xs opacity-75 line-clamp-2 mb-2">
                        {category.description}
                      </div>
                      <div className="text-xs font-medium">
                        {recipeCount} recipe{recipeCount !== 1 ? 's' : ''}
                      </div>
                    </div>
                  </div>
                </button>
              );
            })}
          </div>
        </div>
      ))}
    </div>
  );
};