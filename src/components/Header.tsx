import React from 'react';
import { ChefHat, Settings } from 'lucide-react';
import { OfflineIndicator } from './OfflineBanner';

interface HeaderProps {
  onManageRecipes?: () => void;
}

export const Header: React.FC<HeaderProps> = ({ onManageRecipes }) => {
  return (
    <header className="bg-white shadow-sm border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="bg-blue-600 p-2 rounded-lg">
              <ChefHat className="w-6 h-6 text-white" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-2xl font-bold text-gray-900">Budget Bites</h1>
                <OfflineIndicator />
              </div>
              <p className="text-sm text-gray-600">Delicious recipes for young adults on a budget</p>
            </div>
          </div>
          
          {onManageRecipes && (
            <button
              onClick={onManageRecipes}
              className="flex items-center gap-2 px-3 py-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-md transition-colors"
              title="Manage Recipes"
            >
              <Settings className="w-4 h-4" />
              <span className="hidden sm:inline">Manage Recipes</span>
            </button>
          )}
        </div>
      </div>
    </header>
  );
};