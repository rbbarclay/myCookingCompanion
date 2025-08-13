import { EnhancedRecipe, RecipeTemplate, RecipeUpload, Recipe } from '../types/enhanced-recipe';

// Storage keys
const ENHANCED_RECIPES_KEY = 'budget-bites-enhanced-recipes';
const RECIPE_INDEX_KEY = 'budget-bites-recipe-index';

// Recipe conversion utilities
export class RecipeManager {
  
  // Convert legacy recipe to enhanced format
  static convertLegacyToEnhanced(legacy: Recipe): EnhancedRecipe {
    const now = new Date().toISOString();
    
    return {
      id: legacy.id,
      title: legacy.name,
      primaryCategory: legacy.categoryId,
      secondaryTags: legacy.tags,
      prepTime: legacy.prepTime,
      cookTime: legacy.cookTime,
      totalTime: legacy.prepTime + legacy.cookTime,
      costPerServing: legacy.estimatedCost,
      servings: legacy.servings,
      skillLevel: legacy.difficulty === 'Easy' ? 'beginner' : 
                  legacy.difficulty === 'Medium' ? 'intermediate' : 'advanced',
      equipmentNeeded: this.inferEquipmentFromInstructions(legacy.instructions),
      emotionalHook: legacy.description,
      ingredients: legacy.ingredients,
      instructions: [{
        level: 'base' as const,
        steps: legacy.instructions
      }],
      equipmentVariations: [],
      nutrition: legacy.nutrition,
      tips: legacy.tips || [],
      media: {
        mainPhoto: legacy.image
      },
      dietary: legacy.dietary,
      mealType: legacy.mealType,
      createdAt: now,
      updatedAt: now,
      difficulty: legacy.difficulty
    };
  }

  // Convert enhanced recipe back to legacy format for compatibility
  static convertEnhancedToLegacy(enhanced: EnhancedRecipe): Recipe {
    return {
      id: enhanced.id,
      name: enhanced.title,
      description: enhanced.emotionalHook,
      image: enhanced.media.mainPhoto,
      prepTime: enhanced.prepTime,
      cookTime: enhanced.cookTime,
      servings: enhanced.servings,
      difficulty: enhanced.difficulty,
      estimatedCost: enhanced.costPerServing,
      ingredients: enhanced.ingredients,
      instructions: enhanced.instructions.find(inst => inst.level === 'base')?.steps || [],
      tags: enhanced.secondaryTags,
      dietary: enhanced.dietary,
      mealType: enhanced.mealType,
      categoryId: enhanced.primaryCategory,
      tips: enhanced.tips,
      nutrition: enhanced.nutrition
    };
  }

  // Infer equipment from instructions (helper method)
  private static inferEquipmentFromInstructions(instructions: string[]): string[] {
    const equipment = new Set<string>();
    const instructionText = instructions.join(' ').toLowerCase();
    
    if (instructionText.includes('oven') || instructionText.includes('bake')) equipment.add('oven');
    if (instructionText.includes('stovetop') || instructionText.includes('pan') || instructionText.includes('pot')) equipment.add('stovetop');
    if (instructionText.includes('microwave')) equipment.add('microwave');
    if (instructionText.includes('air fryer')) equipment.add('air-fryer');
    
    return Array.from(equipment);
  }

  // Create new recipe from template
  static createFromTemplate(template: RecipeTemplate): EnhancedRecipe {
    const now = new Date().toISOString();
    const id = this.generateId();
    
    return {
      id,
      title: template.title,
      primaryCategory: template.primaryCategory,
      secondaryTags: template.secondaryTags,
      prepTime: template.prepTime,
      cookTime: template.cookTime,
      totalTime: template.prepTime + template.cookTime,
      costPerServing: template.costPerServing,
      servings: template.servings,
      skillLevel: template.skillLevel,
      equipmentNeeded: template.equipmentNeeded,
      emotionalHook: template.emotionalHook,
      ingredients: template.ingredients,
      instructions: [{
        level: 'base' as const,
        steps: template.baseInstructions
      }],
      equipmentVariations: [],
      nutrition: template.nutrition,
      tips: template.tips,
      media: {
        mainPhoto: template.mainPhoto
      },
      dietary: template.dietary,
      mealType: template.mealType,
      createdAt: now,
      updatedAt: now,
      difficulty: this.skillLevelToDifficulty(template.skillLevel)
    };
  }

  // Process uploaded recipe
  static processUpload(upload: RecipeUpload): EnhancedRecipe {
    const baseRecipe = this.createFromTemplate(upload.recipe);
    
    // Add additional instruction levels
    if (upload.additionalLevels?.intermediate) {
      baseRecipe.instructions.push({
        level: 'intermediate',
        steps: upload.additionalLevels.intermediate
      });
    }
    
    if (upload.additionalLevels?.advanced) {
      baseRecipe.instructions.push({
        level: 'advanced',
        steps: upload.additionalLevels.advanced
      });
    }
    
    // Add equipment variations
    if (upload.equipmentVariations) {
      baseRecipe.equipmentVariations = upload.equipmentVariations;
    }
    
    // Add media content
    if (upload.stepPhotos) {
      baseRecipe.media.stepPhotos = upload.stepPhotos;
    }
    
    if (upload.video) {
      baseRecipe.media.video = upload.video;
    }
    
    return baseRecipe;
  }

