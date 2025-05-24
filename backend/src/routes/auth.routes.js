import express from 'express';
import { body, validationResult } from 'express-validator';
import { register, login, getProfile, updateProfile } from '../controllers/auth.controller.js';
import { authenticateToken } from '../middleware/auth.middleware.js';

const router = express.Router();

router.post(
  '/register',
  [
    body('email').isEmail(),
    body('password').isLength({ min: 6 }),
    body('fullName').notEmpty(),
  ],
  register
);

router.post(
  '/login',
  [
    body('email').isEmail(),
    body('password').exists(),
  ],
  login
);

router.get('/profile', authenticateToken, getProfile);
router.put('/profile', authenticateToken, updateProfile);

export default router;