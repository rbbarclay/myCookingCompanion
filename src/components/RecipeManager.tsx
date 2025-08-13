import React, { useState } from 'react';
import { RecipeUpload } from './RecipeUpload';
import { useEnhancedRecipes } from '../hooks/useEnhancedRecipes';
import { useOffline } from '../hooks/useOffline';
import { ImageCacheManager } from '../utils/image-cache';
import { EnhancedRecipe } from '../types/enhanced-recipe';

interface RecipeManagerProps {
  isOpen: boolean;
  onClose: () => void;
}

export const RecipeManager: React.FC<RecipeManagerProps> = ({ isOpen, onClose }) => {
  const { allRecipes, deleteRecipe, exportRecipes, importRecipes } = useEnhancedRecipes();
  const { isOffline } = useOffline();
  const [showUpload, setShowUpload] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedRecipes, setSelectedRecipes] = useState<Set<string>>(new Set());
  const [cacheStatus, setCacheStatus] = useState<{downloading: boolean; progress: string}>({
    downloading: false,
    progress: ''
  });

  if (!isOpen) return null;

  const filteredRecipes = allRecipes.filter(recipe =>
    recipe.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    recipe.primaryCategory.toLowerCase().includes(searchTerm.toLowerCase()) ||
    recipe.secondaryTags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  const handleDeleteSelected = async () => {
    if (selectedRecipes.size === 0) return;
    
    const confirmDelete = window.confirm(
      `Are you sure you want to delete ${selectedRecipes.size} recipe(s)? This action cannot be undone.`
    );
    
    if (confirmDelete) {
      try {
        await Promise.all(Array.from(selectedRecipes).map(id => deleteRecipe(id)));
        setSelectedRecipes(new Set());
      } catch (error) {
        alert('Error deleting recipes. Please try again.');
      }
    }
  };

  const handleExport = async () => {
    try {
      const recipes = await exportRecipes();
      const dataStr = JSON.stringify(recipes, null, 2);
      const dataUri = 'data:application/json;charset=utf-8,'+ encodeURIComponent(dataStr);
      
      const exportFileDefaultName = `budget-bites-recipes-${new Date().toISOString().split('T')[0]}.json`;
      
      const linkElement = document.createElement('a');
      linkElement.setAttribute('href', dataUri);
      linkElement.setAttribute('download', exportFileDefaultName);
      linkElement.click();
    } catch (error) {
      alert('Error exporting recipes. Please try again.');
    }
  };

  const handleImport = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    try {
      const text = await file.text();
      const importedRecipes: EnhancedRecipe[] = JSON.parse(text);
      
      // Basic validation
      if (!Array.isArray(importedRecipes)) {
        throw new Error('Invalid file format');
      }
      
      await importRecipes(importedRecipes);
      alert(`Successfully imported ${importedRecipes.length} recipes!`);
    } catch (error) {
      alert('Error importing recipes. Please check the file format and try again.');
    }
    
    // Reset the input
    event.target.value = '';
  };

  const handleCacheAllImages = async () => {
    if (isOffline) {
      alert('Cannot cache images while offline. Please connect to the internet.');
      return;
    }

    setCacheStatus({ downloading: true, progress: 'Starting download...' });
    
    try {
      const imageUrls = allRecipes
        .map(recipe => recipe.media?.mainPhoto)
        .filter(Boolean) as string[];
      
      let cached = 0;
      for (let i = 0; i < imageUrls.length; i++) {
        const url = imageUrls[i];
        setCacheStatus({ 
          downloading: true, 
          progress: `Caching image ${i + 1} of ${imageUrls.length}...` 
        });
        
        await ImageCacheManager.cacheImage(url);
        cached++;
      }

      const stats = ImageCacheManager.getCacheStats();
      setCacheStatus({ downloading: false, progress: '' });
      
      alert(`Successfully cached ${cached} recipe images for offline use!\nCache usage: ${stats.utilizationPercent}%`);
    } catch (error) {
      setCacheStatus({ downloading: false, progress: '' });
      alert('Error caching images. Please try again.');
    }
  };

  const toggleRecipeSelection = (recipeId: string) => {
    const newSelected = new Set(selectedRecipes);
    if (newSelected.has(recipeId)) {
      newSelected.delete(recipeId);
    } else {
      newSelected.add(recipeId);
    }
    setSelectedRecipes(newSelected);
  };

  const selectAll = () => {
    if (selectedRecipes.size === filteredRecipes.length) {
      setSelectedRecipes(new Set());
    } else {
      setSelectedRecipes(new Set(filteredRecipes.map(r => r.id)));
    }
  };

  return (
    <>
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-40">
        <div className="bg-white rounded-lg w-full max-w-6xl max-h-screen overflow-hidden flex flex-col">
          {/* Header */}
          <div className="flex justify-between items-center p-6 border-b">
            <h2 className="text-2xl font-bold text-gray-900">Recipe Manager</h2>
            <button
              onClick={onClose}
              className="text-gray-500 hover:text-gray-700 text-xl"
            >
              ✕
            </button>
          </div>

          {/* Controls */}
          <div className="p-6 border-b space-y-4">
            {/* Search and Actions */}
            <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
              <div className="flex-1">
                <input
                  type="text"
                  placeholder="Search recipes..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full p-2 border border-gray-300 rounded-md"
                />
              </div>
              
              <div className="flex gap-2">
                <button
                  onClick={() => setShowUpload(true)}
                  className="bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700"
                >
                  Add Recipe
                </button>
                
                <button
                  onClick={handleExport}
                  className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700"
                >
                  Export All
                </button>
                
                <label className="bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700 cursor-pointer">
                  Import
                  <input
                    type="file"
                    accept=".json"
                    onChange={handleImport}
                    className="hidden"
                  />
                </label>
                
                <button
                  onClick={handleCacheAllImages}
                  disabled={isOffline || cacheStatus.downloading}
                  className="bg-purple-600 text-white px-4 py-2 rounded-md hover:bg-purple-700 disabled:opacity-50 disabled:cursor-not-allowed"
                  title={isOffline ? 'Cannot cache while offline' : 'Cache all recipe images for offline use'}
                >
                  {cacheStatus.downloading ? 'Caching...' : 'Cache Images'}
                </button>
              </div>
            </div>

            {/* Bulk Actions */}
            {selectedRecipes.size > 0 && (
              <div className="flex items-center gap-4 p-3 bg-blue-50 rounded-md">
                <span className="text-sm text-blue-800">
                  {selectedRecipes.size} recipe(s) selected
                </span>
                <button
                  onClick={handleDeleteSelected}
                  className="bg-red-600 text-white px-3 py-1 rounded text-sm hover:bg-red-700"
                >
                  Delete Selected
                </button>
                <button
                  onClick={() => setSelectedRecipes(new Set())}
                  className="text-blue-600 hover:text-blue-800 text-sm"
                >
                  Clear Selection
                </button>
              </div>
            )}

            {/* Caching Progress */}
            {cacheStatus.downloading && (
              <div className="flex items-center gap-2 p-3 bg-purple-50 rounded-md">
                <div className="w-4 h-4 border-2 border-purple-600 border-t-transparent rounded-full animate-spin"></div>
                <span className="text-sm text-purple-800">{cacheStatus.progress}</span>
              </div>
            )}

            {/* Stats */}
            <div className="flex items-center justify-between text-sm text-gray-600">
              <span>Showing {filteredRecipes.length} of {allRecipes.length} recipes</span>
              {isOffline && (
                <span className="text-orange-600 font-medium">
                  📱 Offline Mode - Using cached data
                </span>
              )}
            </div>
          </div>

          {/* Recipe List */}
          <div className="flex-1 overflow-auto p-6">
            {filteredRecipes.length === 0 ? (
              <div className="text-center py-12">
                <p className="text-gray-500 mb-4">
                  {searchTerm ? 'No recipes match your search.' : 'No recipes found.'}
                </p>
                <button
                  onClick={() => setShowUpload(true)}
                  className="bg-green-600 text-white px-6 py-2 rounded-md hover:bg-green-700"
                >
                  Add Your First Recipe
                </button>
              </div>
            ) : (
              <div className="space-y-2">
                {/* Select All Header */}
                <div className="flex items-center p-3 bg-gray-50 rounded-md">
                  <input
                    type="checkbox"
                    checked={selectedRecipes.size === filteredRecipes.length && filteredRecipes.length > 0}
                    onChange={selectAll}
                    className="rounded border-gray-300"
                  />
                  <span className="ml-3 text-sm font-medium text-gray-700">
                    Select All ({filteredRecipes.length})
                  </span>
                </div>

                {/* Recipe Items */}
                {filteredRecipes.map((recipe) => (
                  <div
                    key={recipe.id}
                    className={`flex items-center p-4 border rounded-md ${
                      selectedRecipes.has(recipe.id) ? 'bg-blue-50 border-blue-200' : 'bg-white border-gray-200'
                    }`}
                  >
                    <input
                      type="checkbox"
                      checked={selectedRecipes.has(recipe.id)}
                      onChange={() => toggleRecipeSelection(recipe.id)}
                      className="rounded border-gray-300"
                    />
                    
                    <div className="ml-4 flex-1">
                      <div className="flex items-start justify-between">
                        <div>
                          <h3 className="font-medium text-gray-900">{recipe.title}</h3>
                          <p className="text-sm text-gray-600 mt-1">{recipe.emotionalHook}</p>
                          <div className="flex items-center gap-4 mt-2 text-xs text-gray-500">
                            <span>Category: {recipe.primaryCategory}</span>
                            <span>Time: {recipe.totalTime}min</span>
                            <span>Cost: ${recipe.costPerServing.toFixed(2)}</span>
                            <span>Skill: {recipe.skillLevel}</span>
                          </div>
                          <div className="flex flex-wrap gap-1 mt-2">
                            {recipe.secondaryTags.slice(0, 3).map(tag => (
                              <span key={tag} className="px-2 py-1 text-xs bg-gray-100 text-gray-600 rounded">
                                {tag}
                              </span>
                            ))}
                            {recipe.secondaryTags.length > 3 && (
                              <span className="px-2 py-1 text-xs bg-gray-100 text-gray-600 rounded">
                                +{recipe.secondaryTags.length - 3} more
                              </span>
                            )}
                          </div>
                        </div>
                        
                        <div className="flex items-center gap-2">
                          <span className="text-xs text-gray-400">
                            Updated: {new Date(recipe.updatedAt).toLocaleDateString()}
                          </span>
                          <button
                            onClick={() => deleteRecipe(recipe.id)}
                            className="text-red-600 hover:text-red-800 p-1"
                            title="Delete recipe"
                          >
                            🗑️
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Recipe Upload Modal */}
      {showUpload && (
        <RecipeUpload
          onRecipeAdded={(id) => {
            setShowUpload(false);
            // Could scroll to the new recipe or show a success message
          }}
          onClose={() => setShowUpload(false)}
        />
      )}
    </>
  );
};