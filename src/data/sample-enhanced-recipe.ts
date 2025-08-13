import { EnhancedRecipe } from '../types/enhanced-recipe';

// Sample recipe based on the provided template: Garlic Butter Salmon
export const sampleGarlicButterSalmon: EnhancedRecipe = {
  id: 'sample-garlic-butter-salmon',
  title: 'Garlic Butter Salmon',
  primaryCategory: 'date-night',
  secondaryTags: ['pescatarian', 'low-carb', 'high-protein', 'quick', 'restaurant-style'],
  
  // Time & Cost
  prepTime: 5,
  cookTime: 15,
  totalTime: 20,
  costPerServing: 4.50,
  servings: 2,
  
  // Skill & Equipment
  skillLevel: 'beginner',
  equipmentNeeded: ['oven', 'oven-safe-pan'],
  
  // Content
  emotionalHook: "Looks like a restaurant dish, but you can make it in under 20 minutes for less than $5 a plate.",
  
  ingredients: [
    { name: 'Salmon fillets', amount: 2, unit: 'fillets (150g each)', cost: 3.50, swaps: ['cod fillets', 'chicken breast'] },
    { name: 'Butter', amount: 2, unit: 'tbsp', cost: 0.30, swaps: ['olive oil', 'margarine'] },
    { name: 'Garlic cloves', amount: 2, unit: 'cloves, minced', cost: 0.10 },
    { name: 'Lemon juice', amount: 1, unit: 'tbsp', cost: 0.15 },
    { name: 'Salt', amount: 1, unit: 'pinch', cost: 0.02 },
    { name: 'Black pepper', amount: 1, unit: 'pinch', cost: 0.02 },
    { name: 'Fresh parsley', amount: 1, unit: 'tbsp chopped', cost: 0.25, swaps: ['dried parsley'] }
  ],
  
  instructions: [
    {
      level: 'base',
      steps: [
        'Pat salmon dry, season with salt & pepper.',
        'Melt butter in oven-safe pan, add garlic for 1 min.',
        'Place salmon skin-side down, spoon butter over top.',
        'Bake at 200°C (390°F) for 10–12 min until flaky.',
        'Garnish with parsley and serve with lemon wedge.'
      ]
    },
    {
      level: 'intermediate',
      steps: [
        'Pat salmon dry, season with salt & pepper.',
        'Heat oven-safe pan over medium-high heat.',
        'Sear salmon skin-side down for 2-3 minutes until skin is crispy.',
        'Add butter and garlic to pan, cook for 1 minute.',
        'Spoon garlic butter over salmon and transfer to oven.',
        'Bake at 200°C (390°F) for 8-10 minutes until flaky.',
        'Drizzle with lemon juice, garnish with parsley.'
      ]
    },
    {
      level: 'advanced',
      steps: [
        'Pat salmon dry, season with salt & pepper 15 minutes ahead.',
        'Heat oven-safe pan over medium-high heat with a touch of oil.',
        'Sear salmon skin-side down for 2-3 minutes until crispy.',
        'Flip and sear flesh side for 1 minute.',
        'Remove salmon, reduce heat to medium.',
        'Add butter, garlic, and lemon juice to create reduction sauce.',
        'Return salmon to pan, spoon sauce over, transfer to oven.',
        'Bake at 200°C (390°F) for 6-8 minutes.',
        'Plate with sauce drizzle and fresh herb garnish.'
      ]
    }
  ],
  
  equipmentVariations: [
    {
      equipment: 'air-fryer',
      instructions: [
        'Pat salmon dry, season with salt & pepper.',
        'Brush with melted butter and minced garlic.',
        'Cook in air fryer at 200°C (390°F) for 8-10 minutes.',
        'Drizzle with lemon juice and garnish with parsley.'
      ],
      timeAdjustment: -5
    },
    {
      equipment: 'stovetop',
      instructions: [
        'Pat salmon dry, season with salt & pepper.',
        'Heat butter in pan over medium heat, add garlic.',
        'Pan-fry salmon 4-5 minutes per side.',
        'Spoon garlic butter over salmon while cooking.',
        'Finish with lemon juice and parsley.'
      ],
      timeAdjustment: 0
    }
  ],
  
  nutrition: {
    calories: 320,
    protein: 28,
    carbs: 0,
    fat: 22
  },
  
  tips: [
    'Serve with roasted potatoes or steamed green beans for a full meal.',
    'Butter can be swapped for margarine to reduce cost.',
    'Buy salmon when on sale and freeze portions.',
    'Pat salmon completely dry for best searing results.'
  ],
  
  media: {
    mainPhoto: 'https://images.pexels.com/photos/1516415/pexels-photo-1516415.jpeg',
    stepPhotos: [
      'https://images.pexels.com/photos/3992206/pexels-photo-3992206.jpeg', // Seasoning
      'https://images.pexels.com/photos/4397284/pexels-photo-4397284.jpeg'  // Cooking
    ]
  },
  
  dietary: ['pescatarian', 'low-carb', 'high-protein'],
  mealType: ['dinner'],
  
  createdAt: new Date().toISOString(),
  updatedAt: new Date().toISOString(),
  author: 'Budget Bites Team',
  difficulty: 'Easy'
};