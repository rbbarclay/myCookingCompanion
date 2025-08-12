import React from 'react';
import { Filter, X } from 'lucide-react';
import { FilterOptions } from '../types/recipe';

interface FilterPanelProps {
  filters: FilterOptions;
  onFiltersChange: (filters: FilterOptions) => void;
  isOpen: boolean;
  onToggle: () => void;
}

export const FilterPanel: React.FC<FilterPanelProps> = ({
  filters,
  onFiltersChange,
  isOpen,
  onToggle
}) => {
  const updateFilter = (key: keyof FilterOptions, value: any) => {
    onFiltersChange({ ...filters, [key]: value });
  };

  const toggleArrayFilter = (key: 'difficulty' | 'dietary' | 'mealType', value: string) => {
    const currentArray = filters[key] as string[];
    const newArray = currentArray.includes(value)
      ? currentArray.filter(item => item !== value)
      : [...currentArray, value];
    updateFilter(key, newArray);
  };

  return (
    <div className="relative">
      <button
        onClick={onToggle}
        className="flex items-center gap-2 px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors"
      >
        <Filter className="w-4 h-4" />
        <span>Filters</span>
        {(filters.difficulty.length > 0 || filters.dietary.length > 0 || filters.mealType.length > 0) && (
          <span className="bg-blue-600 text-white text-xs px-2 py-1 rounded-full">
            {filters.difficulty.length + filters.dietary.length + filters.mealType.length}
          </span>
        )}
      </button>

      {isOpen && (
        <div className="absolute top-full left-0 mt-2 w-80 bg-white border border-gray-200 rounded-lg shadow-lg p-4 z-10">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-semibold text-gray-900">Filters</h3>
            <button onClick={onToggle} className="text-gray-400 hover:text-gray-600">
              <X className="w-4 h-4" />
            </button>
          </div>

          <div className="space-y-4">
            {/* Budget Filter */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Max Budget: ${filters.maxCost}
              </label>
              <input
                type="range"
                min="1"
                max="15"
                step="0.5"
                value={filters.maxCost}
                onChange={(e) => updateFilter('maxCost', parseFloat(e.target.value))}
                className="w-full"
              />
            </div>

            {/* Time Filter */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Max Time: {filters.maxTime} minutes
              </label>
              <input
                type="range"
                min="5"
                max="120"
                step="5"
                value={filters.maxTime}
                onChange={(e) => updateFilter('maxTime', parseInt(e.target.value))}
                className="w-full"
              />
            </div>

            {/* Difficulty Filter */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Difficulty</label>
              <div className="flex flex-wrap gap-2">
                {['Easy', 'Medium', 'Hard'].map((difficulty) => (
                  <button
                    key={difficulty}
                    onClick={() => toggleArrayFilter('difficulty', difficulty)}
                    className={`px-3 py-1 rounded-full text-sm transition-colors ${
                      filters.difficulty.includes(difficulty)
                        ? 'bg-blue-600 text-white'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                  >
                    {difficulty}
                  </button>
                ))}
              </div>
            </div>

            {/* Dietary Filter */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Dietary</label>
              <div className="flex flex-wrap gap-2">
                {['vegetarian', 'vegan', 'gluten-free'].map((dietary) => (
                  <button
                    key={dietary}
                    onClick={() => toggleArrayFilter('dietary', dietary)}
                    className={`px-3 py-1 rounded-full text-sm transition-colors capitalize ${
                      filters.dietary.includes(dietary)
                        ? 'bg-green-600 text-white'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                  >
                    {dietary}
                  </button>
                ))}
              </div>
            </div>

            {/* Meal Type Filter */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Meal Type</label>
              <div className="flex flex-wrap gap-2">
                {['breakfast', 'lunch', 'dinner', 'snack'].map((mealType) => (
                  <button
                    key={mealType}
                    onClick={() => toggleArrayFilter('mealType', mealType)}
                    className={`px-3 py-1 rounded-full text-sm transition-colors capitalize ${
                      filters.mealType.includes(mealType)
                        ? 'bg-purple-600 text-white'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                  >
                    {mealType}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};