import React from 'react';
import { ChefHat } from 'lucide-react';

export const Header: React.FC = () => {
  return (
    <header className="bg-white shadow-sm border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 py-4">
        <div className="flex items-center gap-3">
          <div className="bg-blue-600 p-2 rounded-lg">
            <ChefHat className="w-6 h-6 text-white" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Budget Bites</h1>
            <p className="text-sm text-gray-600">Delicious recipes for young adults on a budget</p>
          </div>
        </div>
      </div>
    </header>
  );
};