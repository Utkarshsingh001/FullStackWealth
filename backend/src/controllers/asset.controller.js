const db = require('../config/db');

const assetController = {
  async getAssets(req, res) {
    try {
      const result = await db.query(
        'SELECT * FROM assets WHERE user_id = $1 AND deleted_at IS NULL ORDER BY created_at DESC',
        [req.user.id]
      );
      res.json(result.rows);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  async createAsset(req, res) {
    try {
      const { name, type, value, ...otherFields } = req.body;
      const result = await db.query(
        'INSERT INTO assets (user_id, name, type, value, ...) VALUES ($1, $2, $3, $4, ...) RETURNING *',
        [req.user.id, name, type, value, ...Object.values(otherFields)]
      );
      res.status(201).json(result.rows[0]);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  async updateAsset(req, res) {
    try {
      const { id } = req.params;
      const updates = req.body;
      const result = await db.query(
        'UPDATE assets SET ... WHERE id = $1 AND user_id = $2 RETURNING *',
        [id, req.user.id]
      );
      res.json(result.rows[0]);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  async deleteAsset(req, res) {
    try {
      const { id } = req.params;
      await db.query(
        'UPDATE assets SET deleted_at = NOW() WHERE id = $1 AND user_id = $2',
        [id, req.user.id]
      );
      res.status(204).send();
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
};

module.exports = assetController;