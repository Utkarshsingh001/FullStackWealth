import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import authRoutes from './routes/auth.routes.js';
import assetRoutes from './routes/asset.routes.js';
import liabilityRoutes from './routes/liability.routes.js';
import goalRoutes from './routes/goal.routes.js';
import ruleRoutes from './routes/rule.routes.js';
import { authenticateToken } from './middleware/auth.middleware.js';

dotenv.config();

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// Public routes
app.use('/api/auth', authRoutes);

// Protected routes
app.use('/api/assets', authenticateToken, assetRoutes);
app.use('/api/liabilities', authenticateToken, liabilityRoutes);
app.use('/api/goals', authenticateToken, goalRoutes);
app.use('/api/rules', authenticateToken, ruleRoutes);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});