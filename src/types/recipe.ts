export interface Recipe {
  id: string;
  title: string;
  description: string;
  image: string;
  prepTime: number;
  cookTime: number;
  servings: number;
  difficulty: 'Easy' | 'Medium' | 'Hard';
  estimatedCost: number;
  category: string;
  categoryDescription?: string;
  ingredients: Ingredient[];
  instructions: string[];
  tags: string[];
  nutritionInfo?: {
    calories: number;
    protein: number;
    carbs: number;
    fat: number;
  };
}

export interface Ingredient {
  id: string;
  name: string;
  amount: string;
  unit: string;
  cost: number;
  essential: boolean;
}

export interface FilterOptions {
  maxCost: number;
  maxTime: number;
  difficulty: string[];
  dietary: string[];
  mealType: string[];
}

export interface RecipeCategory {
  id: string;
  name: string;
  description: string;
  icon: string;
  color: string;
  bgColor: string;
}