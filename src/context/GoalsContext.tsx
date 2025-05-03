import React, { createContext, useContext, useState, useEffect } from 'react';
import { Goal } from '../types';
import { useGlobalRules } from './GlobalRulesContext';

interface GoalsContextType {
  goals: Goal[];
  addGoal: (goal: Omit<Goal, 'id' | 'createdAt' | 'updatedAt'>) => void;
  updateGoal: (id: string, updates: Partial<Goal>) => void;
  deleteGoal: (id: string) => void;
  calculateProgress: (goal: Goal) => number;
  calculateMonthlyRequirement: (goal: Goal) => number;
  isGoalAchievable: (goal: Goal) => boolean;
}

const GoalsContext = createContext<GoalsContextType | undefined>(undefined);

export const GoalsProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [goals, setGoals] = useState<Goal[]>(() => {
    const saved = localStorage.getItem('wealthTrackerGoals');
    return saved ? JSON.parse(saved) : [];
  });

  const { getInflationRate, getMarketReturnRate } = useGlobalRules();

  useEffect(() => {
    localStorage.setItem('wealthTrackerGoals', JSON.stringify(goals));
  }, [goals]);

  const addGoal = (goal: Omit<Goal, 'id' | 'createdAt' | 'updatedAt'>) => {
    const newGoal: Goal = {
      ...goal,
      id: Date.now().toString(),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };
    setGoals(prev => [...prev, newGoal]);
  };

  const updateGoal = (id: string, updates: Partial<Goal>) => {
    setGoals(prev => prev.map(goal =>
      goal.id === id
        ? { ...goal, ...updates, updatedAt: new Date().toISOString() }
        : goal
    ));
  };

  const deleteGoal = (id: string) => {
    setGoals(prev => prev.filter(goal => goal.id !== id));
  };

  const calculateProgress = (goal: Goal) => {
    return (goal.currentAmount / goal.targetAmount) * 100;
  };

  const calculateMonthlyRequirement = (goal: Goal) => {
    const monthsLeft = Math.max(
      0,
      (new Date(goal.targetDate).getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24 * 30.44)
    );
    
    if (monthsLeft === 0) return 0;

    const inflationRate = getInflationRate() / 100;
    const returnRate = goal.expectedReturn / 100;
    const monthlyRate = Math.pow(1 + returnRate, 1/12) - 1;
    
    const inflatedTarget = goal.targetAmount * Math.pow(1 + inflationRate, monthsLeft / 12);
    const currentValue = goal.currentAmount * Math.pow(1 + monthlyRate, monthsLeft);
    
    const requiredAmount = inflatedTarget - currentValue;
    const monthlyContribution = requiredAmount / ((Math.pow(1 + monthlyRate, monthsLeft) - 1) / monthlyRate);
    
    return Math.max(0, monthlyContribution);
  };

  const isGoalAchievable = (goal: Goal) => {
    const monthlyRequirement = calculateMonthlyRequirement(goal);
    return monthlyRequirement <= goal.monthlyContribution;
  };

  return (
    <GoalsContext.Provider
      value={{
        goals,
        addGoal,
        updateGoal,
        deleteGoal,
        calculateProgress,
        calculateMonthlyRequirement,
        isGoalAchievable
      }}
    >
      {children}
    </GoalsContext.Provider>
  );
};

export const useGoals = () => {
  const context = useContext(GoalsContext);
  if (context === undefined) {
    throw new Error('useGoals must be used within a GoalsProvider');
  }
  return context;
};