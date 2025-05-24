-- Create asset_fields table to store dynamic form field configurations
CREATE TABLE asset_fields (
  id SERIAL PRIMARY KEY,
  field_name VARCHAR(50) NOT NULL,
  field_type VARCHAR(20) NOT NULL,
  label VARCHAR(100) NOT NULL,
  placeholder VARCHAR(100),
  required BOOLEAN DEFAULT false,
  asset_type VARCHAR(50),
  options JSONB,
  validation_rules JSONB,
  field_order INTEGER,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Create assets table
CREATE TABLE assets (
  id SERIAL PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  type VARCHAR(50) NOT NULL,
  value DECIMAL(15,2),
  purchase_date DATE,
  maturity_date DATE,
  expected_return DECIMAL(5,2),
  investment_type VARCHAR(20),
  monthly_sip DECIMAL(15,2),
  total_invested DECIMAL(15,2),
  linked_goal VARCHAR(100),
  source VARCHAR(100),
  is_active BOOLEAN DEFAULT true,
  is_liquidated BOOLEAN DEFAULT false,
  liquidated_value DECIMAL(15,2),
  liquidated_date TIMESTAMP WITH TIME ZONE,
  bank_name VARCHAR(100),
  account_type VARCHAR(50),
  interest_rate DECIMAL(5,2),
  compounding_frequency VARCHAR(20),
  auto_renewal BOOLEAN DEFAULT false,
  is_tax_saver BOOLEAN DEFAULT false,
  stock_name VARCHAR(100),
  units DECIMAL(15,4),
  buy_price DECIMAL(15,2),
  current_price DECIMAL(15,2),
  gold_type VARCHAR(20),
  weight DECIMAL(10,3),
  gold_buy_price DECIMAL(15,2),
  gold_current_price DECIMAL(15,2),
  property_type VARCHAR(50),
  location VARCHAR(200),
  purchase_price DECIMAL(15,2),
  market_value DECIMAL(15,2),
  ownership_percent DECIMAL(5,2),
  rental_income DECIMAL(15,2),
  crypto_name VARCHAR(100),
  crypto_units DECIMAL(20,8),
  crypto_buy_price DECIMAL(15,2),
  crypto_current_price DECIMAL(15,2),
  notes TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Insert sample field configurations
INSERT INTO asset_fields (field_name, field_type, label, placeholder, required, asset_type, options, field_order) VALUES
('name', 'text', 'Asset Name', 'Enter asset name', true, NULL, NULL, 1),
('type', 'select', 'Asset Type', NULL, true, NULL, '["Bank Account", "FD", "Mutual Fund", "Stocks", "Gold", "Property", "Crypto", "Other"]', 2),
('value', 'number', 'Value', 'Enter current value', true, NULL, NULL, 3),
('purchase_date', 'date', 'Purchase Date', NULL, false, NULL, NULL, 4),
('expected_return', 'number', 'Expected Return (%)', 'Enter expected annual return', false, NULL, NULL, 5),
('bank_name', 'text', 'Bank Name', 'Enter bank name', true, 'Bank Account', NULL, 6),
('account_type', 'select', 'Account Type', NULL, true, 'Bank Account', '["Savings", "Current", "Salary", "Money Market"]', 7),
('interest_rate', 'number', 'Interest Rate (%)', 'Enter interest rate', false, 'Bank Account', NULL, 8);

-- Create trigger to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = CURRENT_TIMESTAMP;
    RETURN NEW;
END;
$$ language 'plpgsql';

CREATE TRIGGER update_assets_updated_at
    BEFORE UPDATE ON assets
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_asset_fields_updated_at
    BEFORE UPDATE ON asset_fields
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();