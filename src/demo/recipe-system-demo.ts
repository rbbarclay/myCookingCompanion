import { RecipeManager, RecipeValidator } from '../utils/recipe-manager';
import { RecipeTemplate, EnhancedRecipe } from '../types/enhanced-recipe';
import { sampleGarlicButterSalmon } from '../data/sample-enhanced-recipe';

// Demo function to test the recipe management system
export async function demoRecipeSystem() {
  console.log('🧪 Testing Recipe Management System');
  
  try {
    // 1. Test saving an enhanced recipe
    console.log('\n1. Saving sample enhanced recipe...');
    await RecipeManager.saveRecipe(sampleGarlicButterSalmon);
    console.log('✅ Enhanced recipe saved successfully');
    
    // 2. Test retrieving all recipes
    console.log('\n2. Retrieving all recipes...');
    const allRecipes = await RecipeManager.getAllRecipes();
    console.log(`✅ Found ${allRecipes.length} recipe(s)`);
    
    // 3. Test searching recipes
    console.log('\n3. Testing search functionality...');
    const searchResults = await RecipeManager.searchRecipes('salmon');
    console.log(`✅ Search for 'salmon' returned ${searchResults.length} result(s)`);
    
    // 4. Test recipe validation
    console.log('\n4. Testing recipe validation...');
    const testTemplate: RecipeTemplate = {
      title: 'Quick Pasta',
      primaryCategory: 'quick-meals',
      secondaryTags: ['italian', 'vegetarian'],
      prepTime: 5,
      cookTime: 10,
      costPerServing: 2.50,
      servings: 2,
      skillLevel: 'beginner',
      equipmentNeeded: ['stovetop', 'pot'],
      emotionalHook: 'Perfect for when you need dinner in 15 minutes!',
      ingredients: [
        { name: 'Pasta', amount: 200, unit: 'g', cost: 0.50 },
        { name: 'Olive oil', amount: 2, unit: 'tbsp', cost: 0.20 }
      ],
      baseInstructions: [
        'Boil water and cook pasta',
        'Drain and toss with olive oil'
      ],
      tips: ['Use any pasta shape you have'],
      dietary: ['vegetarian'],
      mealType: ['lunch', 'dinner'],
      mainPhoto: 'https://example.com/pasta.jpg'
    };
    
    const validation = RecipeValidator.validateTemplate(testTemplate);
    console.log(`✅ Template validation: ${validation.isValid ? 'PASSED' : 'FAILED'}`);
    if (!validation.isValid) {
      console.log('❌ Validation errors:', validation.errors);
    }
    
    // 5. Test creating recipe from template
    if (validation.isValid) {
      console.log('\n5. Creating recipe from template...');
      const newRecipe = RecipeManager.createFromTemplate(testTemplate);
      await RecipeManager.saveRecipe(newRecipe);
      console.log(`✅ Recipe "${newRecipe.title}" created with ID: ${newRecipe.id}`);
    }
    
    // 6. Test export functionality
    console.log('\n6. Testing export functionality...');
    const exportedRecipes = await RecipeManager.exportRecipes();
    console.log(`✅ Exported ${exportedRecipes.length} recipe(s)`);
    
    // 7. Test legacy conversion
    console.log('\n7. Testing legacy conversion...');
    const legacyRecipe = RecipeManager.convertEnhancedToLegacy(sampleGarlicButterSalmon);
    console.log(`✅ Converted enhanced recipe to legacy format: "${legacyRecipe.name}"`);
    
    const backToEnhanced = RecipeManager.convertLegacyToEnhanced(legacyRecipe);
    console.log(`✅ Converted back to enhanced format: "${backToEnhanced.title}"`);
    
    console.log('\n🎉 All tests completed successfully!');
    
    return {
      success: true,
      recipesCount: allRecipes.length,
      searchResults: searchResults.length,
      validationPassed: validation.isValid
    };
    
  } catch (error) {
    console.error('❌ Demo failed:', error);
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error'
    };
  }
}

// Utility function to demonstrate recipe filtering
export function demoRecipeFiltering(recipes: EnhancedRecipe[]) {
  console.log('\n🔍 Testing Recipe Filtering');
  
  // Filter by cost
  const cheapRecipes = recipes.filter(r => r.costPerServing <= 3.00);
  console.log(`💰 Recipes under $3: ${cheapRecipes.length}`);
  
  // Filter by time
  const quickRecipes = recipes.filter(r => r.totalTime <= 20);
  console.log(`⏱️ Recipes under 20 minutes: ${quickRecipes.length}`);
  
  // Filter by skill level
  const beginnerRecipes = recipes.filter(r => r.skillLevel === 'beginner');
  console.log(`👶 Beginner recipes: ${beginnerRecipes.length}`);
  
  // Filter by dietary requirements
  const vegetarianRecipes = recipes.filter(r => r.dietary.includes('vegetarian'));
  console.log(`🥕 Vegetarian recipes: ${vegetarianRecipes.length}`);
  
  // Filter by equipment
  const ovenRecipes = recipes.filter(r => 
    r.equipmentNeeded.includes('oven') || 
    r.equipmentVariations.some(v => v.equipment === 'oven')
  );
  console.log(`🔥 Oven recipes: ${ovenRecipes.length}`);
  
  return {
    totalRecipes: recipes.length,
    byCategory: {
      cheap: cheapRecipes.length,
      quick: quickRecipes.length,
      beginner: beginnerRecipes.length,
      vegetarian: vegetarianRecipes.length,
      oven: ovenRecipes.length
    }
  };
}