import express from 'express';
import { ClerkExpressRequireAuth } from '@clerk/clerk-sdk-node';
import UserPreferences from '../models/UserPreferences.js';

const router = express.Router();

// Get user preferences
router.get('/', ClerkExpressRequireAuth, async (req, res) => {
  try {
    const preferences = await UserPreferences.findOne({ userId: req.auth.userId });
    res.json(preferences || {});
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Update user preferences
router.post('/', ClerkExpressRequireAuth, async (req, res) => {
  try {
    const preferences = await UserPreferences.findOneAndUpdate(
      { userId: req.auth.userId },
      { $set: req.body, updatedAt: new Date() },
      { new: true, upsert: true }
    );
    res.json(preferences);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

export default router;