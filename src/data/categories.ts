import { Category } from '../types/recipe';

export const categories: Category[] = [
  // Everyday Survival
  {
    id: 'before-payday',
    name: 'Before Payday',
    description: 'Stretch what\'s left in your fridge/pantry',
    icon: '💸',
    color: 'text-red-700',
    bgColor: 'bg-red-50'
  },
  {
    id: 'cheap-cheerful',
    name: 'Cheap & Cheerful',
    description: 'Comfort food that\'s still low-cost',
    icon: '😊',
    color: 'text-yellow-700',
    bgColor: 'bg-yellow-50'
  },
  {
    id: 'fridge-cleanout',
    name: 'Fridge Clean-Out',
    description: 'Flexible recipes for whatever you\'ve got',
    icon: '🧹',
    color: 'text-green-700',
    bgColor: 'bg-green-50'
  },
  
  // Impress Without Stress
  {
    id: 'date-night',
    name: 'Date Night In',
    description: 'Looks gourmet, secretly budget',
    icon: '💕',
    color: 'text-pink-700',
    bgColor: 'bg-pink-50'
  },
  {
    id: 'flatmate-feast',
    name: 'Flatmate Feast',
    description: 'Easy group meals for movie/game nights',
    icon: '🍕',
    color: 'text-orange-700',
    bgColor: 'bg-orange-50'
  },
  {
    id: 'meet-parents',
    name: 'Meet the Parents',
    description: 'A slightly fancier dish to impress visitors',
    icon: '👨‍👩‍👧‍👦',
    color: 'text-purple-700',
    bgColor: 'bg-purple-50'
  },
  
  // Quick Saves
  {
    id: '10-minutes',
    name: '10 Minutes, Tops',
    description: 'Meals for when you\'re starving now',
    icon: '⚡',
    color: 'text-blue-700',
    bgColor: 'bg-blue-50'
  },
  {
    id: 'one-pan',
    name: 'One-Pan Wonders',
    description: 'Minimal cleanup, maximum flavor',
    icon: '🍳',
    color: 'text-indigo-700',
    bgColor: 'bg-indigo-50'
  },
  {
    id: 'no-stove',
    name: 'No Stove, No Problem',
    description: 'For dorms or hot-weather days',
    icon: '🔥',
    color: 'text-red-700',
    bgColor: 'bg-red-50'
  },
  
  // Health on a Budget
  {
    id: 'energy-boost',
    name: 'Energy Boost',
    description: 'Quick, nutrient-packed meals',
    icon: '⚡',
    color: 'text-green-700',
    bgColor: 'bg-green-50'
  },
  {
    id: 'veggie-first',
    name: 'Veggie First',
    description: 'Budget-friendly vegetarian/vegan options',
    icon: '🥬',
    color: 'text-emerald-700',
    bgColor: 'bg-emerald-50'
  },
  {
    id: 'feel-good',
    name: 'Feel-Good Comfort',
    description: 'Healthier twists on classic comfort food',
    icon: '🤗',
    color: 'text-teal-700',
    bgColor: 'bg-teal-50'
  },
  
  // Weekend Projects
  {
    id: 'meal-prep',
    name: 'Meal Prep Sunday',
    description: 'Batch cooking for the week ahead',
    icon: '📦',
    color: 'text-gray-700',
    bgColor: 'bg-gray-50'
  },
  {
    id: 'bake-relax',
    name: 'Bake & Relax',
    description: 'Simple baking recipes that don\'t require special tools',
    icon: '🍞',
    color: 'text-amber-700',
    bgColor: 'bg-amber-50'
  },
  {
    id: 'diy-takeout',
    name: 'DIY Takeout',
    description: 'Homemade versions of favorite fast food',
    icon: '🥡',
    color: 'text-rose-700',
    bgColor: 'bg-rose-50'
  }
];

export const getCategoryById = (id: string): Category | undefined => {
  return categories.find(category => category.id === id);
};