import React, { useState } from "react";
import {
  Plus,
  Filter,
  Target,
  TrendingUp,
  Calendar,
  AlertCircle,
} from "lucide-react";
import { useGoals } from "../../context/GoalsContext";
import { useGlobalRules } from "../../context/GlobalRulesContext";
import GoalCard from "../../components/goals/GoalCard";
import GoalForm from "../../components/goals/GoalForm";
import GoalSummary from "../../components/goals/GoalSummary";
import GoalProjections from "../../components/goals/GoalProjections";

const GoalsDashboard = () => {
  const {
    goals,
    addGoal,
    updateGoal,
    deleteGoal,
    calculateProgress,
    calculateMonthlyRequirement,
    isGoalAchievable,
  } = useGoals();

  const { rules, getInflationRate, getSalaryGrowthRate, getMarketReturnRate } =
    useGlobalRules();

  const [isAdding, setIsAdding] = useState(false);
  const [activeFilter, setActiveFilter] = useState(null);
  const [showRules, setShowRules] = useState(false);

  const handleAddClick = () => {
    setIsAdding(true);
  };

  const filteredGoals = activeFilter
    ? goals.filter((goal) => goal.category === activeFilter)
    : goals;

  const categories = [
    "retirement",
    "education",
    "house",
    "car",
    "travel",
    "emergency",
    "other",
  ];

  const formatCurrency = (value) => {
    return new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      maximumFractionDigits: 0,
    }).format(value);
  };

  const getTotalGoalAmount = () => {
    return goals.reduce((total, goal) => total + goal.targetAmount, 0);
  };

  const getTotalCurrentAmount = () => {
    return goals.reduce((total, goal) => total + goal.currentAmount, 0);
  };

  const getTotalMonthlyContribution = () => {
    return goals.reduce((total, goal) => total + goal.monthlyContribution, 0);
  };

  return (
    <div className="space-y-6 animate-fadeIn">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h2 className="text-2xl font-semibold text-slate-800 dark:text-white">
            Financial Goals
          </h2>
          <p className="text-slate-500 dark:text-slate-400 mt-1">
            Track and manage your financial objectives
          </p>
        </div>
        <div className="flex gap-2">
          <button
            onClick={() => setShowRules(!showRules)}
            className="px-3 py-2 text-sm bg-white dark:bg-slate-700 text-slate-700 dark:text-slate-200 
              rounded-md border border-slate-200 dark:border-slate-600 
              hover:bg-slate-50 dark:hover:bg-slate-600 transition-colors"
          >
            <TrendingUp className="h-4 w-4" />
          </button>
          {goals.length > 0 && (
            <div className="relative">
              <button
                onClick={() => setActiveFilter(null)}
                className={`px-3 py-2 text-sm rounded-md border transition-colors ${
                  !activeFilter
                    ? "bg-blue-50 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 border-blue-200 dark:border-blue-800"
                    : "bg-white dark:bg-slate-700 text-slate-700 dark:text-slate-200 border-slate-200 dark:border-slate-600 hover:bg-slate-50 dark:hover:bg-slate-600"
                }`}
              >
                <Filter className="h-4 w-4" />
              </button>
            </div>
          )}
          <button
            onClick={handleAddClick}
            className="flex items-center px-3 py-2 text-sm font-medium text-white 
              bg-blue-600 dark:bg-blue-700 rounded-md 
              hover:bg-blue-700 dark:hover:bg-blue-600 transition-colors"
          >
            <Plus className="h-4 w-4 mr-1" />
            Add Goal
          </button>
        </div>
      </div>

      <GoalSummary
        totalGoalAmount={getTotalGoalAmount()}
        totalCurrentAmount={getTotalCurrentAmount()}
        totalMonthlyContribution={getTotalMonthlyContribution()}
      />

      <GoalProjections />

      {showRules && (
        <div className="bg-white dark:bg-slate-800 rounded-lg shadow-sm p-5 border border-slate-200 dark:border-slate-700">
          <h3 className="text-lg font-medium text-slate-800 dark:text-white mb-4">
            Global Rules
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {rules.map((rule) => (
              <div
                key={rule.id}
                className="p-4 rounded-lg bg-slate-50 dark:bg-slate-700/50"
              >
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium text-slate-700 dark:text-slate-300">
                    {rule.name}
                  </span>
                  <span
                    className={`text-xs px-2 py-0.5 rounded-full ${
                      rule.isActive
                        ? "bg-emerald-50 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-300"
                        : "bg-slate-100 text-slate-600 dark:bg-slate-600 dark:text-slate-400"
                    }`}
                  >
                    {rule.isActive ? "Active" : "Inactive"}
                  </span>
                </div>
                <div className="flex items-end justify-between">
                  <span className="text-2xl font-semibold text-slate-800 dark:text-white">
                    {rule.value}%
                  </span>
                  <span className="text-xs text-slate-500 dark:text-slate-400">
                    per {rule.frequency}
                  </span>
                </div>
                {rule.description && (
                  <p className="mt-2 text-xs text-slate-500 dark:text-slate-400">
                    {rule.description}
                  </p>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {goals.length > 0 && (
        <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-thin scrollbar-thumb-slate-300 dark:scrollbar-thumb-slate-600">
          <button
            onClick={() => setActiveFilter(null)}
            className={`px-3 py-1.5 text-sm rounded-full whitespace-nowrap transition-colors ${
              !activeFilter
                ? "bg-blue-100 dark:bg-blue-900/50 text-blue-800 dark:text-blue-200"
                : "bg-white dark:bg-slate-700 text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-600"
            }`}
          >
            All Goals
          </button>
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setActiveFilter(category)}
              className={`px-3 py-1.5 text-sm rounded-full whitespace-nowrap capitalize transition-colors ${
                activeFilter === category
                  ? "bg-blue-100 dark:bg-blue-900/50 text-blue-800 dark:text-blue-200"
                  : "bg-white dark:bg-slate-700 text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-600"
              }`}
            >
              {category}
            </button>
          ))}
        </div>
      )}

      {isAdding && (
        <div className="bg-white dark:bg-slate-800 rounded-lg shadow-md p-6 border border-slate-200 dark:border-slate-700 animate-slideDown">
          <GoalForm
            onCancel={() => setIsAdding(false)}
            onSave={(goal) => {
              addGoal(goal);
              setIsAdding(false);
            }}
          />
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredGoals.map((goal) => (
          <GoalCard
            key={goal.id}
            goal={goal}
            onUpdate={updateGoal}
            onDelete={deleteGoal}
            progress={calculateProgress(goal)}
            monthlyRequirement={calculateMonthlyRequirement(goal)}
            isAchievable={isGoalAchievable(goal)}
          />
        ))}

        {filteredGoals.length === 0 && (
          <div className="col-span-full bg-white dark:bg-slate-800 rounded-lg border border-slate-200 dark:border-slate-700 p-8 text-center">
            <div className="flex justify-center mb-4">
              <Target className="h-12 w-12 text-slate-400 dark:text-slate-500" />
            </div>
            <p className="text-slate-500 dark:text-slate-400">
              No goals found. Add your first financial goal to start tracking.
            </p>
            <button
              onClick={handleAddClick}
              className="mt-4 inline-flex items-center px-4 py-2 text-sm font-medium text-blue-700 
                bg-blue-50 dark:text-blue-200 dark:bg-blue-900/30 rounded-md 
                hover:bg-blue-100 dark:hover:bg-blue-800/40 transition-colors"
            >
              <Plus className="h-4 w-4 mr-1" />
              Add Goal
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default GoalsDashboard;
