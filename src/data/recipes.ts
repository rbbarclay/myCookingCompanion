import { Recipe } from '../types/recipe';

export const recipes: Recipe[] = [
  {
    id: '1',
    title: 'Ultimate Ramen Upgrade',
    description: 'Transform instant ramen into a restaurant-quality meal with simple additions',
    image: 'https://images.pexels.com/photos/884600/pexels-photo-884600.jpeg?auto=compress&cs=tinysrgb&w=800',
    prepTime: 5,
    cookTime: 10,
    servings: 1,
    difficulty: 'Easy',
    estimatedCost: 2.50,
    category: 'ten-minutes',
    categoryDescription: 'Perfect when you need food NOW and only have basic ingredients',
    ingredients: [
      { id: '1', name: 'Instant ramen', amount: '1', unit: 'pack', cost: 0.50, essential: true },
      { id: '2', name: 'Egg', amount: '1', unit: 'piece', cost: 0.25, essential: true },
      { id: '3', name: 'Green onions', amount: '2', unit: 'stalks', cost: 0.30, essential: false },
      { id: '4', name: 'Sriracha', amount: '1', unit: 'tsp', cost: 0.05, essential: false },
      { id: '5', name: 'Sesame oil', amount: '1/2', unit: 'tsp', cost: 0.10, essential: false }
    ],
    instructions: [
      'Boil water and cook ramen noodles for 2 minutes',
      'Crack egg into the boiling water and let it cook for 1 minute',
      'Add flavor packet and stir gently',
      'Transfer to bowl and top with chopped green onions',
      'Drizzle with sriracha and sesame oil to taste'
    ],
    tags: ['quick', 'comfort-food', 'asian', 'one-pot'],
    nutritionInfo: {
      calories: 420,
      protein: 18,
      carbs: 45,
      fat: 16
    }
  },
  {
    id: '2',
    title: 'Loaded Baked Potato',
    description: 'A filling and customizable meal that costs under $3',
    image: 'https://images.pexels.com/photos/5949888/pexels-photo-5949888.jpeg?auto=compress&cs=tinysrgb&w=800',
    prepTime: 5,
    cookTime: 45,
    servings: 1,
    difficulty: 'Easy',
    estimatedCost: 2.75,
    category: 'cheap-cheerful',
    categoryDescription: 'Ultimate comfort food that won\'t break the bank',
    ingredients: [
      { id: '1', name: 'Large potato', amount: '1', unit: 'piece', cost: 1.00, essential: true },
      { id: '2', name: 'Butter', amount: '1', unit: 'tbsp', cost: 0.15, essential: true },
      { id: '3', name: 'Shredded cheese', amount: '1/4', unit: 'cup', cost: 0.75, essential: false },
      { id: '4', name: 'Sour cream', amount: '2', unit: 'tbsp', cost: 0.30, essential: false },
      { id: '5', name: 'Chives', amount: '1', unit: 'tbsp', cost: 0.25, essential: false },
      { id: '6', name: 'Salt and pepper', amount: 'to taste', unit: '', cost: 0.05, essential: true }
    ],
    instructions: [
      'Preheat oven to 425°F (220°C)',
      'Wash and pierce potato with fork several times',
      'Bake for 45-60 minutes until tender',
      'Cut open and fluff with fork',
      'Add butter, salt, and pepper',
      'Top with cheese, sour cream, and chives'
    ],
    tags: ['vegetarian', 'comfort-food', 'filling', 'customizable'],
    nutritionInfo: {
      calories: 380,
      protein: 12,
      carbs: 52,
      fat: 14
    }
  },
  {
    id: '3',
    title: 'Pasta Aglio e Olio',
    description: 'Classic Italian pasta with just garlic, olive oil, and parmesan',
    image: 'https://images.pexels.com/photos/1279330/pexels-photo-1279330.jpeg?auto=compress&cs=tinysrgb&w=800',
    prepTime: 5,
    cookTime: 15,
    servings: 2,
    difficulty: 'Easy',
    estimatedCost: 3.00,
    category: 'date-night',
    categoryDescription: 'Looks fancy, tastes amazing, costs almost nothing',
    ingredients: [
      { id: '1', name: 'Spaghetti', amount: '8', unit: 'oz', cost: 1.00, essential: true },
      { id: '2', name: 'Garlic', amount: '4', unit: 'cloves', cost: 0.25, essential: true },
      { id: '3', name: 'Olive oil', amount: '1/3', unit: 'cup', cost: 0.75, essential: true },
      { id: '4', name: 'Red pepper flakes', amount: '1/4', unit: 'tsp', cost: 0.05, essential: false },
      { id: '5', name: 'Parmesan cheese', amount: '1/2', unit: 'cup', cost: 1.00, essential: false },
      { id: '6', name: 'Fresh parsley', amount: '2', unit: 'tbsp', cost: 0.30, essential: false }
    ],
    instructions: [
      'Cook spaghetti according to package directions',
      'While pasta cooks, heat olive oil in large pan',
      'Add sliced garlic and red pepper flakes, cook until fragrant',
      'Reserve 1/2 cup pasta water before draining',
      'Add drained pasta to the pan with garlic oil',
      'Toss with pasta water, parmesan, and parsley'
    ],
    tags: ['italian', 'vegetarian', 'quick', 'classic'],
    nutritionInfo: {
      calories: 520,
      protein: 16,
      carbs: 68,
      fat: 20
    }
  },
  {
    id: '4',
    title: 'Breakfast Burrito Bowl',
    description: 'Protein-packed breakfast that keeps you full all morning',
    image: 'https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg?auto=compress&cs=tinysrgb&w=800',
    prepTime: 10,
    cookTime: 15,
    servings: 1,
    difficulty: 'Easy',
    estimatedCost: 3.50,
    category: 'energy-boost',
    categoryDescription: 'Fuel your day with this protein-packed powerhouse',
    ingredients: [
      { id: '1', name: 'Eggs', amount: '2', unit: 'pieces', cost: 0.50, essential: true },
      { id: '2', name: 'Black beans', amount: '1/2', unit: 'cup', cost: 0.40, essential: true },
      { id: '3', name: 'Cooked rice', amount: '1/2', unit: 'cup', cost: 0.30, essential: true },
      { id: '4', name: 'Shredded cheese', amount: '1/4', unit: 'cup', cost: 0.75, essential: false },
      { id: '5', name: 'Salsa', amount: '2', unit: 'tbsp', cost: 0.25, essential: false },
      { id: '6', name: 'Avocado', amount: '1/2', unit: 'piece', cost: 1.00, essential: false },
      { id: '7', name: 'Hot sauce', amount: 'to taste', unit: '', cost: 0.05, essential: false }
    ],
    instructions: [
      'Heat rice and black beans in microwave',
      'Scramble eggs in a pan with a little oil',
      'Layer rice and beans in a bowl',
      'Top with scrambled eggs and cheese',
      'Add diced avocado and salsa',
      'Finish with hot sauce to taste'
    ],
    tags: ['breakfast', 'protein-rich', 'filling', 'mexican-inspired'],
    nutritionInfo: {
      calories: 485,
      protein: 24,
      carbs: 42,
      fat: 22
    }
  },
  {
    id: '5',
    title: 'Tuna Melt Quesadilla',
    description: 'Crispy quesadilla filled with tuna and melted cheese',
    image: 'https://images.pexels.com/photos/461198/pexels-photo-461198.jpeg?auto=compress&cs=tinysrgb&w=800',
    prepTime: 5,
    cookTime: 8,
    servings: 1,
    difficulty: 'Easy',
    estimatedCost: 2.25,
    category: 'before-payday',
    categoryDescription: 'Make magic with pantry staples when money\'s tight',
    ingredients: [
      { id: '1', name: 'Flour tortillas', amount: '2', unit: 'pieces', cost: 0.50, essential: true },
      { id: '2', name: 'Canned tuna', amount: '1', unit: 'can', cost: 1.00, essential: true },
      { id: '3', name: 'Shredded cheese', amount: '1/3', unit: 'cup', cost: 1.00, essential: true },
      { id: '4', name: 'Mayonnaise', amount: '1', unit: 'tbsp', cost: 0.10, essential: false },
      { id: '5', name: 'Diced onion', amount: '1', unit: 'tbsp', cost: 0.15, essential: false }
    ],
    instructions: [
      'Mix tuna with mayonnaise and diced onion',
      'Spread tuna mixture on one tortilla',
      'Sprinkle cheese over tuna',
      'Top with second tortilla',
      'Cook in pan for 3-4 minutes per side until golden',
      'Cut into wedges and serve hot'
    ],
    tags: ['quick', 'protein-rich', 'crispy', 'lunch'],
    nutritionInfo: {
      calories: 420,
      protein: 28,
      carbs: 32,
      fat: 18
    }
  },
  {
    id: '6',
    title: 'Veggie Fried Rice',
    description: 'Use leftover rice and whatever vegetables you have on hand',
    image: 'https://images.pexels.com/photos/1410235/pexels-photo-1410235.jpeg?auto=compress&cs=tinysrgb&w=800',
    prepTime: 10,
    cookTime: 12,
    servings: 2,
    difficulty: 'Medium',
    estimatedCost: 4.00,
    category: 'fridge-cleanout',
    categoryDescription: 'Turn random leftovers into something delicious',
    ingredients: [
      { id: '1', name: 'Cooked rice', amount: '2', unit: 'cups', cost: 0.60, essential: true },
      { id: '2', name: 'Eggs', amount: '2', unit: 'pieces', cost: 0.50, essential: true },
      { id: '3', name: 'Mixed vegetables', amount: '1', unit: 'cup', cost: 1.50, essential: true },
      { id: '4', name: 'Soy sauce', amount: '2', unit: 'tbsp', cost: 0.10, essential: true },
      { id: '5', name: 'Vegetable oil', amount: '2', unit: 'tbsp', cost: 0.15, essential: true },
      { id: '6', name: 'Garlic', amount: '2', unit: 'cloves', cost: 0.15, essential: false },
      { id: '7', name: 'Green onions', amount: '2', unit: 'stalks', cost: 0.30, essential: false }
    ],
    instructions: [
      'Heat oil in large pan or wok over high heat',
      'Scramble eggs and remove from pan',
      'Add garlic and vegetables, stir-fry for 3 minutes',
      'Add rice, breaking up clumps',
      'Stir in soy sauce and scrambled eggs',
      'Garnish with chopped green onions'
    ],
    tags: ['vegetarian', 'asian', 'leftover-friendly', 'customizable'],
    nutritionInfo: {
      calories: 340,
      protein: 12,
      carbs: 48,
      fat: 12
    }
  }
];