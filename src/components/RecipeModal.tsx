import React from 'react';
import { X, Clock, Users, DollarSign, ChefHat, CheckCircle } from 'lucide-react';
import { Recipe } from '../types/recipe';
import { getCategoryById } from '../data/categories';

interface RecipeModalProps {
  recipe: Recipe | null;
  isOpen: boolean;
  onClose: () => void;
}

export const RecipeModal: React.FC<RecipeModalProps> = ({ recipe, isOpen, onClose }) => {
  if (!isOpen || !recipe) return null;

  const totalTime = recipe.prepTime + recipe.cookTime;
  const totalCost = recipe.ingredients.reduce((sum, ingredient) => sum + ingredient.cost, 0);
  const category = getCategoryById(recipe.category);

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
        <div className="relative">
          <img 
            src={recipe.image} 
            alt={recipe.title}
            className="w-full h-64 object-cover rounded-t-xl"
          />
          <button
            onClick={onClose}
            className="absolute top-4 right-4 bg-white rounded-full p-2 shadow-lg hover:bg-gray-100 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
        
        <div className="p-6">
          <div className="mb-4">
            {category && (
              <div className={`inline-flex items-center gap-2 px-3 py-1 rounded-full text-sm font-medium ${category.bgColor} ${category.color} mb-3`}>
                <span>{category.icon}</span>
                <span>{category.name}</span>
              </div>
            )}
            <h2 className="text-2xl font-bold text-gray-800 mb-2">{recipe.title}</h2>
            <p className="text-gray-600">{recipe.description}</p>
            {recipe.categoryDescription && (
              <p className="text-blue-600 text-sm mt-2 italic">
                💡 {recipe.categoryDescription}
              </p>
            )}
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
            <div className="bg-blue-50 p-3 rounded-lg text-center">
              <Clock className="w-6 h-6 text-blue-600 mx-auto mb-1" />
              <div className="text-sm text-gray-600">Total Time</div>
              <div className="font-semibold text-blue-600">{totalTime} min</div>
            </div>
            
            <div className="bg-green-50 p-3 rounded-lg text-center">
              <Users className="w-6 h-6 text-green-600 mx-auto mb-1" />
              <div className="text-sm text-gray-600">Servings</div>
              <div className="font-semibold text-green-600">{recipe.servings}</div>
            </div>
            
            <div className="bg-purple-50 p-3 rounded-lg text-center">
              <DollarSign className="w-6 h-6 text-purple-600 mx-auto mb-1" />
              <div className="text-sm text-gray-600">Est. Cost</div>
              <div className="font-semibold text-purple-600">${totalCost.toFixed(2)}</div>
            </div>
            
            <div className="bg-orange-50 p-3 rounded-lg text-center">
              <ChefHat className="w-6 h-6 text-orange-600 mx-auto mb-1" />
              <div className="text-sm text-gray-600">Difficulty</div>
              <div className="font-semibold text-orange-600">{recipe.difficulty}</div>
            </div>
          </div>
          
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <h3 className="text-lg font-semibold text-gray-800 mb-3">Ingredients</h3>
              <div className="space-y-2">
                {recipe.ingredients.map((ingredient) => (
                  <div key={ingredient.id} className="flex items-center justify-between p-2 bg-gray-50 rounded-lg">
                    <div className="flex items-center gap-2">
                      <CheckCircle className="w-4 h-4 text-green-500" />
                      <span className="text-gray-700">
                        {ingredient.amount} {ingredient.unit} {ingredient.name}
                      </span>
                    </div>
                    <span className="text-sm text-gray-500">${ingredient.cost.toFixed(2)}</span>
                  </div>
                ))}
              </div>
              
              <div className="mt-4 p-3 bg-blue-50 rounded-lg">
                <div className="text-sm text-blue-700 font-medium">💡 Money-Saving Tip</div>
                <div className="text-sm text-blue-600 mt-1">
                  Essential ingredients only: ${recipe.ingredients.filter(i => i.essential).reduce((sum, i) => sum + i.cost, 0).toFixed(2)}
                </div>
              </div>
            </div>
            
            <div>
              <h3 className="text-lg font-semibold text-gray-800 mb-3">Instructions</h3>
              <div className="space-y-3">
                {recipe.instructions.map((instruction, index) => (
                  <div key={index} className="flex gap-3">
                    <div className="flex-shrink-0 w-6 h-6 bg-blue-600 text-white rounded-full flex items-center justify-center text-sm font-medium">
                      {index + 1}
                    </div>
                    <p className="text-gray-700 leading-relaxed">{instruction}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
          
          {recipe.nutritionInfo && (
            <div className="mt-6 p-4 bg-gray-50 rounded-lg">
              <h3 className="text-lg font-semibold text-gray-800 mb-3">Nutrition (per serving)</h3>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
                <div>
                  <div className="text-2xl font-bold text-gray-800">{recipe.nutritionInfo.calories}</div>
                  <div className="text-sm text-gray-600">Calories</div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-gray-800">{recipe.nutritionInfo.protein}g</div>
                  <div className="text-sm text-gray-600">Protein</div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-gray-800">{recipe.nutritionInfo.carbs}g</div>
                  <div className="text-sm text-gray-600">Carbs</div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-gray-800">{recipe.nutritionInfo.fat}g</div>
                  <div className="text-sm text-gray-600">Fat</div>
                </div>
              </div>
            </div>
          )}
          
          <div className="mt-6">
            <h3 className="text-lg font-semibold text-gray-800 mb-2">Tags</h3>
            <div className="flex flex-wrap gap-2">
              {recipe.tags.map((tag) => (
                <span 
                  key={tag}
                  className="px-3 py-1 bg-blue-100 text-blue-700 text-sm rounded-full"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};