import React from 'react';
import { Recipe } from '../types/recipe';
import { categories } from '../data/categories';

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
    return recipes.filter(recipe => recipe.categoryId === categoryId).length;
  };

  const groupedCategories = [
    {
      title: "Everyday Survival",
      categories: categories.filter(cat => 
        ['before-payday', 'cheap-cheerful', 'fridge-cleanout'].includes(cat.id)
      )
    },
    {
      title: "Impress Without Stress", 
      categories: categories.filter(cat => 
        ['date-night', 'flatmate-feast', 'meet-parents'].includes(cat.id)
      )
    },
    {
      title: "Quick Saves",
      categories: categories.filter(cat => 
        ['10-minutes', 'one-pan', 'no-stove'].includes(cat.id)
      )
    },
    {
      title: "Health on a Budget",
      categories: categories.filter(cat => 
        ['energy-boost', 'veggie-first', 'feel-good'].includes(cat.id)
      )
    },
    {
      title: "Weekend Projects",
      categories: categories.filter(cat => 
        ['meal-prep', 'bake-relax', 'diy-takeout'].includes(cat.id)
      )
    }
  ];

  return (
    <div className="space-y-8">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-gray-900 mb-2">What's your vibe today?</h2>
        <p className="text-gray-600">Choose a category that matches your mood, budget, or situation</p>
      </div>

      {groupedCategories.map((group, groupIndex) => (
        <div key={groupIndex}>
          <h3 className="text-xl font-semibold text-gray-800 mb-4">{group.title}</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {group.categories.map((category) => {
              const recipeCount = getCategoryRecipeCount(category.id);
              return (
                <div
                  key={category.id}
                  onClick={() => onCategorySelect(category.id)}
                  className={`p-6 rounded-xl cursor-pointer transition-all duration-300 hover:scale-105 hover:shadow-lg ${category.bgColor} ${
                    selectedCategory === category.id ? 'ring-2 ring-blue-500' : ''
                  }`}
                >
                  <div className="flex items-center gap-3 mb-3">
                    <span className="text-3xl">{category.icon}</span>
                    <div>
                      <h4 className={`font-bold text-lg ${category.color}`}>{category.name}</h4>
                      <p className="text-sm text-gray-600">{recipeCount} recipes</p>
                    </div>
                  </div>
                  <p className={`text-sm ${category.color} opacity-80`}>{category.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      ))}
    </div>
  );
};