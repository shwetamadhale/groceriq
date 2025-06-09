import express from 'express';
import { ClerkExpressRequireAuth } from '@clerk/clerk-sdk-node';
import Budget from '../models/Budget.js';

const router = express.Router();

// Get user budget
router.get('/', ClerkExpressRequireAuth, async (req, res) => {
  try {
    const budget = await Budget.findOne({ userId: req.auth.userId });
    res.json(budget || {});
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Update user budget
router.post('/', ClerkExpressRequireAuth, async (req, res) => {
  try {
    const budget = await Budget.findOneAndUpdate(
      { userId: req.auth.userId },
      { $set: req.body, updatedAt: new Date() },
      { new: true, upsert: true }
    );
    res.json(budget);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

export default router;