import express from 'express';
import cors from 'cors';
import pg from 'pg';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const { Pool } = pg;

// Database connection
const pool = new Pool({
  host: process.env.PGHOST,
  user: process.env.PGUSER,
  database: process.env.PGDATABASE,
  password: process.env.PGPASSWORD,
  port: process.env.PGPORT,
});

app.use(cors());
app.use(express.json());

// Get form fields configuration
app.get('/api/asset-fields', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM asset_fields ORDER BY field_order');
    res.json(result.rows);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get all assets
app.get('/api/assets', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM assets ORDER BY created_at DESC');
    res.json(result.rows);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get asset by ID
app.get('/api/assets/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const result = await pool.query('SELECT * FROM assets WHERE id = $1', [id]);
    
    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Asset not found' });
    }
    
    res.json(result.rows[0]);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Create new asset
app.post('/api/assets', async (req, res) => {
  try {
    const {
      name,
      type,
      value,
      purchase_date,
      maturity_date,
      expected_return,
      investment_type,
      monthly_sip,
      total_invested,
      linked_goal,
      source,
      is_active,
      bank_name,
      account_type,
      interest_rate,
      notes
    } = req.body;

    const result = await pool.query(
      `INSERT INTO assets (
        name, type, value, purchase_date, maturity_date,
        expected_return, investment_type, monthly_sip,
        total_invested, linked_goal, source, is_active,
        bank_name, account_type, interest_rate, notes
      ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16)
      RETURNING *`,
      [
        name, type, value, purchase_date, maturity_date,
        expected_return, investment_type, monthly_sip,
        total_invested, linked_goal, source, is_active,
        bank_name, account_type, interest_rate, notes
      ]
    );

    res.status(201).json(result.rows[0]);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Update asset
app.put('/api/assets/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const updates = req.body;
    
    const setClause = Object.keys(updates)
      .map((key, i) => `${key} = $${i + 1}`)
      .join(', ');
    
    const values = [...Object.values(updates), id];
    
    const result = await pool.query(
      `UPDATE assets SET ${setClause}, updated_at = NOW() 
       WHERE id = $${values.length} RETURNING *`,
      values
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Asset not found' });
    }

    res.json(result.rows[0]);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Delete asset
app.delete('/api/assets/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const result = await pool.query('DELETE FROM assets WHERE id = $1 RETURNING *', [id]);
    
    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Asset not found' });
    }
    
    res.json({ message: 'Asset deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});