import React from 'react';
import PropTypes from 'prop-types';
import { Target, Wallet, ArrowUpRight } from 'lucide-react';

const GoalSummary = ({ totalGoalAmount, totalCurrentAmount, totalMonthlyContribution }) => {
  const formatCurrency = (value) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0,
    }).format(value);
  };

  const progress = totalGoalAmount > 0 
    ? (totalCurrentAmount / totalGoalAmount) * 100 
    : 0;

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      <div className="bg-white dark:bg-slate-800 rounded-lg shadow-sm p-5 border border-slate-200 dark:border-slate-700 
        transform transition-all duration-200 hover:translate-y-[-2px] hover:shadow-md">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-slate-500 dark:text-slate-400">Total Goal Amount</p>
            <h3 className="mt-1 text-xl font-semibold text-slate-800 dark:text-white">
              {formatCurrency(totalGoalAmount)}
            </h3>
          </div>
          <div className="p-3 bg-blue-50 dark:bg-blue-900/30 rounded-full">
            <Target className="h-6 w-6 text-blue-600 dark:text-blue-400" />
          </div>
        </div>
      </div>

      <div className="bg-white dark:bg-slate-800 rounded-lg shadow-sm p-5 border border-slate-200 dark:border-slate-700 
        transform transition-all duration-200 hover:translate-y-[-2px] hover:shadow-md">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-slate-500 dark:text-slate-400">Current Progress</p>
            <h3 className="mt-1 text-xl font-semibold text-slate-800 dark:text-white">
              {formatCurrency(totalCurrentAmount)}
            </h3>
          </div>
          <div className="p-3 bg-emerald-50 dark:bg-emerald-900/30 rounded-full">
            <ArrowUpRight className="h-6 w-6 text-emerald-600 dark:text-emerald-400" />
          </div>
        </div>
        <div className="mt-4">
          <div className="flex justify-between text-sm mb-1">
            <span className="text-slate-600 dark:text-slate-400">{progress.toFixed(1)}% Complete</span>
            <span className="text-slate-600 dark:text-slate-400">
              {formatCurrency(totalGoalAmount - totalCurrentAmount)} Remaining
            </span>
          </div>
          <div className="h-2 bg-slate-100 dark:bg-slate-700 rounded-full">
            <div 
              className="h-full bg-emerald-500 rounded-full transition-all duration-300"
              style={{ width: `${Math.min(progress, 100)}%` }}
            />
          </div>
        </div>
      </div>

      <div className="bg-white dark:bg-slate-800 rounded-lg shadow-sm p-5 border border-slate-200 dark:border-slate-700 
        transform transition-all duration-200 hover:translate-y-[-2px] hover:shadow-md">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-slate-500 dark:text-slate-400">Monthly Contribution</p>
            <h3 className="mt-1 text-xl font-semibold text-slate-800 dark:text-white">
              {formatCurrency(totalMonthlyContribution)}
            </h3>
          </div>
          <div className="p-3 bg-indigo-50 dark:bg-indigo-900/30 rounded-full">
            <Wallet className="h-6 w-6 text-indigo-600 dark:text-indigo-400" />
          </div>
        </div>
      </div>
    </div>
  );
};

GoalSummary.propTypes = {
  totalGoalAmount: PropTypes.number.isRequired,
  totalCurrentAmount: PropTypes.number.isRequired,
  totalMonthlyContribution: PropTypes.number.isRequired
};

export default GoalSummary;