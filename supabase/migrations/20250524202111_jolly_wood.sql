/*
  # Initial Schema Setup for Wealth Tracker

  1. New Tables
    - `users`
      - Core user information and preferences
    - `assets`
      - All asset types with common and type-specific fields
    - `liabilities` 
      - All liability types with common and type-specific fields
    - `goals`
      - Financial goals and tracking
    - `global_rules`
      - System and custom rules for calculations
    - `asset_transactions`
      - Track asset value changes and liquidations
    - `liability_payments`
      - Track liability payments and schedules

  2. Security
    - Enable RLS on all tables
    - Add policies for authenticated users
    - Secure access to sensitive data

  3. Notes
    - All monetary values stored as integers (cents)
    - Dates stored in UTC
    - Soft delete enabled for all tables
*/

-- Users table
CREATE TABLE users (
  id uuid PRIMARY KEY REFERENCES auth.users(id),
  email text NOT NULL,
  full_name text,
  monthly_salary bigint NOT NULL DEFAULT 0,
  currency text NOT NULL DEFAULT 'INR',
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now(),
  deleted_at timestamptz
);

-- Assets table
CREATE TABLE assets (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL REFERENCES users(id),
  name text NOT NULL,
  type text NOT NULL,
  value bigint NOT NULL DEFAULT 0,
  purchase_date date,
  maturity_date date,
  expected_return numeric(5,2),
  linked_goal uuid,
  source text,
  is_active boolean NOT NULL DEFAULT true,
  is_liquidated boolean NOT NULL DEFAULT false,
  liquidated_value bigint,
  liquidated_date timestamptz,
  notes text,
  
  -- Bank Account specific
  bank_name text,
  account_type text,
  interest_rate numeric(5,2),
  
  -- FD specific
  fd_type text,
  compounding_frequency text,
  auto_renewal boolean,
  is_tax_saver boolean,
  interest_payout text,
  fd_tenure text,
  interest_received bigint,
  installment_amount bigint,
  
  -- Mutual Fund specific
  investment_type text,
  monthly_sip bigint,
  total_invested bigint,
  
  -- Stocks specific
  stock_name text,
  units numeric(10,4),
  buy_price bigint,
  current_price bigint,
  
  -- Gold specific
  gold_type text,
  weight numeric(10,4),
  gold_buy_price bigint,
  gold_current_price bigint,
  
  -- Property specific
  property_type text,
  location text,
  purchase_price bigint,
  market_value bigint,
  has_loan boolean,
  ownership_percent numeric(5,2),
  rental_income bigint,
  
  -- Crypto specific
  crypto_name text,
  crypto_units numeric(20,8),
  crypto_buy_price bigint,
  crypto_current_price bigint,
  
  -- Other specific
  other_description text,
  
  -- Growth rule
  rule_type text,
  rule_change_rate numeric(5,2),
  rule_frequency text,
  
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now(),
  deleted_at timestamptz
);

-- Liabilities table
CREATE TABLE liabilities (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL REFERENCES users(id),
  name text NOT NULL,
  type text NOT NULL,
  principal bigint NOT NULL,
  interest_rate numeric(5,2) NOT NULL,
  tenure text,
  monthly_installment bigint NOT NULL,
  outstanding_amount bigint NOT NULL,
  lender text,
  next_payment_date date,
  due_date date,
  is_active boolean NOT NULL DEFAULT true,
  notes text,
  
  -- Home Loan specific
  sanction_date date,
  disbursement_date date,
  emi_start_date date,
  loan_maturity_date date,
  
  -- Growth rule
  rule_type text,
  rule_change_rate numeric(5,2),
  rule_frequency text,
  
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now(),
  deleted_at timestamptz
);

-- Goals table
CREATE TABLE goals (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL REFERENCES users(id),
  name text NOT NULL,
  target_amount bigint NOT NULL,
  current_amount bigint NOT NULL DEFAULT 0,
  target_date date NOT NULL,
  priority text NOT NULL,
  category text NOT NULL,
  description text,
  monthly_contribution bigint NOT NULL DEFAULT 0,
  expected_return numeric(5,2),
  inflation_rate numeric(5,2),
  is_active boolean NOT NULL DEFAULT true,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now(),
  deleted_at timestamptz
);

-- Global Rules table
CREATE TABLE global_rules (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL REFERENCES users(id),
  name text NOT NULL,
  type text NOT NULL,
  value numeric(5,2) NOT NULL,
  frequency text NOT NULL,
  description text,
  is_active boolean NOT NULL DEFAULT true,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now(),
  deleted_at timestamptz
);

