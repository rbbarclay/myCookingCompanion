import React from 'react';
import { X, Clock, DollarSign, Users, ChefHat } from 'lucide-react';
import { Recipe } from '../types/recipe';
import { getCategoryById } from '../data/categories';

interface RecipeModalProps {
  recipe: Recipe | null;
  isOpen: boolean;
  onClose: () => void;
}

export const RecipeModal: React.FC<RecipeModalProps> = ({ recipe, isOpen, onClose }) => {
  if (!isOpen || !recipe) return null;

  const category = getCategoryById(recipe.categoryId);

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
        <div className="relative">
          <img 
            src={recipe.image} 
            alt={recipe.name}
            className="w-full h-64 object-cover"
          />
          <button
            onClick={onClose}
            className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm rounded-full p-2 hover:bg-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
          <div className="absolute top-4 left-4">
            <span className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-sm font-medium ${category?.bgColor} ${category?.color}`}>
              <span>{category?.icon}</span>
              {category?.name}
            </span>
          </div>
        </div>
        
        <div className="p-6">
          <div className="flex justify-between items-start mb-4">
            <h2 className="text-3xl font-bold text-gray-900">{recipe.name}</h2>
            <div className="text-right">
              <div className="text-2xl font-bold text-green-600">${recipe.estimatedCost.toFixed(2)}</div>
              <div className="text-sm text-gray-500">per serving</div>
            </div>
          </div>
          
          <p className="text-gray-600 mb-6">{recipe.description}</p>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
            <div className="text-center p-3 bg-gray-50 rounded-lg">
              <Clock className="w-6 h-6 mx-auto mb-1 text-blue-600" />
              <div className="text-sm font-medium">Total Time</div>
              <div className="text-lg font-bold">{recipe.prepTime + recipe.cookTime} min</div>
            </div>
            <div className="text-center p-3 bg-gray-50 rounded-lg">
              <Users className="w-6 h-6 mx-auto mb-1 text-green-600" />
              <div className="text-sm font-medium">Servings</div>
              <div className="text-lg font-bold">{recipe.servings}</div>
            </div>
            <div className="text-center p-3 bg-gray-50 rounded-lg">
              <ChefHat className="w-6 h-6 mx-auto mb-1 text-purple-600" />
              <div className="text-sm font-medium">Difficulty</div>
              <div className="text-lg font-bold">{recipe.difficulty}</div>
            </div>
            <div className="text-center p-3 bg-gray-50 rounded-lg">
              <DollarSign className="w-6 h-6 mx-auto mb-1 text-orange-600" />
              <div className="text-sm font-medium">Budget</div>
              <div className="text-lg font-bold">Low</div>
            </div>
          </div>
          
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <h3 className="text-xl font-bold mb-3">Ingredients</h3>
              <ul className="space-y-2">
                {recipe.ingredients.map((ingredient, index) => (
                  <li key={index} className="flex justify-between items-center py-2 border-b border-gray-100">
                    <span>{ingredient.amount} {ingredient.unit} {ingredient.name}</span>
                    <span className="text-green-600 font-medium">${ingredient.cost.toFixed(2)}</span>
                  </li>
                ))}
              </ul>
            </div>
            
            <div>
              <h3 className="text-xl font-bold mb-3">Instructions</h3>
              <ol className="space-y-3">
                {recipe.instructions.map((instruction, index) => (
                  <li key={index} className="flex gap-3">
                    <span className="flex-shrink-0 w-6 h-6 bg-blue-600 text-white rounded-full flex items-center justify-center text-sm font-bold">
                      {index + 1}
                    </span>
                    <span className="text-gray-700">{instruction}</span>
                  </li>
                ))}
              </ol>
            </div>
          </div>
          
          {recipe.tips && recipe.tips.length > 0 && (
            <div className="mt-6 p-4 bg-yellow-50 rounded-lg">
              <h4 className="font-bold text-yellow-800 mb-2">💡 Money-Saving Tips</h4>
              <ul className="space-y-1">
                {recipe.tips.map((tip, index) => (
                  <li key={index} className="text-yellow-700 text-sm">• {tip}</li>
                ))}
              </ul>
            </div>
          )}
          
          <div className="mt-6">
            <div className="flex flex-wrap gap-2">
              {recipe.tags.map((tag, index) => (
                <span 
                  key={index}
                  className="inline-block bg-gray-100 text-gray-700 text-sm px-3 py-1 rounded-full"
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