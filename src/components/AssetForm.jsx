import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { X, Check } from 'lucide-react';
import { useAssets } from '../context/AssetContext';
import { assetTypes } from '../types';
import AssetTypeFields from './AssetTypeFields';

const AssetForm = ({ index, onCancel }) => {
  const { assets, updateAsset, updateLocalRule } = useAssets();
  const [isExpanded, setIsExpanded] = useState(false);
  
  const asset = assets[index];
  
  const handleChange = (field, value) => {
    updateAsset(index, field, value);
  };
  
  const handleRuleChange = (field, value) => {
    updateLocalRule(index, field, value);
  };
  
  return (
    <div className="space-y-4 animate-fadeIn">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-medium text-slate-800 dark:text-white">
          {asset.name ? `Edit ${asset.name}` : `New ${asset.type} Asset`}
        </h3>
        {onCancel && (
          <button
            onClick={onCancel}
            className="p-1.5 text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 transition-colors rounded-full hover:bg-slate-100 dark:hover:bg-slate-700"
          >
            <X className="h-5 w-5" />
          </button>
        )}
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-3">
          <div>
            <label htmlFor={`name-${index}`} className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">
              Asset Name
            </label>
            <input
              id={`name-${index}`}
              type="text"
              value={asset.name}
              onChange={(e) => handleChange('name', e.target.value)}
              className="w-full px-3 py-2 border border-slate-300 dark:border-slate-600 rounded-md shadow-sm placeholder-slate-400 
                focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500
                dark:bg-slate-700 dark:text-white dark:placeholder-slate-400 transition duration-200"
              placeholder="Enter asset name"
            />
          </div>
          
          <div>
            <label htmlFor={`type-${index}`} className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">
              Asset Type
            </label>
            <select
              id={`type-${index}`}
              value={asset.type}
              onChange={(e) => handleChange('type', e.target.value)}
              className="w-full px-3 py-2 border border-slate-300 dark:border-slate-600 rounded-md shadow-sm 
                focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500
                dark:bg-slate-700 dark:text-white transition duration-200"
            >
              {assetTypes.map((type) => (
                <option key={type} value={type}>{type}</option>
              ))}
            </select>
          </div>
        </div>
        
        <div className="space-y-3">
          <div>
            <label htmlFor={`purchaseDate-${index}`} className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">
              Purchase Date
            </label>
            <input
              id={`purchaseDate-${index}`}
              type="date"
              value={asset.purchaseDate}
              onChange={(e) => handleChange('purchaseDate', e.target.value)}
              className="w-full px-3 py-2 border border-slate-300 dark:border-slate-600 rounded-md shadow-sm 
                focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500
                dark:bg-slate-700 dark:text-white transition duration-200"
            />
          </div>
          
          <div>
            <label htmlFor={`expectedReturn-${index}`} className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">
              Expected Return (% p.a.)
            </label>
            <input
              id={`expectedReturn-${index}`}
              type="number"
              value={asset.expectedReturn}
              onChange={(e) => handleChange('expectedReturn', e.target.value)}
              className="w-full px-3 py-2 border border-slate-300 dark:border-slate-600 rounded-md shadow-sm
                focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500
                dark:bg-slate-700 dark:text-white transition duration-200"
              placeholder="e.g., 10.5"
            />
          </div>
        </div>
      </div>
      
      <AssetTypeFields asset={asset} index={index} onChange={handleChange} />
      
      <div className="pt-3 border-t border-slate-200 dark:border-slate-700">
        <button
          type="button"
          onClick={() => setIsExpanded(!isExpanded)}
          className="text-sm text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300"
        >
          {isExpanded ? 'Hide additional fields' : 'Show additional fields'}
        </button>
      </div>
      
      {isExpanded && (
        <div className="space-y-4 pt-2 animate-fadeIn">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label htmlFor={`maturityDate-${index}`} className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">
                Maturity Date
              </label>
              <input
                id={`maturityDate-${index}`}
                type="date"
                value={asset.maturityDate}
                onChange={(e) => handleChange('maturityDate', e.target.value)}
                className="w-full px-3 py-2 border border-slate-300 dark:border-slate-600 rounded-md shadow-sm 
                  focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500
                  dark:bg-slate-700 dark:text-white transition duration-200"
              />
            </div>
            
            <div>
              <label htmlFor={`linkedGoal-${index}`} className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">
                Linked Goal
              </label>
              <input
                id={`linkedGoal-${index}`}
                type="text"
                value={asset.linkedGoal}
                onChange={(e) => handleChange('linkedGoal', e.target.value)}
                className="w-full px-3 py-2 border border-slate-300 dark:border-slate-600 rounded-md shadow-sm
                  focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500
                  dark:bg-slate-700 dark:text-white transition duration-200"
                placeholder="e.g., Retirement, Home"
              />
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label htmlFor={`source-${index}`} className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">
                Source
              </label>
              <input
                id={`source-${index}`}
                type="text"
                value={asset.source}
                onChange={(e) => handleChange('source', e.target.value)}
                className="w-full px-3 py-2 border border-slate-300 dark:border-slate-600 rounded-md shadow-sm
                  focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500
                  dark:bg-slate-700 dark:text-white transition duration-200"
                placeholder="e.g., Self-earned, Gifted"
              />
            </div>
            
            <div>
              <label htmlFor={`notes-${index}`} className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">
                Notes
              </label>
              <input
                id={`notes-${index}`}
                type="text"
                value={asset.notes}
                onChange={(e) => handleChange('notes', e.target.value)}
                className="w-full px-3 py-2 border border-slate-300 dark:border-slate-600 rounded-md shadow-sm
                  focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500
                  dark:bg-slate-700 dark:text-white transition duration-200"
                placeholder="Any additional information"
              />
            </div>
          </div>
          
          <div className="flex items-center space-x-2">
            <input
              id={`isActive-${index}`}
              type="checkbox"
              checked={asset.isActive}
              onChange={(e) => handleChange('isActive', e.target.checked)}
              className="h-4 w-4 text-blue-600 focus:ring-blue-500 rounded border-slate-300 dark:border-slate-600 dark:bg-slate-700"
            />
            <label htmlFor={`isActive-${index}`} className="text-sm font-medium text-slate-700 dark:text-slate-300">
              Asset is currently active
            </label>
          </div>
          
          <div className="p-4 bg-slate-50 dark:bg-slate-700/30 rounded-md">
            <h4 className="text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">Growth Rule</h4>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
              <div>
                <label htmlFor={`ruleType-${index}`} className="block text-sm text-slate-600 dark:text-slate-400 mb-1">
                  Rule Type
                </label>
                <select
                  id={`ruleType-${index}`}
                  value={asset.localRule.type}
                  onChange={(e) => handleRuleChange('type', e.target.value)}
                  className="w-full px-3 py-2 text-sm border border-slate-300 dark:border-slate-600 rounded-md shadow-sm 
                    focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500
                    dark:bg-slate-700 dark:text-white transition duration-200"
                >
                  <option value="no_rule">No Rule</option>
                  <option value="make_rule">Custom Growth</option>
                </select>
              </div>
              
              {asset.localRule.type === 'make_rule' && (
                <>
                  <div>
                    <label htmlFor={`changeRate-${index}`} className="block text-sm text-slate-600 dark:text-slate-400 mb-1">
                      Change Rate (%)
                    </label>
                    <input
                      id={`changeRate-${index}`}
                      type="number"
                      value={asset.localRule.changeRate}
                      onChange={(e) => handleRuleChange('changeRate', e.target.value)}
                      className="w-full px-3 py-2 text-sm border border-slate-300 dark:border-slate-600 rounded-md shadow-sm
                        focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500
                        dark:bg-slate-700 dark:text-white transition duration-200"
                      placeholder="e.g., 5"
                    />
                  </div>
                  
                  <div>
                    <label htmlFor={`frequency-${index}`} className="block text-sm text-slate-600 dark:text-slate-400 mb-1">
                      Frequency
                    </label>
                    <select
                      id={`frequency-${index}`}
                      value={asset.localRule.frequency}
                      onChange={(e) => handleRuleChange('frequency', e.target.value)}
                      className="w-full px-3 py-2 text-sm border border-slate-300 dark:border-slate-600 rounded-md shadow-sm 
                        focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500
                        dark:bg-slate-700 dark:text-white transition duration-200"
                    >
                      <option value="monthly">Monthly</option>
                      <option value="yearly">Yearly</option>
                    </select>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      )}
      
      <div className="flex justify-end space-x-3 pt-4">
        {onCancel && (
          <button
            type="button"
            onClick={onCancel}
            className="px-4 py-2 border border-slate-300 dark:border-slate-600 rounded-md shadow-sm text-sm font-medium text-slate-700 dark:text-slate-300
              bg-white dark:bg-slate-700 hover:bg-slate-50 dark:hover:bg-slate-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors"
          >
            Cancel
          </button>
        )}
        <button
          type="button"
          onClick={onCancel}
          className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white 
            bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors"
        >
          <Check className="h-4 w-4 mr-2" />
          Save Asset
        </button>
      </div>
    </div>
  );
};

AssetForm.propTypes = {
  index: PropTypes.number.isRequired,
  onCancel: PropTypes.func
};

export default AssetForm;