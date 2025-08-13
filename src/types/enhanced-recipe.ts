// Enhanced Recipe Types Based on Template Requirements

export interface Ingredient {
  name: string;
  amount: number;
  unit: string;
  cost: number;
  swaps?: string[]; // Optional ingredient swaps
}

export interface InstructionLevel {
  level: 'base' | 'intermediate' | 'advanced';
  steps: string[];
}

export interface EquipmentVariation {
  equipment: string; // 'oven', 'air-fryer', 'stovetop', 'microwave'
  instructions: string[];
  timeAdjustment?: number; // Minutes difference from base recipe
}

export interface NutritionInfo {
  calories: number;
  protein: number;
  carbs: number;
  fat: number;
}

export interface MediaContent {
  mainPhoto: string;
  stepPhotos?: string[]; // Optional step-by-step photos
  video?: string; // Optional video URL
}

export interface EnhancedRecipe {
  // Basic Metadata
  id: string;
  title: string;
  primaryCategory: string;
  secondaryTags: string[];
  
  // Time & Cost
  prepTime: number; // minutes
  cookTime: number; // minutes
  totalTime: number; // calculated field
  costPerServing: number;
  servings: number;
  
  // Skill & Equipment
  skillLevel: 'beginner' | 'intermediate' | 'advanced';
  equipmentNeeded: string[]; // Base equipment required
  
  // Content
  emotionalHook: string; // 1-2 sentence intro
  ingredients: Ingredient[];
  instructions: InstructionLevel[]; // Multiple skill versions
  equipmentVariations: EquipmentVariation[];
  
  // Additional Info
  nutrition?: NutritionInfo;
  tips: string[];
  media: MediaContent;
  
  // Search & Filter Properties
  dietary: string[]; // vegetarian, vegan, gluten-free, etc.
  mealType: string[]; // breakfast, lunch, dinner, snack
  
  // Metadata
  createdAt: string;
  updatedAt: string;
  author?: string;
  difficulty: 'Easy' | 'Medium' | 'Hard'; // Keep for backward compatibility
}

// Recipe template for creating new recipes
export interface RecipeTemplate {
  title: string;
  primaryCategory: string;
  secondaryTags: string[];
  prepTime: number;
  cookTime: number;
  costPerServing: number;
  servings: number;
  skillLevel: 'beginner' | 'intermediate' | 'advanced';
  equipmentNeeded: string[];
  emotionalHook: string;
  ingredients: Ingredient[];
  baseInstructions: string[];
  tips: string[];
  dietary: string[];
  mealType: string[];
  mainPhoto: string;
  nutrition?: NutritionInfo;
}

// For recipe uploads/imports
export interface RecipeUpload {
  recipe: RecipeTemplate;
  additionalLevels?: {
    intermediate?: string[];
    advanced?: string[];
  };
  equipmentVariations?: EquipmentVariation[];
  stepPhotos?: string[];
  video?: string;
}

// Legacy recipe interface for backward compatibility
export interface Recipe {
  id: string;
  name: string;
  description: string;
  image: string;
  prepTime: number;
  cookTime: number;
  servings: number;
  difficulty: 'Easy' | 'Medium' | 'Hard';
  estimatedCost: number;
  ingredients: Ingredient[];
  instructions: string[];
  tags: string[];
  dietary: string[];
  mealType: string[];
  categoryId: string;
  tips?: string[];
  nutrition?: {
    calories: number;
    protein: number;
    carbs: number;
    fat: number;
  };
}

// Filter options for enhanced recipes
export interface EnhancedFilterOptions {
  maxCost: number;
  maxTime: number;
  skillLevel: string[];
  dietary: string[];
  mealType: string[];
  equipment: string[];
  primaryCategory: string[];
}

export interface FilterOptions {
  maxCost: number;
  maxTime: number;
  difficulty: string[];
  dietary: string[];
  mealType: string[];
}

export interface Category {
  id: string;
  name: string;
  description: string;
  icon: string;
  color: string;
  bgColor: string;
}