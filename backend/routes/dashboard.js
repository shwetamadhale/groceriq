import express from 'express';
import { ClerkExpressRequireAuth } from '@clerk/clerk-sdk-node';
import GroceryItem from '../models/GroceryItem.js';
import UserPreferences from '../models/UserPreferences.js';
import Budget from '../models/Budget.js';

const router = express.Router();

// Get all grocery items for user
router.get('/items', ClerkExpressRequireAuth, async (req, res) => {
  try {
    const items = await GroceryItem.find({ userId: req.auth.userId });
    res.json(items);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Add new grocery item
router.post('/items', ClerkExpressRequireAuth, async (req, res) => {
  try {
    const item = new GroceryItem({
      userId: req.auth.userId,
      ...req.body
    });
    await item.save();
    res.status(201).json(item);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get dashboard analytics
router.get('/analytics', ClerkExpressRequireAuth, async (req, res) => {
  try {
    const [items, preferences, budget] = await Promise.all([
      GroceryItem.find({ userId: req.auth.userId }),
      UserPreferences.findOne({ userId: req.auth.userId }),
      Budget.findOne({ userId: req.auth.userId })
    ]);
    
    // Basic analytics - in a real app you'd use more complex logic/AI
    const analytics = {
      totalItems: items.length,
      totalSpent: items.reduce((sum, item) => sum + item.price, 0),
      itemsByCategory: items.reduce((acc, item) => {
        acc[item.category] = (acc[item.category] || 0) + 1;
        return acc;
      }, {}),
      itemsExpiringSoon: items.filter(item => 
        item.expiryDate && 
        new Date(item.expiryDate) < new Date(Date.now() + 7 * 24 * 60 * 60 * 1000)
      ),
      frequentlyUsed: items.filter(item => item.frequency === 'Daily' || item.frequency === 'Weekly'),
      rarelyUsed: items.filter(item => item.frequency === 'Rarely')
    };
    
    res.json(analytics);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

export default router;