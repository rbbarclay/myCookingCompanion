import React, { useState } from 'react';
import { RecipeTemplate, RecipeUpload as RecipeUploadType, Ingredient } from '../types/enhanced-recipe';
import { RecipeManager, RecipeValidator } from '../utils/recipe-manager';

interface RecipeUploadProps {
  onRecipeAdded?: (recipeId: string) => void;
  onClose?: () => void;
}

export const RecipeUpload: React.FC<RecipeUploadProps> = ({ onRecipeAdded, onClose }) => {
  const [template, setTemplate] = useState<RecipeTemplate>({
    title: '',
    primaryCategory: '',
    secondaryTags: [],
    prepTime: 0,
    cookTime: 0,
    costPerServing: 0,
    servings: 1,
    skillLevel: 'beginner',
    equipmentNeeded: [],
    emotionalHook: '',
    ingredients: [],
    baseInstructions: [],
    tips: [],
    dietary: [],
    mealType: [],
    mainPhoto: ''
  });

  const [additionalLevels, setAdditionalLevels] = useState<{
    intermediate?: string[];
    advanced?: string[];
  }>({});

  const [currentIngredient, setCurrentIngredient] = useState<Ingredient>({
    name: '',
    amount: 0,
    unit: '',
    cost: 0,
    swaps: []
  });

  const [currentInstruction, setCurrentInstruction] = useState('');
  const [currentTip, setCurrentTip] = useState('');
  const [currentTag, setCurrentTag] = useState('');
  const [errors, setErrors] = useState<string[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Category options (should match your existing categories)
  const categoryOptions = [
    'before-payday', 'date-night', '10-minutes', 'cheap-cheerful', 
    'meal-prep', 'flatmate-feast', 'fridge-cleanout', 'comfort-classics'
  ];

  const skillLevelOptions = ['beginner', 'intermediate', 'advanced'] as const;
  const dietaryOptions = ['vegetarian', 'vegan', 'gluten-free', 'dairy-free', 'nut-free'];
  const mealTypeOptions = ['breakfast', 'lunch', 'dinner', 'snack'];
  const equipmentOptions = ['oven', 'stovetop', 'microwave', 'air-fryer', 'blender', 'mixer'];

  const handleInputChange = (field: keyof RecipeTemplate, value: any) => {
    setTemplate(prev => ({ ...prev, [field]: value }));
  };

  const addIngredient = () => {
    if (currentIngredient.name && currentIngredient.amount > 0) {
      setTemplate(prev => ({
        ...prev,
        ingredients: [...prev.ingredients, { ...currentIngredient }]
      }));
      setCurrentIngredient({ name: '', amount: 0, unit: '', cost: 0, swaps: [] });
    }
  };

  const removeIngredient = (index: number) => {
    setTemplate(prev => ({
      ...prev,
      ingredients: prev.ingredients.filter((_, i) => i !== index)
    }));
  };

  const addInstruction = () => {
    if (currentInstruction.trim()) {
      setTemplate(prev => ({
        ...prev,
        baseInstructions: [...prev.baseInstructions, currentInstruction.trim()]
      }));
      setCurrentInstruction('');
    }
  };

  const removeInstruction = (index: number) => {
    setTemplate(prev => ({
      ...prev,
      baseInstructions: prev.baseInstructions.filter((_, i) => i !== index)
    }));
  };

  const addTip = () => {
    if (currentTip.trim()) {
      setTemplate(prev => ({
        ...prev,
        tips: [...prev.tips, currentTip.trim()]
      }));
      setCurrentTip('');
    }
  };

  const addTag = () => {
    if (currentTag.trim() && !template.secondaryTags.includes(currentTag.trim())) {
      setTemplate(prev => ({
        ...prev,
        secondaryTags: [...prev.secondaryTags, currentTag.trim()]
      }));
      setCurrentTag('');
    }
  };

  const toggleArrayItem = (array: string[], item: string, field: keyof RecipeTemplate) => {
    const newArray = array.includes(item) 
      ? array.filter(i => i !== item)
      : [...array, item];
    handleInputChange(field, newArray);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setErrors([]);

    // Validate the template
    const validation = RecipeValidator.validateTemplate(template);
    if (!validation.isValid) {
      setErrors(validation.errors);
      setIsSubmitting(false);
      return;
    }

    try {
      const upload: RecipeUploadType = {
        recipe: template,
        additionalLevels: Object.keys(additionalLevels).length > 0 ? additionalLevels : undefined
      };

      const newRecipe = RecipeManager.processUpload(upload);
      await RecipeManager.saveRecipe(newRecipe);
      
      onRecipeAdded?.(newRecipe.id);
      onClose?.();
    } catch (error) {
      setErrors(['Failed to save recipe. Please try again.']);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg p-6 w-full max-w-4xl max-h-screen overflow-y-auto">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-gray-900">Add New Recipe</h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700"
          >
            ✕
          </button>
        </div>

        {errors.length > 0 && (
          <div className="bg-red-50 border border-red-200 rounded-md p-4 mb-6">
            <h3 className="text-red-800 font-medium mb-2">Please fix the following errors:</h3>
            <ul className="text-red-700 text-sm space-y-1">
              {errors.map((error, index) => (
                <li key={index}>• {error}</li>
              ))}
            </ul>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Basic Information */}
          <section>
            <h3 className="text-lg font-semibold mb-4">Basic Information</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Recipe Title *
                </label>
                <input
                  type="text"
                  value={template.title}
                  onChange={(e) => handleInputChange('title', e.target.value)}
                  className="w-full p-2 border border-gray-300 rounded-md"
                  placeholder="e.g., Garlic Butter Salmon"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Primary Category *
                </label>
                <select
                  value={template.primaryCategory}
                  onChange={(e) => handleInputChange('primaryCategory', e.target.value)}
                  className="w-full p-2 border border-gray-300 rounded-md"
                >
                  <option value="">Select category</option>
                  {categoryOptions.map(cat => (
                    <option key={cat} value={cat}>{cat}</option>
                  ))}
                </select>
              </div>

              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Emotional Hook *
                </label>
                <textarea
                  value={template.emotionalHook}
                  onChange={(e) => handleInputChange('emotionalHook', e.target.value)}
                  className="w-full p-2 border border-gray-300 rounded-md"
                  rows={2}
                  placeholder="1-2 sentences connecting the recipe to the category (e.g., 'Looks like a restaurant dish, but you can make it in under 20 minutes for less than $5 a plate.')"
                />
              </div>
            </div>
          </section>

          {/* Time and Cost */}
          <section>
            <h3 className="text-lg font-semibold mb-4">Time & Cost</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Prep Time (min) *
                </label>
                <input
                  type="number"
                  value={template.prepTime}
                  onChange={(e) => handleInputChange('prepTime', parseInt(e.target.value) || 0)}
                  className="w-full p-2 border border-gray-300 rounded-md"
                  min="0"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Cook Time (min) *
                </label>
                <input
                  type="number"
                  value={template.cookTime}
                  onChange={(e) => handleInputChange('cookTime', parseInt(e.target.value) || 0)}
                  className="w-full p-2 border border-gray-300 rounded-md"
                  min="0"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Cost per Serving ($) *
                </label>
                <input
                  type="number"
                  step="0.01"
                  value={template.costPerServing}
                  onChange={(e) => handleInputChange('costPerServing', parseFloat(e.target.value) || 0)}
                  className="w-full p-2 border border-gray-300 rounded-md"
                  min="0"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Servings *
                </label>
                <input
                  type="number"
                  value={template.servings}
                  onChange={(e) => handleInputChange('servings', parseInt(e.target.value) || 1)}
                  className="w-full p-2 border border-gray-300 rounded-md"
                  min="1"
                />
              </div>
            </div>
          </section>

          {/* Skill Level and Equipment */}
          <section>
            <h3 className="text-lg font-semibold mb-4">Skill & Equipment</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Skill Level *
                </label>
                <select
                  value={template.skillLevel}
                  onChange={(e) => handleInputChange('skillLevel', e.target.value)}
                  className="w-full p-2 border border-gray-300 rounded-md"
                >
                  {skillLevelOptions.map(level => (
                    <option key={level} value={level}>{level}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Equipment Needed
                </label>
                <div className="flex flex-wrap gap-2">
                  {equipmentOptions.map(equipment => (
                    <label key={equipment} className="inline-flex items-center">
                      <input
                        type="checkbox"
                        checked={template.equipmentNeeded.includes(equipment)}
                        onChange={() => toggleArrayItem(template.equipmentNeeded, equipment, 'equipmentNeeded')}
                        className="rounded border-gray-300 text-indigo-600"
                      />
                      <span className="ml-2 text-sm">{equipment}</span>
                    </label>
                  ))}
                </div>
              </div>
            </div>
          </section>

          {/* Ingredients */}
          <section>
            <h3 className="text-lg font-semibold mb-4">Ingredients</h3>
            
            {/* Add ingredient form */}
            <div className="grid grid-cols-2 md:grid-cols-5 gap-2 mb-4">
              <input
                type="text"
                placeholder="Ingredient name"
                value={currentIngredient.name}
                onChange={(e) => setCurrentIngredient(prev => ({ ...prev, name: e.target.value }))}
                className="p-2 border border-gray-300 rounded-md"
              />
              <input
                type="number"
                placeholder="Amount"
                value={currentIngredient.amount || ''}
                onChange={(e) => setCurrentIngredient(prev => ({ ...prev, amount: parseFloat(e.target.value) || 0 }))}
                className="p-2 border border-gray-300 rounded-md"
              />
              <input
                type="text"
                placeholder="Unit"
                value={currentIngredient.unit}
                onChange={(e) => setCurrentIngredient(prev => ({ ...prev, unit: e.target.value }))}
                className="p-2 border border-gray-300 rounded-md"
              />
              <input
                type="number"
                step="0.01"
                placeholder="Cost ($)"
                value={currentIngredient.cost || ''}
                onChange={(e) => setCurrentIngredient(prev => ({ ...prev, cost: parseFloat(e.target.value) || 0 }))}
                className="p-2 border border-gray-300 rounded-md"
              />
              <button
                type="button"
                onClick={addIngredient}
                className="bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700"
              >
                Add
              </button>
            </div>

            {/* Ingredients list */}
            <div className="space-y-2">
              {template.ingredients.map((ingredient, index) => (
                <div key={index} className="flex items-center justify-between p-2 bg-gray-50 rounded">
                  <span>
                    {ingredient.amount} {ingredient.unit} {ingredient.name} (${ingredient.cost.toFixed(2)})
                  </span>
                  <button
                    type="button"
                    onClick={() => removeIngredient(index)}
                    className="text-red-600 hover:text-red-800"
                  >
                    Remove
                  </button>
                </div>
              ))}
            </div>
          </section>

          {/* Submit Button */}
          <div className="flex justify-end space-x-4 pt-6 border-t">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-gray-700 bg-gray-200 rounded-md hover:bg-gray-300"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              className="px-6 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 disabled:opacity-50"
            >
              {isSubmitting ? 'Saving...' : 'Save Recipe'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};