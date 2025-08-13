import { useState, useMemo, useEffect } from 'react';
import { EnhancedRecipe, EnhancedFilterOptions } from '../types/enhanced-recipe';
import { RecipeManager } from '../utils/recipe-manager';
import { recipes as legacyRecipes } from '../data/recipes';

export const useEnhancedRecipes = () => {
  const [enhancedRecipes, setEnhancedRecipes] = useState<EnhancedRecipe[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [filters, setFilters] = useState<EnhancedFilterOptions>({
    maxCost: 15,
    maxTime: 120,
    skillLevel: [],
    dietary: [],
    mealType: [],
    equipment: [],
    primaryCategory: []
  });
  const [isLoading, setIsLoading] = useState(true);
  const [hasBeenMigrated, setHasBeenMigrated] = useState(false);

  // Load recipes on mount and migrate legacy recipes if needed
  useEffect(() => {
    const loadRecipes = async () => {
      try {
        setIsLoading(true);
        
        // Check if we have any enhanced recipes
        const existingEnhanced = await RecipeManager.getAllRecipes();
        
        // If no enhanced recipes exist, migrate the legacy ones
        if (existingEnhanced.length === 0 && !hasBeenMigrated) {
          console.log('Migrating legacy recipes to enhanced format...');
          await RecipeManager.migrateLegacyRecipes(legacyRecipes);
          setHasBeenMigrated(true);
          
          // Load the newly migrated recipes
          const migratedRecipes = await RecipeManager.getAllRecipes();
          setEnhancedRecipes(migratedRecipes);
        } else {
          setEnhancedRecipes(existingEnhanced);
        }
      } catch (error) {
        console.error('Error loading recipes:', error);
        // Fallback to legacy recipes converted on the fly
        const converted = legacyRecipes.map(recipe => RecipeManager.convertLegacyToEnhanced(recipe));
        setEnhancedRecipes(converted);
      } finally {
        setIsLoading(false);
      }
    };

    loadRecipes();
  }, [hasBeenMigrated]);

  // Filter recipes based on search term, category, and filters
  const filteredRecipes = useMemo(() => {
    return enhancedRecipes.filter(recipe => {
      // Category filter
      if (selectedCategory && recipe.primaryCategory !== selectedCategory) {
        return false;
      }

      // Search filter
      if (searchTerm) {
        const searchLower = searchTerm.toLowerCase();
        const searchableText = [
          recipe.title,
          recipe.emotionalHook,
          recipe.primaryCategory,
          ...recipe.secondaryTags,
          ...recipe.ingredients.map(ing => ing.name),
          ...recipe.tips,
          ...recipe.dietary,
          ...recipe.mealType
        ].join(' ').toLowerCase();
        
        if (!searchableText.includes(searchLower)) {
          return false;
        }
      }

      // Cost filter
      if (recipe.costPerServing > filters.maxCost) {
        return false;
      }

      // Time filter
      if (recipe.totalTime > filters.maxTime) {
        return false;
      }

      // Skill level filter
      if (filters.skillLevel.length > 0 && !filters.skillLevel.includes(recipe.skillLevel)) {
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

      // Equipment filter
      if (filters.equipment.length > 0) {
        const hasMatchingEquipment = filters.equipment.some(equipment => 
          recipe.equipmentNeeded.includes(equipment) ||
          recipe.equipmentVariations.some(variation => variation.equipment === equipment)
        );
        if (!hasMatchingEquipment) {
          return false;
        }
      }

      // Primary category filter (different from selectedCategory for multi-category filtering)
      if (filters.primaryCategory.length > 0 && !filters.primaryCategory.includes(recipe.primaryCategory)) {
        return false;
      }

      return true;
    });
  }, [enhancedRecipes, searchTerm, selectedCategory, filters]);

  // Convert enhanced recipes to legacy format for backward compatibility
  const legacyCompatibleRecipes = useMemo(() => {
    return filteredRecipes.map(recipe => RecipeManager.convertEnhancedToLegacy(recipe));
  }, [filteredRecipes]);

  // Recipe management functions
  const addRecipe = async (recipe: EnhancedRecipe) => {
    try {
      await RecipeManager.saveRecipe(recipe);
      const updatedRecipes = await RecipeManager.getAllRecipes();
      setEnhancedRecipes(updatedRecipes);
      return recipe.id;
    } catch (error) {
      console.error('Error adding recipe:', error);
      throw error;
    }
  };

  const updateRecipe = async (id: string, updates: Partial<EnhancedRecipe>) => {
    try {
      const existing = await RecipeManager.getRecipeById(id);
      if (!existing) throw new Error('Recipe not found');
      
      const updated = { 
        ...existing, 
        ...updates, 
        id, // Ensure ID doesn't change
        updatedAt: new Date().toISOString() 
      };
      
      await RecipeManager.saveRecipe(updated);
      const updatedRecipes = await RecipeManager.getAllRecipes();
      setEnhancedRecipes(updatedRecipes);
    } catch (error) {
      console.error('Error updating recipe:', error);
      throw error;
    }
  };

  const deleteRecipe = async (id: string) => {
    try {
      await RecipeManager.deleteRecipe(id);
      const updatedRecipes = await RecipeManager.getAllRecipes();
      setEnhancedRecipes(updatedRecipes);
    } catch (error) {
      console.error('Error deleting recipe:', error);
      throw error;
    }
  };

  const getRecipeById = async (id: string): Promise<EnhancedRecipe | null> => {
    return await RecipeManager.getRecipeById(id);
  };

  const searchRecipes = async (query: string): Promise<EnhancedRecipe[]> => {
    return await RecipeManager.searchRecipes(query);
  };

  // Export/Import functions
  const exportRecipes = async (): Promise<EnhancedRecipe[]> => {
    return await RecipeManager.exportRecipes();
  };

  const importRecipes = async (recipes: EnhancedRecipe[]) => {
    try {
      await RecipeManager.importRecipes(recipes);
      const updatedRecipes = await RecipeManager.getAllRecipes();
      setEnhancedRecipes(updatedRecipes);
    } catch (error) {
      console.error('Error importing recipes:', error);
      throw error;
    }
  };

  // Statistics
  const stats = useMemo(() => {
    const allRecipes = enhancedRecipes;
    const categoryDistribution = allRecipes.reduce((acc, recipe) => {
      acc[recipe.primaryCategory] = (acc[recipe.primaryCategory] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);

    const averageCost = allRecipes.length > 0 
      ? allRecipes.reduce((sum, recipe) => sum + recipe.costPerServing, 0) / allRecipes.length
      : 0;

    const averageTime = allRecipes.length > 0
      ? allRecipes.reduce((sum, recipe) => sum + recipe.totalTime, 0) / allRecipes.length
      : 0;

    return {
      totalRecipes: allRecipes.length,
      categoryDistribution,
      averageCost,
      averageTime,
      skillLevelDistribution: allRecipes.reduce((acc, recipe) => {
        acc[recipe.skillLevel] = (acc[recipe.skillLevel] || 0) + 1;
        return acc;
      }, {} as Record<string, number>)
    };
  }, [enhancedRecipes]);

  return {
    // Recipe data
    recipes: filteredRecipes,
    legacyRecipes: legacyCompatibleRecipes, // For backward compatibility
    allRecipes: enhancedRecipes,
    
    // State
    searchTerm,
    setSearchTerm,
    filters,
    setFilters,
    selectedCategory,
    setSelectedCategory,
    isLoading,
    
    // Recipe management
    addRecipe,
    updateRecipe,
    deleteRecipe,
    getRecipeById,
    searchRecipes,
    
    // Import/Export
    exportRecipes,
    importRecipes,
    
    // Statistics
    stats,
    totalRecipes: enhancedRecipes.length,
    filteredCount: filteredRecipes.length
  };
};

// Legacy hook for backward compatibility
export const useRecipes = () => {
  const enhanced = useEnhancedRecipes();
  
  return {
    recipes: enhanced.legacyRecipes,
    searchTerm: enhanced.searchTerm,
    setSearchTerm: enhanced.setSearchTerm,
    filters: {
      maxCost: enhanced.filters.maxCost,
      maxTime: enhanced.filters.maxTime,
      difficulty: enhanced.filters.skillLevel.map(skill => 
        skill === 'beginner' ? 'Easy' : 
        skill === 'intermediate' ? 'Medium' : 'Hard'
      ),
      dietary: enhanced.filters.dietary,
      mealType: enhanced.filters.mealType
    },
    setFilters: (legacyFilters: any) => {
      enhanced.setFilters({
        ...enhanced.filters,
        maxCost: legacyFilters.maxCost,
        maxTime: legacyFilters.maxTime,
        skillLevel: legacyFilters.difficulty?.map((diff: string) => 
          diff === 'Easy' ? 'beginner' : 
          diff === 'Medium' ? 'intermediate' : 'advanced'
        ) || [],
        dietary: legacyFilters.dietary || [],
        mealType: legacyFilters.mealType || []
      });
    },
    selectedCategory: enhanced.selectedCategory,
    setSelectedCategory: enhanced.setSelectedCategory,
    totalRecipes: enhanced.totalRecipes
  };
};