  // Storage operations
  static async saveRecipe(recipe: EnhancedRecipe): Promise<void> {
    try {
      const recipes = await this.getAllRecipes();
      const existingIndex = recipes.findIndex(r => r.id === recipe.id);
      
      if (existingIndex >= 0) {
        // Update existing recipe
        recipes[existingIndex] = { ...recipe, updatedAt: new Date().toISOString() };
      } else {
        // Add new recipe
        recipes.push(recipe);
      }
      
      await this.saveAllRecipes(recipes);
      await this.updateSearchIndex(recipes);
    } catch (error) {
      console.error('Error saving recipe:', error);
      throw new Error('Failed to save recipe');
    }
  }

  static async getAllRecipes(): Promise<EnhancedRecipe[]> {
    try {
      const stored = localStorage.getItem(ENHANCED_RECIPES_KEY);
      return stored ? JSON.parse(stored) : [];
    } catch (error) {
      console.error('Error loading recipes:', error);
      return [];
    }
  }

  static async getRecipeById(id: string): Promise<EnhancedRecipe | null> {
    const recipes = await this.getAllRecipes();
    return recipes.find(recipe => recipe.id === id) || null;
  }

  static async deleteRecipe(id: string): Promise<void> {
    try {
      const recipes = await this.getAllRecipes();
      const filtered = recipes.filter(recipe => recipe.id !== id);
      await this.saveAllRecipes(filtered);
      await this.updateSearchIndex(filtered);
    } catch (error) {
      console.error('Error deleting recipe:', error);
      throw new Error('Failed to delete recipe');
    }
  }

  static async searchRecipes(query: string): Promise<EnhancedRecipe[]> {
    const recipes = await this.getAllRecipes();
    const searchLower = query.toLowerCase();
    
    return recipes.filter(recipe => {
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
      
      return searchableText.includes(searchLower);
    });
  }

  // Bulk operations
  static async importRecipes(recipes: EnhancedRecipe[]): Promise<void> {
    try {
      const existing = await this.getAllRecipes();
      const combined = [...existing];
      
      recipes.forEach(newRecipe => {
        const existingIndex = combined.findIndex(r => r.id === newRecipe.id);
        if (existingIndex >= 0) {
          combined[existingIndex] = { ...newRecipe, updatedAt: new Date().toISOString() };
        } else {
          combined.push(newRecipe);
        }
      });
      
      await this.saveAllRecipes(combined);
      await this.updateSearchIndex(combined);
    } catch (error) {
      console.error('Error importing recipes:', error);
      throw new Error('Failed to import recipes');
    }
  }

  static async exportRecipes(): Promise<EnhancedRecipe[]> {
    return await this.getAllRecipes();
  }

  // Migration utilities
  static async migrateLegacyRecipes(legacyRecipes: Recipe[]): Promise<void> {
    const enhanced = legacyRecipes.map(recipe => this.convertLegacyToEnhanced(recipe));
    await this.importRecipes(enhanced);
  }

  // Private utility methods
  private static async saveAllRecipes(recipes: EnhancedRecipe[]): Promise<void> {
    localStorage.setItem(ENHANCED_RECIPES_KEY, JSON.stringify(recipes));
  }

  private static async updateSearchIndex(recipes: EnhancedRecipe[]): Promise<void> {
    const index = recipes.map(recipe => ({
      id: recipe.id,
      title: recipe.title,
      category: recipe.primaryCategory,
      tags: recipe.secondaryTags,
      ingredients: recipe.ingredients.map(ing => ing.name),
      lastUpdated: recipe.updatedAt
    }));
    
    localStorage.setItem(RECIPE_INDEX_KEY, JSON.stringify(index));
  }

  private static generateId(): string {
    return `recipe_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
  }

  private static skillLevelToDifficulty(skillLevel: 'beginner' | 'intermediate' | 'advanced'): 'Easy' | 'Medium' | 'Hard' {
    switch (skillLevel) {
      case 'beginner': return 'Easy';
      case 'intermediate': return 'Medium';
      case 'advanced': return 'Hard';
    }
  }
}

// Recipe validation utilities
export class RecipeValidator {
  static validateTemplate(template: RecipeTemplate): { isValid: boolean; errors: string[] } {
    const errors: string[] = [];
    
    if (!template.title?.trim()) errors.push('Title is required');
    if (!template.primaryCategory?.trim()) errors.push('Primary category is required');
    if (!template.emotionalHook?.trim()) errors.push('Emotional hook is required');
    if (template.prepTime < 0) errors.push('Prep time must be positive');
    if (template.cookTime < 0) errors.push('Cook time must be positive');
    if (template.costPerServing <= 0) errors.push('Cost per serving must be positive');
    if (template.servings <= 0) errors.push('Servings must be positive');
    if (!template.ingredients?.length) errors.push('At least one ingredient is required');
    if (!template.baseInstructions?.length) errors.push('Instructions are required');
    if (!template.mainPhoto?.trim()) errors.push('Main photo is required');
    
    return {
      isValid: errors.length === 0,
      errors
    };
  }

  static validateEnhancedRecipe(recipe: EnhancedRecipe): { isValid: boolean; errors: string[] } {
    const errors: string[] = [];
    
    if (!recipe.id?.trim()) errors.push('Recipe ID is required');
    if (!recipe.title?.trim()) errors.push('Title is required');
    if (!recipe.instructions?.some(inst => inst.level === 'base')) {
      errors.push('Base instructions are required');
    }
    
    return {
      isValid: errors.length === 0,
      errors
    };
  }
}