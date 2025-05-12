import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { X, Check } from 'lucide-react';

const categories = [
  'retirement',
  'education',
  'house',
  'car',
  'travel',
  'emergency',
  'other'
];

const priorities = ['high', 'medium', 'low'];

const defaultGoal = {
  name: '',
  targetAmount: '',
  currentAmount: '',
  targetDate: '',
  priority: 'medium',
  category: 'other',
  description: '',
  linkedAssets: [],
  monthlyContribution: '',
  expectedReturn: '',
  inflationRate: '',
  isActive: true
};

const GoalForm = ({ initialData, onSave, onCancel }) => {
  const [goal, setGoal] = useState(initialData || defaultGoal);
  const [isExpanded, setIsExpanded] = useState(false);

  const handleChange = (field, value) => {
    setGoal(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(goal);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-medium text-slate-800 dark:text-white">
          {initialData ? 'Edit Goal' : 'Add New Goal'}
        </h3>
        {onCancel && (
          <button
            type="button"
            onClick={onCancel}
            className="p-1.5 text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 
              transition-colors rounded-full hover:bg-slate-100 dark:hover:bg-slate-700"
          >
            <X className="h-5 w-5" />
          </button>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">
            Goal Name
          </label>
          <input
            type="text"
            value={goal.name}
            onChange={(e) => handleChange('name', e.target.value)}
            className="w-full px-3 py-2 border border-slate-300 dark:border-slate-600 rounded-md shadow-sm 
              bg-white dark:bg-slate-700 text-slate-900 dark:text-white placeholder-slate-400
              focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent
              transition duration-200"
            placeholder="e.g., Retirement Fund"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">
            Category
          </label>
          <select
            value={goal.category}
            onChange={(e) => handleChange('category', e.target.value)}
            className="w-full px-3 py-2 border border-slate-300 dark:border-slate-600 rounded-md shadow-sm 
              bg-white dark:bg-slate-700 text-slate-900 dark:text-white
              focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent
              transition duration-200"
          >
            {categories.map(category => (
              <option key={category} value={category} className="capitalize">{category}</option>
            ))}
          </select>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div>
          <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">
            Target Amount
          </label>
          <input
            type="number"
            value={goal.targetAmount}
            onChange={(e) => handleChange('targetAmount', e.target.value)}
            className="w-full px-3 py-2 border border-slate-300 dark:border-slate-600 rounded-md shadow-sm
              bg-white dark:bg-slate-700 text-slate-900 dark:text-white placeholder-slate-400
              focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent
              transition duration-200"
            placeholder="e.g., 1000000"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">
            Current Amount
          </label>
          <input
            type="number"
            value={goal.currentAmount}
            onChange={(e) => handleChange('currentAmount', e.target.value)}
            className="w-full px-3 py-2 border border-slate-300 dark:border-slate-600 rounded-md shadow-sm
              bg-white dark:bg-slate-700 text-slate-900 dark:text-white placeholder-slate-400
              focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent
              transition duration-200"
            placeholder="e.g., 100000"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">
            Monthly Contribution
          </label>
          <input
            type="number"
            value={goal.monthlyContribution}
            onChange={(e) => handleChange('monthlyContribution', e.target.value)}
            className="w-full px-3 py-2 border border-slate-300 dark:border-slate-600 rounded-md shadow-sm
              bg-white dark:bg-slate-700 text-slate-900 dark:text-white placeholder-slate-400
              focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent
              transition duration-200"
            placeholder="e.g., 10000"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div>
          <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">
            Target Date
          </label>
          <input
            type="date"
            value={goal.targetDate}
            onChange={(e) => handleChange('targetDate', e.target.value)}
            className="w-full px-3 py-2 border border-slate-300 dark:border-slate-600 rounded-md shadow-sm 
              bg-white dark:bg-slate-700 text-slate-900 dark:text-white
              focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent
              transition duration-200"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">
            Priority
          </label>
          <select
            value={goal.priority}
            onChange={(e) => handleChange('priority', e.target.value)}
            className="w-full px-3 py-2 border border-slate-300 dark:border-slate-600 rounded-md shadow-sm 
              bg-white dark:bg-slate-700 text-slate-900 dark:text-white
              focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent
              transition duration-200"
          >
            {priorities.map(priority => (
              <option key={priority} value={priority} className="capitalize">{priority}</option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">
            Expected Return (% p.a.)
          </label>
          <input
            type="number"
            value={goal.expectedReturn}
            onChange={(e) => handleChange('expectedReturn', e.target.value)}
            className="w-full px-3 py-2 border border-slate-300 dark:border-slate-600 rounded-md shadow-sm
              bg-white dark:bg-slate-700 text-slate-900 dark:text-white placeholder-slate-400
              focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent
              transition duration-200"
            placeholder="e.g., 12"
          />
        </div>
      </div>

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
        <div className="space-y-4 animate-fadeIn">
          <div>
            <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">
              Description
            </label>
            <textarea
              value={goal.description}
              onChange={(e) => handleChange('description', e.target.value)}
              rows={3}
              className="w-full px-3 py-2 border border-slate-300 dark:border-slate-600 rounded-md shadow-sm 
                bg-white dark:bg-slate-700 text-slate-900 dark:text-white placeholder-slate-400
                focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent
                transition duration-200"
              placeholder="Describe your goal..."
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">
              Linked Assets
            </label>
            <input
              type="text"
              value={goal.linkedAssets.join(', ')}
              onChange={(e) => handleChange('linkedAssets', e.target.value.split(',').map(s => s.trim()))}
              className="w-full px-3 py-2 border border-slate-300 dark:border-slate-600 rounded-md shadow-sm
                bg-white dark:bg-slate-700 text-slate-900 dark:text-white placeholder-slate-400
                focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent
                transition duration-200"
              placeholder="Enter asset names, separated by commas"
            />
          </div>

          <div className="flex items-center space-x-2">
            <input
              type="checkbox"
              checked={goal.isActive}
              onChange={(e) => handleChange('isActive', e.target.checked)}
              className="h-4 w-4 text-blue-600 focus:ring-blue-500 rounded 
                border-slate-300 dark:border-slate-600 dark:bg-slate-700"
            />
            <label className="text-sm font-medium text-slate-700 dark:text-slate-300">
              Goal is currently active
            </label>
          </div>
        </div>
      )}

      <div className="flex justify-end space-x-3 pt-4">
        {onCancel && (
          <button
            type="button"
            onClick={onCancel}
            className="px-4 py-2 border border-slate-300 dark:border-slate-600 rounded-md shadow-sm text-sm font-medium 
              text-slate-700 dark:text-slate-300 bg-white dark:bg-slate-700 
              hover:bg-slate-50 dark:hover:bg-slate-600 
              focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 
              transition-colors"
          >
            Cancel
          </button>
        )}
        <button
          type="submit"
          className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium 
            text-white bg-blue-600 hover:bg-blue-700 
            focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 
            transition-colors"
        >
          <Check className="h-4 w-4 mr-2" />
          Save Goal
        </button>
      </div>
    </form>
  );
};

GoalForm.propTypes = {
  initialData: PropTypes.object,
  onSave: PropTypes.func.isRequired,
  onCancel: PropTypes.func
};

export default GoalForm;