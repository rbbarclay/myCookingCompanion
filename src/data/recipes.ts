import { Recipe } from '../types/recipe';

export const recipes: Recipe[] = [
  {
    id: '1',
    name: 'Ultimate Ramen Upgrade',
    description: 'Transform instant ramen into a restaurant-worthy meal with simple additions',
    image: 'https://images.pexels.com/photos/884600/pexels-photo-884600.jpeg',
    prepTime: 5,
    cookTime: 10,
    servings: 1,
    difficulty: 'Easy',
    estimatedCost: 2.50,
    categoryId: '10-minutes',
    ingredients: [
      { name: 'Instant ramen packet', amount: 1, unit: 'pack', cost: 0.50 },
      { name: 'Egg', amount: 1, unit: 'large', cost: 0.25 },
      { name: 'Green onions', amount: 2, unit: 'stalks', cost: 0.30 },
      { name: 'Soy sauce', amount: 1, unit: 'tbsp', cost: 0.05 },
      { name: 'Sesame oil', amount: 1, unit: 'tsp', cost: 0.10 },
      { name: 'Frozen vegetables', amount: 0.25, unit: 'cup', cost: 0.40 },
      { name: 'Sriracha', amount: 1, unit: 'tsp', cost: 0.05 }
    ],
    instructions: [
      'Boil water and cook ramen noodles for 2 minutes',
      'Crack egg into the boiling water and let it poach for 1 minute',
      'Add frozen vegetables and cook for another minute',
      'Stir in half the seasoning packet, soy sauce, and sesame oil',
      'Top with chopped green onions and a drizzle of sriracha',
      'Serve immediately while hot'
    ],
    tags: ['quick', 'comfort food', 'asian-inspired', 'one-pot'],
    dietary: [],
    mealType: ['lunch', 'dinner'],
    tips: [
      'Buy eggs in bulk for cheaper protein',
      'Frozen vegetables are often cheaper than fresh and last longer',
      'Save money by buying generic ramen brands'
    ]
  },
  {
    id: '2',
    name: 'Loaded Baked Potato',
    description: 'A filling, customizable meal that uses pantry staples',
    image: 'https://images.pexels.com/photos/5949888/pexels-photo-5949888.jpeg',
    prepTime: 5,
    cookTime: 45,
    servings: 1,
    difficulty: 'Easy',
    estimatedCost: 3.00,
    categoryId: 'cheap-cheerful',
    ingredients: [
      { name: 'Large potato', amount: 1, unit: 'whole', cost: 0.75 },
      { name: 'Butter', amount: 1, unit: 'tbsp', cost: 0.15 },
      { name: 'Shredded cheese', amount: 0.25, unit: 'cup', cost: 0.60 },
      { name: 'Canned beans', amount: 0.5, unit: 'cup', cost: 0.40 },
      { name: 'Greek yogurt', amount: 2, unit: 'tbsp', cost: 0.30 },
      { name: 'Green onions', amount: 1, unit: 'stalk', cost: 0.15 },
      { name: 'Salt and pepper', amount: 1, unit: 'pinch', cost: 0.02 }
    ],
    instructions: [
      'Preheat oven to 425°F (220°C)',
      'Pierce potato with fork and bake for 45 minutes until tender',
      'Heat beans in microwave or small pot',
      'Cut open potato and fluff with fork',
      'Add butter, salt, and pepper to potato flesh',
      'Top with warm beans, cheese, yogurt, and green onions',
      'Serve immediately'
    ],
    tags: ['filling', 'comfort food', 'customizable', 'vegetarian'],
    dietary: ['vegetarian'],
    mealType: ['lunch', 'dinner'],
    tips: [
      'Buy potatoes in bulk bags for better value',
      'Use whatever toppings you have - leftover chili, frozen corn, etc.',
      'Greek yogurt is cheaper than sour cream and healthier'
    ]
  },
  {
    id: '3',
    name: 'Pasta Aglio e Olio',
    description: 'Classic Italian pasta with just garlic, olive oil, and parmesan',
    image: 'https://images.pexels.com/photos/1279330/pexels-photo-1279330.jpeg',
    prepTime: 5,
    cookTime: 15,
    servings: 2,
    difficulty: 'Easy',
    estimatedCost: 2.25,
    categoryId: 'date-night',
    ingredients: [
      { name: 'Spaghetti', amount: 8, unit: 'oz', cost: 0.75 },
      { name: 'Garlic cloves', amount: 4, unit: 'cloves', cost: 0.20 },
      { name: 'Olive oil', amount: 0.25, unit: 'cup', cost: 0.50 },
      { name: 'Red pepper flakes', amount: 0.5, unit: 'tsp', cost: 0.05 },
      { name: 'Parmesan cheese', amount: 0.5, unit: 'cup', cost: 0.60 },
      { name: 'Fresh parsley', amount: 2, unit: 'tbsp', cost: 0.15 }
    ],
    instructions: [
      'Cook spaghetti according to package directions, reserve 1 cup pasta water',
      'While pasta cooks, heat olive oil in large pan over medium heat',
      'Add sliced garlic and red pepper flakes, cook until fragrant (1-2 minutes)',
      'Add drained pasta to the pan with garlic oil',
      'Toss with pasta water to create a silky sauce',
      'Remove from heat, add parmesan and parsley',
      'Serve immediately with extra cheese'
    ],
    tags: ['italian', 'romantic', 'simple', 'vegetarian'],
    dietary: ['vegetarian'],
    mealType: ['dinner'],
    tips: [
      'Buy pasta in bulk for better value',
      'Don\'t let garlic burn or it will taste bitter',
      'Save pasta water - the starch helps create a creamy sauce'
    ]
  },
  {
    id: '4',
    name: 'Veggie Fried Rice',
    description: 'Use up leftover rice and any vegetables you have on hand',
    image: 'https://images.pexels.com/photos/2456435/pexels-photo-2456435.jpeg',
    prepTime: 10,
    cookTime: 10,
    servings: 2,
    difficulty: 'Easy',
    estimatedCost: 3.50,
    categoryId: 'fridge-cleanout',
    ingredients: [
      { name: 'Cooked rice (day-old preferred)', amount: 2, unit: 'cups', cost: 0.60 },
      { name: 'Eggs', amount: 2, unit: 'large', cost: 0.50 },
      { name: 'Mixed frozen vegetables', amount: 1, unit: 'cup', cost: 0.80 },
      { name: 'Soy sauce', amount: 3, unit: 'tbsp', cost: 0.15 },
      { name: 'Vegetable oil', amount: 2, unit: 'tbsp', cost: 0.10 },
      { name: 'Garlic', amount: 2, unit: 'cloves', cost: 0.10 },
      { name: 'Green onions', amount: 2, unit: 'stalks', cost: 0.30 },
      { name: 'Sesame oil', amount: 1, unit: 'tsp', cost: 0.10 }
    ],
    instructions: [
      'Heat 1 tbsp oil in large pan or wok over high heat',
      'Scramble eggs and remove from pan',
      'Add remaining oil, then garlic and frozen vegetables',
      'Stir-fry vegetables for 2-3 minutes',
      'Add rice, breaking up clumps with spatula',
      'Stir in soy sauce and sesame oil',
      'Add scrambled eggs back to pan',
      'Garnish with green onions and serve'
    ],
    tags: ['asian-inspired', 'leftover-friendly', 'one-pan', 'vegetarian'],
    dietary: ['vegetarian'],
    mealType: ['lunch', 'dinner'],
    tips: [
      'Day-old rice works best - fresh rice can get mushy',
      'Use any vegetables you have - carrots, peas, corn, broccoli',
      'Cook rice in bulk and freeze portions for quick meals'
    ]
  },
  {
    id: '5',
    name: 'Black Bean Quesadillas',
    description: 'Crispy, cheesy, and packed with protein from black beans',
    image: 'https://images.pexels.com/photos/7613568/pexels-photo-7613568.jpeg',
    prepTime: 10,
    cookTime: 8,
    servings: 2,
    difficulty: 'Easy',
    estimatedCost: 2.75,
    categoryId: 'flatmate-feast',
    ingredients: [
      { name: 'Flour tortillas', amount: 4, unit: 'large', cost: 1.00 },
      { name: 'Canned black beans', amount: 1, unit: 'cup', cost: 0.50 },
      { name: 'Shredded cheese', amount: 1, unit: 'cup', cost: 0.80 },
      { name: 'Bell pepper', amount: 0.5, unit: 'whole', cost: 0.25 },
      { name: 'Onion', amount: 0.25, unit: 'whole', cost: 0.15 },
      { name: 'Cumin', amount: 0.5, unit: 'tsp', cost: 0.02 },
      { name: 'Oil for cooking', amount: 1, unit: 'tbsp', cost: 0.05 }
    ],
    instructions: [
      'Drain and rinse black beans, mash lightly with cumin',
      'Dice bell pepper and onion finely',
      'Spread bean mixture on half of each tortilla',
      'Top with cheese, peppers, and onions',
      'Fold tortillas in half',
      'Cook in dry pan for 2-3 minutes per side until golden',
      'Cut into wedges and serve with salsa or yogurt'
    ],
    tags: ['mexican-inspired', 'crispy', 'protein-rich', 'vegetarian'],
    dietary: ['vegetarian'],
    mealType: ['lunch', 'dinner', 'snack'],
    tips: [
      'Buy tortillas in bulk and freeze extras',
      'Canned beans are cheaper than fresh and last longer',
      'Make extra filling for quick meals throughout the week'
    ]
  },
  {
    id: '6',
    name: 'Tuna Pasta Salad',
    description: 'A protein-packed cold pasta that\'s perfect for meal prep',
    image: 'https://images.pexels.com/photos/1437267/pexels-photo-1437267.jpeg',
    prepTime: 15,
    cookTime: 10,
    servings: 4,
    difficulty: 'Easy',
    estimatedCost: 4.50,
    categoryId: 'meal-prep',
    ingredients: [
      { name: 'Pasta (any short shape)', amount: 12, unit: 'oz', cost: 1.00 },
      { name: 'Canned tuna', amount: 2, unit: 'cans', cost: 2.00 },
      { name: 'Mayonnaise', amount: 0.5, unit: 'cup', cost: 0.30 },
      { name: 'Frozen peas', amount: 1, unit: 'cup', cost: 0.40 },
      { name: 'Celery', amount: 2, unit: 'stalks', cost: 0.30 },
      { name: 'Red onion', amount: 0.25, unit: 'whole', cost: 0.20 },
      { name: 'Lemon juice', amount: 2, unit: 'tbsp', cost: 0.15 },
      { name: 'Salt and pepper', amount: 1, unit: 'pinch', cost: 0.02 }
    ],
    instructions: [
      'Cook pasta according to package directions, drain and cool',
      'Run frozen peas under warm water to thaw',
      'Dice celery and red onion finely',
      'Drain tuna and flake with fork',
      'Mix mayo, lemon juice, salt, and pepper in large bowl',
      'Add pasta, tuna, peas, celery, and onion',
      'Toss everything together and chill for 30 minutes',
      'Serve cold, keeps in fridge for 3 days'
    ],
    tags: ['meal-prep', 'protein-rich', 'cold-dish', 'make-ahead'],
    dietary: [],
    mealType: ['lunch'],
    tips: [
      'Make on Sunday for easy lunches all week',
      'Add any vegetables you have - carrots, bell peppers, etc.',
      'Canned tuna in water is cheaper and healthier than oil-packed'
    ]
  }
];

export const getRecipeById = (id: string): Recipe | undefined => {
  return recipes.find(recipe => recipe.id === id);
};