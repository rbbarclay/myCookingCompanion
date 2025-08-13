import { useState } from 'react';
import { Header } from './components/Header';
import { SearchBar } from './components/SearchBar';
import { FilterPanel } from './components/FilterPanel';
import { CategoryGrid } from './components/CategoryGrid';
import { RecipeCard } from './components/RecipeCard';
import { RecipeModal } from './components/RecipeModal';
import { RecipeManager } from './components/RecipeManager';
import { OfflineBanner, ConnectionToast } from './components/OfflineBanner';
import { useRecipes } from './hooks/useRecipes';
import { Recipe } from './types/recipe';
import { getCategoryById } from './data/categories';

function App() {
  const { 
    recipes, 
    searchTerm, 
    setSearchTerm, 
    filters, 
    setFilters, 
    selectedCategory,
    setSelectedCategory,
    totalRecipes 
  } = useRecipes();
  
  const [selectedRecipe, setSelectedRecipe] = useState<Recipe | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [showCategories, setShowCategories] = useState(true);
  const [showRecipeManager, setShowRecipeManager] = useState(false);

  const handleRecipeClick = (recipe: Recipe) => {
    setSelectedRecipe(recipe);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedRecipe(null);
  };

  const handleCategorySelect = (categoryId: string | null) => {
    setSelectedCategory(categoryId);
    setShowCategories(false);
  };

  const selectedCategoryData = selectedCategory ? getCategoryById(selectedCategory) : null;

  return (
    <div className="min-h-screen bg-gray-50">
      <Header onManageRecipes={() => setShowRecipeManager(true)} />
      
      <main className="max-w-7xl mx-auto px-4 py-8">
        {/* Offline Banner */}
        <OfflineBanner className="mb-6" />
        
        {showCategories ? (
          <CategoryGrid
            recipes={recipes}
            onCategorySelect={handleCategorySelect}
            selectedCategory={selectedCategory}
          />
        ) : (
          <>
            <div className="mb-6">
              <button
                onClick={() => setShowCategories(true)}
                className="text-blue-600 hover:text-blue-700 text-sm font-medium mb-4 flex items-center gap-1"
              >
                ← Back to Categories
              </button>
              
              {selectedCategoryData && (
                <div className={`p-4 rounded-xl ${selectedCategoryData.bgColor} mb-6`}>
                  <div className="flex items-center gap-3 mb-2">
                    <span className="text-2xl">{selectedCategoryData.icon}</span>
                    <h2 className={`text-xl font-bold ${selectedCategoryData.color}`}>
                      {selectedCategoryData.name}
                    </h2>
                  </div>
                  <p className={`${selectedCategoryData.color} opacity-80`}>
                    {selectedCategoryData.description}
                  </p>
                </div>
              )}
            </div>
            
            <div className="mb-8 space-y-4">
              <SearchBar 
                searchTerm={searchTerm}
                onSearchChange={setSearchTerm}
              />
              
              <FilterPanel
                filters={filters}
                onFiltersChange={setFilters}
                isOpen={isFilterOpen}
                onToggle={() => setIsFilterOpen(!isFilterOpen)}
              />
            </div>
            
            <div className="mb-6">
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-semibold text-gray-800">
                  {selectedCategory 
                    ? `${selectedCategoryData?.name} (${recipes.length})`
                    : recipes.length === totalRecipes 
                      ? `All Recipes (${recipes.length})`
                      : `Found ${recipes.length} of ${totalRecipes} recipes`
                  }
                </h2>
                
                {recipes.length > 0 && (
                  <div className="text-sm text-gray-600">
                    Avg cost: ${(recipes.reduce((sum, r) => sum + r.estimatedCost, 0) / recipes.length).toFixed(2)}
                  </div>
                )}
              </div>
            </div>
            
            {recipes.length === 0 ? (
              <div className="text-center py-12">
                <div className="text-gray-400 text-6xl mb-4">🍳</div>
                <h3 className="text-xl font-semibold text-gray-600 mb-2">No recipes found</h3>
                <p className="text-gray-500">Try adjusting your filters or search terms</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {recipes.map((recipe) => (
                  <RecipeCard
                    key={recipe.id}
                    recipe={recipe}
                    onClick={handleRecipeClick}
                  />
                ))}
              </div>
            )}
          </>
        )}
      </main>
      
      <RecipeModal
        recipe={selectedRecipe}
        isOpen={isModalOpen}
        onClose={handleCloseModal}
      />
      
      <RecipeManager
        isOpen={showRecipeManager}
        onClose={() => setShowRecipeManager(false)}
      />
      
      {/* Connection status toast */}
      <ConnectionToast />
    </div>
  );
}

export default App;
