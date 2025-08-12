export interface Ingredient {
  name: string;
  amount: number;
  unit: string;
  cost: number;
}

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