-- Asset Transactions table
CREATE TABLE asset_transactions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  asset_id uuid NOT NULL REFERENCES assets(id),
  user_id uuid NOT NULL REFERENCES users(id),
  type text NOT NULL,
  amount bigint NOT NULL,
  date timestamptz NOT NULL DEFAULT now(),
  notes text,
  created_at timestamptz NOT NULL DEFAULT now()
);

-- Liability Payments table
CREATE TABLE liability_payments (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  liability_id uuid NOT NULL REFERENCES liabilities(id),
  user_id uuid NOT NULL REFERENCES users(id),
  amount bigint NOT NULL,
  payment_date date NOT NULL,
  status text NOT NULL,
  notes text,
  created_at timestamptz NOT NULL DEFAULT now()
);

-- Enable RLS
ALTER TABLE users ENABLE ROW LEVEL SECURITY;
ALTER TABLE assets ENABLE ROW LEVEL SECURITY;
ALTER TABLE liabilities ENABLE ROW LEVEL SECURITY;
ALTER TABLE goals ENABLE ROW LEVEL SECURITY;
ALTER TABLE global_rules ENABLE ROW LEVEL SECURITY;
ALTER TABLE asset_transactions ENABLE ROW LEVEL SECURITY;
ALTER TABLE liability_payments ENABLE ROW LEVEL SECURITY;

-- Create policies
CREATE POLICY "Users can view own data" ON users
  FOR SELECT USING (auth.uid() = id);

CREATE POLICY "Users can update own data" ON users
  FOR UPDATE USING (auth.uid() = id);

CREATE POLICY "Users can view own assets" ON assets
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own assets" ON assets
  FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own assets" ON assets
  FOR UPDATE USING (auth.uid() = user_id);

CREATE POLICY "Users can delete own assets" ON assets
  FOR DELETE USING (auth.uid() = user_id);

CREATE POLICY "Users can view own liabilities" ON liabilities
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own liabilities" ON liabilities
  FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own liabilities" ON liabilities
  FOR UPDATE USING (auth.uid() = user_id);

CREATE POLICY "Users can delete own liabilities" ON liabilities
  FOR DELETE USING (auth.uid() = user_id);

CREATE POLICY "Users can view own goals" ON goals
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own goals" ON goals
  FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own goals" ON goals
  FOR UPDATE USING (auth.uid() = user_id);

CREATE POLICY "Users can delete own goals" ON goals
  FOR DELETE USING (auth.uid() = user_id);

CREATE POLICY "Users can view own rules" ON global_rules
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own rules" ON global_rules
  FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own rules" ON global_rules
  FOR UPDATE USING (auth.uid() = user_id);

CREATE POLICY "Users can delete own rules" ON global_rules
  FOR DELETE USING (auth.uid() = user_id);

CREATE POLICY "Users can view own transactions" ON asset_transactions
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own transactions" ON asset_transactions
  FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can view own payments" ON liability_payments
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own payments" ON liability_payments
  FOR INSERT WITH CHECK (auth.uid() = user_id);

-- Create indexes
CREATE INDEX idx_assets_user_id ON assets(user_id);
CREATE INDEX idx_assets_type ON assets(type);
CREATE INDEX idx_assets_is_active ON assets(is_active);
CREATE INDEX idx_assets_is_liquidated ON assets(is_liquidated);

CREATE INDEX idx_liabilities_user_id ON liabilities(user_id);
CREATE INDEX idx_liabilities_type ON liabilities(type);
CREATE INDEX idx_liabilities_is_active ON liabilities(is_active);
CREATE INDEX idx_liabilities_next_payment_date ON liabilities(next_payment_date);

CREATE INDEX idx_goals_user_id ON goals(user_id);
CREATE INDEX idx_goals_category ON goals(category);
CREATE INDEX idx_goals_target_date ON goals(target_date);
CREATE INDEX idx_goals_is_active ON goals(is_active);

CREATE INDEX idx_global_rules_user_id ON global_rules(user_id);
CREATE INDEX idx_global_rules_type ON global_rules(type);
CREATE INDEX idx_global_rules_is_active ON global_rules(is_active);

CREATE INDEX idx_asset_transactions_asset_id ON asset_transactions(asset_id);
CREATE INDEX idx_asset_transactions_user_id ON asset_transactions(user_id);
CREATE INDEX idx_asset_transactions_date ON asset_transactions(date);

CREATE INDEX idx_liability_payments_liability_id ON liability_payments(liability_id);
CREATE INDEX idx_liability_payments_user_id ON liability_payments(user_id);
CREATE INDEX idx_liability_payments_payment_date ON liability_payments(payment_date);