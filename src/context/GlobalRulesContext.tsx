import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { GlobalRule } from '../types';

interface GlobalRulesContextType {
  rules: GlobalRule[];
  addRule: (rule: Omit<GlobalRule, 'id'>) => void;
  updateRule: (id: string, updates: Partial<GlobalRule>) => void;
  deleteRule: (id: string) => void;
  updateSystemRule: (id: string, value: number) => void;
  getInflationRate: () => number;
  getSalaryGrowthRate: () => number;
  getMarketReturnRate: () => number;
  salary: number;
  updateSalary: (value: number) => void;
}

const defaultRules: GlobalRule[] = [
  {
    id: 'inflation',
    name: 'Inflation Rate',
    type: 'inflation',
    value: 6,
    frequency: 'yearly',
    description: 'Average annual inflation rate',
    isActive: true
  },
  {
    id: 'salary',
    name: 'Salary Growth',
    type: 'salary',
    value: 10,
    frequency: 'yearly',
    description: 'Expected annual salary increment',
    isActive: true
  },
  {
    id: 'market',
    name: 'Market Returns',
    type: 'market',
    value: 12,
    frequency: 'yearly',
    description: 'Expected market returns',
    isActive: true
  }
];

const GlobalRulesContext = createContext<GlobalRulesContextType | undefined>(undefined);

export const GlobalRulesProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [rules, setRules] = useState<GlobalRule[]>(() => {
    const saved = localStorage.getItem('wealthTrackerGlobalRules');
    return saved ? JSON.parse(saved) : defaultRules;
  });

  const [salary, setSalary] = useState(() => {
    const saved = localStorage.getItem('wealthTrackerSalary');
    return saved ? parseFloat(saved) : 100000;
  });

  useEffect(() => {
    localStorage.setItem('wealthTrackerGlobalRules', JSON.stringify(rules));
  }, [rules]);

  useEffect(() => {
    localStorage.setItem('wealthTrackerSalary', salary.toString());
  }, [salary]);

  const addRule = (rule: Omit<GlobalRule, 'id'>) => {
    const newRule: GlobalRule = {
      ...rule,
      id: Date.now().toString(),
    };
    setRules(prev => [...prev, newRule]);
  };

  const updateRule = (id: string, updates: Partial<GlobalRule>) => {
    setRules(prev => prev.map(rule => 
      rule.id === id ? { ...rule, ...updates } : rule
    ));
  };

  const updateSystemRule = (id: string, value: number) => {
    setRules(prev => prev.map(rule =>
      rule.id === id ? { ...rule, value } : rule
    ));
  };

  const deleteRule = (id: string) => {
    setRules(prev => prev.filter(rule => rule.id !== id));
  };

  const updateSalary = (value: number) => {
    setSalary(value);
  };

  const getInflationRate = () => {
    const rule = rules.find(r => r.id === 'inflation' && r.isActive);
    return rule?.value ?? 6;
  };

  const getSalaryGrowthRate = () => {
    const rule = rules.find(r => r.id === 'salary' && r.isActive);
    return rule?.value ?? 10;
  };

  const getMarketReturnRate = () => {
    const rule = rules.find(r => r.id === 'market' && r.isActive);
    return rule?.value ?? 12;
  };

  return (
    <GlobalRulesContext.Provider
      value={{
        rules,
        addRule,
        updateRule,
        deleteRule,
        updateSystemRule,
        getInflationRate,
        getSalaryGrowthRate,
        getMarketReturnRate,
        salary,
        updateSalary
      }}
    >
      {children}
    </GlobalRulesContext.Provider>
  );
};

export const useGlobalRules = () => {
  const context = useContext(GlobalRulesContext);
  if (context === undefined) {
    throw new Error('useGlobalRules must be used within a GlobalRulesProvider');
  }
  return context;
};