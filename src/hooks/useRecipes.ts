import { useState, useMemo } from 'react';
import { Recipe, FilterOptions } from '../types/recipe';
import { recipes } from '../data/recipes';

export const useRecipes = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [filters, setFilters] = useState<FilterOptions>({
    maxCost: 10,
    maxTime: 60,
    difficulty: [],
    dietary: [],
    mealType: []
  });

  const filteredRecipes = useMemo(() => {
    return recipes.filter(recipe => {
      // Category filter
      const matchesCategory = selectedCategory === null || recipe.category === selectedCategory;

      // Search filter
      const matchesSearch = searchTerm === '' || 
        recipe.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        recipe.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        recipe.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase())) ||
        recipe.ingredients.some(ingredient => 
          ingredient.name.toLowerCase().includes(searchTerm.toLowerCase())
        );

      // Cost filter
      const matchesCost = recipe.estimatedCost <= filters.maxCost;

      // Time filter
      const totalTime = recipe.prepTime + recipe.cookTime;
      const matchesTime = totalTime <= filters.maxTime;

      // Difficulty filter
      const matchesDifficulty = filters.difficulty.length === 0 || 
        filters.difficulty.includes(recipe.difficulty);

      // Dietary filter
      const matchesDietary = filters.dietary.length === 0 ||
        filters.dietary.some(dietary => recipe.tags.includes(dietary));

      // Meal type filter
      const matchesMealType = filters.mealType.length === 0 ||
        filters.mealType.some(mealType => recipe.tags.includes(mealType));

      return matchesSearch && matchesCost && matchesTime && 
             matchesDifficulty && matchesDietary && matchesMealType && matchesCategory;
    });
  }, [searchTerm, filters, selectedCategory]);

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