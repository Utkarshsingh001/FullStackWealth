import React, { useState } from 'react';
import { Plus, Filter, BarChart } from 'lucide-react';
import { useAssets } from '../context/AssetContext';
import AssetCard from './AssetCard';
import AssetForm from './AssetForm';
import AssetSummary from './AssetSummary';

const AssetDashboard: React.FC = () => {
  const { assets, addAsset, getTotalPortfolioValue, getTotalInvested, getGainLoss } = useAssets();
  const [isAdding, setIsAdding] = useState(false);
  const [activeFilter, setActiveFilter] = useState<string | null>(null);
  const [viewMode, setViewMode] = useState<'cards' | 'list'>('cards');

  const filteredAssets = activeFilter 
    ? assets.filter(asset => asset.type === activeFilter)
    : assets;

  const handleAddClick = () => {
    addAsset();
    setIsAdding(true);
  };

  return (
    <div className="space-y-6 animate-fadeIn">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h2 className="text-2xl font-semibold text-slate-800 dark:text-white">Your Assets</h2>
          <p className="text-slate-500 dark:text-slate-400 mt-1">
            Manage and track all your investments in one place
          </p>
        </div>
        <div className="flex gap-2">
          <button
            onClick={() => setViewMode(viewMode === 'cards' ? 'list' : 'cards')}
            className="px-3 py-2 text-sm bg-white dark:bg-slate-700 text-slate-700 dark:text-slate-200 rounded-md border border-slate-200 dark:border-slate-600 hover:bg-slate-50 dark:hover:bg-slate-600 transition-colors"
          >
            <BarChart className="h-4 w-4" />
          </button>
          <div className="relative">
            <button
              onClick={() => setActiveFilter(null)}
              className={`px-3 py-2 text-sm rounded-md border transition-colors ${
                !activeFilter 
                  ? 'bg-blue-50 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 border-blue-200 dark:border-blue-800' 
                  : 'bg-white dark:bg-slate-700 text-slate-700 dark:text-slate-200 border-slate-200 dark:border-slate-600 hover:bg-slate-50 dark:hover:bg-slate-600'
              }`}
            >
              <Filter className="h-4 w-4" />
            </button>
          </div>
          <button
            onClick={handleAddClick}
            className="flex items-center px-3 py-2 text-sm font-medium text-white bg-blue-600 dark:bg-blue-700 rounded-md hover:bg-blue-700 dark:hover:bg-blue-600 transition-colors"
          >
            <Plus className="h-4 w-4 mr-1" />
            Add Asset
          </button>
        </div>
      </div>

      <AssetSummary 
        totalValue={getTotalPortfolioValue()}
        totalInvested={getTotalInvested()}
        gainLoss={getGainLoss()}
      />

      <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-thin scrollbar-thumb-slate-300 dark:scrollbar-thumb-slate-600">
        {['All', ...new Set(assets.map(a => a.type))].map(type => (
          <button
            key={type}
            onClick={() => setActiveFilter(type === 'All' ? null : type)}
            className={`px-3 py-1.5 text-sm rounded-full whitespace-nowrap transition-colors ${
              (type === 'All' && !activeFilter) || activeFilter === type
                ? 'bg-blue-100 dark:bg-blue-900/50 text-blue-800 dark:text-blue-200' 
                : 'bg-white dark:bg-slate-700 text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-600'
            }`}
          >
            {type}
          </button>
        ))}
      </div>

      {isAdding && (
        <div className="bg-white dark:bg-slate-800 rounded-lg shadow-md p-6 border border-slate-200 dark:border-slate-700 animate-slideDown">
          <AssetForm 
            index={assets.length - 1} 
            onCancel={() => {
              setIsAdding(false);
            }} 
          />
        </div>
      )}

      <div className={`grid ${viewMode === 'cards' ? 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3' : 'grid-cols-1'} gap-6`}>
        {filteredAssets.map((asset, index) => (
          <AssetCard 
            key={index} 
            asset={asset} 
            index={index} 
            compact={viewMode === 'list'}
          />
        ))}
        
        {filteredAssets.length === 0 && (
          <div className="col-span-full bg-white dark:bg-slate-800 rounded-lg border border-slate-200 dark:border-slate-700 p-8 text-center">
            <p className="text-slate-500 dark:text-slate-400">No assets found. Add your first asset to get started.</p>
            <button
              onClick={handleAddClick}
              className="mt-4 inline-flex items-center px-4 py-2 text-sm font-medium text-blue-700 bg-blue-50 dark:text-blue-200 dark:bg-blue-900/30 rounded-md hover:bg-blue-100 dark:hover:bg-blue-800/40 transition-colors"
            >
              <Plus className="h-4 w-4 mr-1" />
              Add Asset
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default AssetDashboard;