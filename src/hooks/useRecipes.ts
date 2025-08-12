import { useState, useMemo } from 'react';
import { Recipe, FilterOptions } from '../types/recipe';
import { recipes } from '../data/recipes';

export const useRecipes = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [filters, setFilters] = useState<FilterOptions>({
    maxCost: 15,
    maxTime: 120,
    difficulty: [],
    dietary: [],
    mealType: []
  });

  const filteredRecipes = useMemo(() => {
    return recipes.filter(recipe => {
      // Category filter
      if (selectedCategory && recipe.categoryId !== selectedCategory) {
        return false;
      }

      // Search filter
      if (searchTerm) {
        const searchLower = searchTerm.toLowerCase();
        const matchesName = recipe.name.toLowerCase().includes(searchLower);
        const matchesDescription = recipe.description.toLowerCase().includes(searchLower);
        const matchesTags = recipe.tags.some(tag => tag.toLowerCase().includes(searchLower));
        const matchesIngredients = recipe.ingredients.some(ingredient => 
          ingredient.name.toLowerCase().includes(searchLower)
        );
        
        if (!matchesName && !matchesDescription && !matchesTags && !matchesIngredients) {
          return false;
        }
      }

      // Cost filter
      if (recipe.estimatedCost > filters.maxCost) {
        return false;
      }

      // Time filter
      if ((recipe.prepTime + recipe.cookTime) > filters.maxTime) {
        return false;
      }

      // Difficulty filter
      if (filters.difficulty.length > 0 && !filters.difficulty.includes(recipe.difficulty)) {
        return false;
      }

      // Dietary filter
      if (filters.dietary.length > 0) {
        const hasMatchingDietary = filters.dietary.some(diet => recipe.dietary.includes(diet));
        if (!hasMatchingDietary) {
          return false;
        }
      }

      // Meal type filter
      if (filters.mealType.length > 0) {
        const hasMatchingMealType = filters.mealType.some(meal => recipe.mealType.includes(meal));
        if (!hasMatchingMealType) {
          return false;
        }
      }

      return true;
    });
  }, [searchTerm, selectedCategory, filters]);

  return {
    recipes: filteredRecipes,
    searchTerm,
    setSearchTerm,
    filters,
    setFilters,
    selectedCategory,
    setSelectedCategory,
    totalRecipes: recipes.length
  };
};