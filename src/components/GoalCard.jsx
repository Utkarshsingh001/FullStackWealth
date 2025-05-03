import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { 
  Target, GraduationCap, Home, Car, Plane, Shield, FileText,
  Calendar, Trash2, Edit, ChevronDown, ChevronUp, AlertCircle,
  TrendingUp, Wallet
} from 'lucide-react';
import GoalForm from './GoalForm';

const GoalCard = ({ goal, onUpdate, onDelete, progress, monthlyRequirement, isAchievable }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [isEditing, setIsEditing] = useState(false);

  const formatCurrency = (value) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0,
    }).format(value);
  };

  const getIcon = (category) => {
    switch (category) {
      case 'retirement': return <Target className="h-5 w-5" />;
      case 'education': return <GraduationCap className="h-5 w-5" />;
      case 'house': return <Home className="h-5 w-5" />;
      case 'car': return <Car className="h-5 w-5" />;
      case 'travel': return <Plane className="h-5 w-5" />;
      case 'emergency': return <Shield className="h-5 w-5" />;
      default: return <FileText className="h-5 w-5" />;
    }
  };

  const getColor = (category) => {
    const colors = {
      'retirement': { bg: 'bg-blue-50', text: 'text-blue-700', darkBg: 'dark:bg-blue-900/30', darkText: 'dark:text-blue-300' },
      'education': { bg: 'bg-purple-50', text: 'text-purple-700', darkBg: 'dark:bg-purple-900/30', darkText: 'dark:text-purple-300' },
      'house': { bg: 'bg-emerald-50', text: 'text-emerald-700', darkBg: 'dark:bg-emerald-900/30', darkText: 'dark:text-emerald-300' },
      'car': { bg: 'bg-orange-50', text: 'text-orange-700', darkBg: 'dark:bg-orange-900/30', darkText: 'dark:text-orange-300' },
      'travel': { bg: 'bg-indigo-50', text: 'text-indigo-700', darkBg: 'dark:bg-indigo-900/30', darkText: 'dark:text-indigo-300' },
      'emergency': { bg: 'bg-red-50', text: 'text-red-700', darkBg: 'dark:bg-red-900/30', darkText: 'dark:text-red-300' },
      'other': { bg: 'bg-gray-50', text: 'text-gray-700', darkBg: 'dark:bg-gray-900/30', darkText: 'dark:text-gray-300' }
    };
    return colors[category] || colors['other'];
  };

  const getTimeLeft = () => {
    const today = new Date();
    const targetDate = new Date(goal.targetDate);
    const diffTime = targetDate.getTime() - today.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    
    if (diffDays < 0) return 'Overdue';
    if (diffDays === 0) return 'Due today';
    if (diffDays < 30) return `${diffDays} days left`;
    if (diffDays < 365) return `${Math.ceil(diffDays / 30)} months left`;
    return `${Math.ceil(diffDays / 365)} years left`;
  };

  const color = getColor(goal.category);

  if (isEditing) {
    return (
      <div className="bg-white dark:bg-slate-800 rounded-lg shadow-md p-6 border border-slate-200 dark:border-slate-700 animate-fadeIn">
        <GoalForm 
          initialData={goal}
          onSave={(updatedGoal) => {
            onUpdate(goal.id, updatedGoal);
            setIsEditing(false);
          }}
          onCancel={() => setIsEditing(false)}
        />
      </div>
    );
  }

  return (
    <div className={`bg-white dark:bg-slate-800 rounded-lg shadow-sm border border-gray-200 dark:border-slate-700 
      overflow-hidden transform transition-all duration-300 hover:translate-y-[-2px] hover:shadow-md
      ${!goal.isActive ? 'opacity-70' : ''}`}>
      <div className="p-5">
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <div className={`p-2 rounded-lg ${color.bg} ${color.darkBg} ${color.text} ${color.darkText} mr-3`}>
              {getIcon(goal.category)}
            </div>
            <div>
              <h3 className="font-medium text-slate-800 dark:text-white">
                {goal.name}
              </h3>
              <span className={`text-xs ${color.bg} ${color.darkBg} ${color.text} ${color.darkText} px-2 py-0.5 rounded-full capitalize`}>
                {goal.category}
              </span>
            </div>
          </div>
          <div className="flex">
            <button
              onClick={() => setIsEditing(true)}
              className="p-1.5 text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 transition-colors"
            >
              <Edit className="h-4 w-4" />
            </button>
            <button
              onClick={() => onDelete(goal.id)}
              className="p-1.5 text-slate-400 hover:text-red-600 dark:hover:text-red-400 transition-colors"
            >
              <Trash2 className="h-4 w-4" />
            </button>
          </div>
        </div>

        <div className="mt-4">
          <div className="flex justify-between text-sm mb-1">
            <span className="text-slate-600 dark:text-slate-400">{progress.toFixed(1)}% Complete</span>
            <span className="text-slate-600 dark:text-slate-400">
              {formatCurrency(goal.currentAmount)} of {formatCurrency(goal.targetAmount)}
            </span>
          </div>
          <div className="h-2 bg-slate-100 dark:bg-slate-700 rounded-full">
            <div 
              className={`h-full rounded-full transition-all duration-300 ${
                isAchievable ? 'bg-emerald-500' : 'bg-amber-500'
              }`}
              style={{ width: `${Math.min(progress, 100)}%` }}
            />
          </div>
        </div>

        <div className="mt-4 flex items-center justify-between text-sm">
          <div className="flex items-center text-slate-500 dark:text-slate-400">
            <Calendar className="h-4 w-4 mr-1" />
            <span>{getTimeLeft()}</span>
          </div>
          <div className={`flex items-center ${
            isAchievable 
              ? 'text-emerald-600 dark:text-emerald-400' 
              : 'text-amber-600 dark:text-amber-400'
          }`}>
            <AlertCircle className="h-4 w-4 mr-1" />
            <span>{isAchievable ? 'On Track' : 'At Risk'}</span>
          </div>
        </div>
      </div>

      <div 
        className="px-5 py-3 border-t border-gray-200 dark:border-slate-700 bg-gray-50 dark:bg-slate-800 
          flex justify-between items-center cursor-pointer hover:bg-gray-100 dark:hover:bg-slate-700 transition-colors"
        onClick={() => setIsExpanded(!isExpanded)}
      >
        <span className="text-sm text-slate-600 dark:text-slate-300 font-medium">
          {isExpanded ? 'Hide details' : 'Show details'}
        </span>
        {isExpanded ? 
          <ChevronUp className="h-4 w-4 text-slate-500 dark:text-slate-400" /> : 
          <ChevronDown className="h-4 w-4 text-slate-500 dark:text-slate-400" />
        }
      </div>

      {isExpanded && (
        <div className="p-5 border-t border-gray-200 dark:border-slate-700 animate-fadeIn">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <span className="text-sm font-medium text-slate-700 dark:text-slate-300">Target Date</span>
              <p className="text-sm text-slate-600 dark:text-slate-400">
                {new Date(goal.targetDate).toLocaleDateString()}
              </p>
            </div>
            <div>
              <span className="text-sm font-medium text-slate-700 dark:text-slate-300">Priority</span>
              <p className={`text-sm ${
                goal.priority === 'high' 
                  ? 'text-red-600 dark:text-red-400'
                  : goal.priority === 'medium'
                    ? 'text-amber-600 dark:text-amber-400'
                    : 'text-blue-600 dark:text-blue-400'
              }`}>
                {goal.priority.charAt(0).toUpperCase() + goal.priority.slice(1)}
              </p>
            </div>
          </div>

          <div className="mt-4 space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <Wallet className="h-4 w-4 text-slate-400 mr-2" />
                <span className="text-sm text-slate-600 dark:text-slate-400">Monthly Contribution</span>
              </div>
              <span className="text-sm font-medium text-slate-800 dark:text-white">
                {formatCurrency(goal.monthlyContribution)}
              </span>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <TrendingUp className="h-4 w-4 text-slate-400 mr-2" />
                <span className="text-sm text-slate-600 dark:text-slate-400">Expected Return</span>
              </div>
              <span className="text-sm font-medium text-slate-800 dark:text-white">
                {goal.expectedReturn}% p.a.
              </span>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <AlertCircle className="h-4 w-4 text-slate-400 mr-2" />
                <span className="text-sm text-slate-600 dark:text-slate-400">Required Monthly</span>
              </div>
              <span className={`text-sm font-medium ${
                isAchievable
                  ? 'text-emerald-600 dark:text-emerald-400'
                  : 'text-red-600 dark:text-red-400'
              }`}>
                {formatCurrency(monthlyRequirement)}
              </span>
            </div>
          </div>

          {goal.description && (
            <div className="mt-4 p-3 bg-slate-50 dark:bg-slate-700/50 rounded-md">
              <h4 className="text-sm font-medium text-slate-700 dark:text-slate-300">Description</h4>
              <p className="mt-1 text-sm text-slate-600 dark:text-slate-400">{goal.description}</p>
            </div>
          )}

          {goal.linkedAssets.length > 0 && (
            <div className="mt-4">
              <h4 className="text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">Linked Assets</h4>
              <div className="flex flex-wrap gap-2">
                {goal.linkedAssets.map((asset, index) => (
                  <span 
                    key={index}
                    className="px-2 py-1 text-xs rounded-full bg-slate-100 dark:bg-slate-700 
                      text-slate-600 dark:text-slate-400"
                  >
                    {asset}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

GoalCard.propTypes = {
  goal: PropTypes.object.isRequired,
  onUpdate: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired,
  progress: PropTypes.number.isRequired,
  monthlyRequirement: PropTypes.number.isRequired,
  isAchievable: PropTypes.bool.isRequired
};

export default GoalCard;