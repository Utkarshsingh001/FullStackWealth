import { ReactNode } from 'react';

export type AssetType = 
  | 'FD'
  | 'Mutual Fund'
  | 'Stocks'
  | 'Gold'
  | 'Property'
  | 'Crypto'
  | 'Other';

export type LiabilityType =
  | 'Credit Card'
  | 'Personal Loan'
  | 'Home Loan'
  | 'Auto Loan'
  | 'Student Loan'
  | 'Other';

export type LocalRuleType = 'no_rule' | 'make_rule';
export type FrequencyType = 'monthly' | 'quarterly' | 'half-yearly' | 'yearly';
export type InvestmentType = 'SIP' | 'Lump Sum';
export type GoldType = 'Physical' | 'Digital' | '';
export type PropertyType = 'Flat' | 'Land' | 'Commercial' | 'Villa' | 'Other' | '';

export interface LocalRule {
  type: LocalRuleType;
  changeRate: string;
  frequency: 'monthly' | 'yearly';
}

export interface GlobalRule {
  id: string;
  name: string;
  type: 'inflation' | 'salary' | 'market' | 'custom';
  value: number;
  frequency: FrequencyType;
  description?: string;
  isActive: boolean;
}

export interface Goal {
  id: string;
  name: string;
  targetAmount: number;
  currentAmount: number;
  targetDate: string;
  priority: 'high' | 'medium' | 'low';
  category: 'retirement' | 'education' | 'house' | 'car' | 'travel' | 'emergency' | 'other';
  description?: string;
  linkedAssets: string[];
  monthlyContribution: number;
  expectedReturn: number;
  inflationRate: number;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

// Rest of the existing types...