import React from 'react';
import PropTypes from 'prop-types';
import { TrendingUp, TrendingDown, DollarSign } from 'lucide-react';

const AssetSummary = ({ totalValue, totalInvested, gainLoss }) => {
  const formatCurrency = (value) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0,
    }).format(value);
  };
  
  const percentChange = totalInvested > 0 
    ? ((gainLoss / totalInvested) * 100).toFixed(2)
    : '0.00';
  
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      <div className="bg-white dark:bg-slate-800 rounded-lg shadow-sm p-5 border border-slate-200 dark:border-slate-700 transform transition-all duration-200 hover:translate-y-[-2px] hover:shadow-md">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-slate-500 dark:text-slate-400">Total Portfolio Value</p>
            <h3 className="mt-1 text-xl font-semibold text-slate-800 dark:text-white">{formatCurrency(totalValue)}</h3>
          </div>
          <div className="p-3 bg-blue-50 dark:bg-blue-900/30 rounded-full">
            <DollarSign className="h-6 w-6 text-blue-600 dark:text-blue-400" />
          </div>
        </div>
      </div>
      
      <div className="bg-white dark:bg-slate-800 rounded-lg shadow-sm p-5 border border-slate-200 dark:border-slate-700 transform transition-all duration-200 hover:translate-y-[-2px] hover:shadow-md">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-slate-500 dark:text-slate-400">Total Invested</p>
            <h3 className="mt-1 text-xl font-semibold text-slate-800 dark:text-white">{formatCurrency(totalInvested)}</h3>
          </div>
          <div className="p-3 bg-indigo-50 dark:bg-indigo-900/30 rounded-full">
            <DollarSign className="h-6 w-6 text-indigo-600 dark:text-indigo-400" />
          </div>
        </div>
      </div>
      
      <div className="bg-white dark:bg-slate-800 rounded-lg shadow-sm p-5 border border-slate-200 dark:border-slate-700 transform transition-all duration-200 hover:translate-y-[-2px] hover:shadow-md">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-slate-500 dark:text-slate-400">Total Gain/Loss</p>
            <div className="flex items-center mt-1">
              <h3 className={`text-xl font-semibold ${gainLoss >= 0 ? 'text-emerald-600 dark:text-emerald-400' : 'text-red-600 dark:text-red-400'}`}>
                {formatCurrency(gainLoss)}
              </h3>
              <span className={`ml-2 px-2 py-0.5 text-xs rounded-full inline-flex items-center ${
                gainLoss >= 0 
                  ? 'bg-emerald-50 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-300' 
                  : 'bg-red-50 text-red-700 dark:bg-red-900/30 dark:text-red-300'
              }`}>
                {gainLoss >= 0 ? <TrendingUp className="h-3 w-3 mr-1" /> : <TrendingDown className="h-3 w-3 mr-1" />}
                {percentChange}%
              </span>
            </div>
          </div>
          <div className={`p-3 rounded-full ${
            gainLoss >= 0 
              ? 'bg-emerald-50 dark:bg-emerald-900/30' 
              : 'bg-red-50 dark:bg-red-900/30'
          }`}>
            {gainLoss >= 0 
              ? <TrendingUp className="h-6 w-6 text-emerald-600 dark:text-emerald-400" /> 
              : <TrendingDown className="h-6 w-6 text-red-600 dark:text-red-400" />
            }
          </div>
        </div>
      </div>
    </div>
  );
};

AssetSummary.propTypes = {
  totalValue: PropTypes.number.isRequired,
  totalInvested: PropTypes.number.isRequired,
  gainLoss: PropTypes.number.isRequired
};

export default AssetSummary;