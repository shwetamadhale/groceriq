const express = require('express');
const router = express.Router();
const GroceryItem = require('../models/GroceryItem');
const { ClerkExpressRequireAuth } = require('@clerk/clerk-sdk-node');

// Protect all routes with authentication
router.use(ClerkExpressRequireAuth());

// Get all grocery items for user
router.get('/', async (req, res) => {
  try {
    const items = await GroceryItem.find({ userId: req.auth.userId });
    res.json(items);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Add new grocery item
router.post('/', async (req, res) => {
  const item = new GroceryItem({
    userId: req.auth.userId,
    ...req.body
  });

  try {
    const newItem = await item.save();
    res.status(201).json(newItem);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Update grocery item
router.patch('/:id', async (req, res) => {
  try {
    const item = await GroceryItem.findOneAndUpdate(
      { _id: req.params.id, userId: req.auth.userId },
      req.body,
      { new: true }
    );
    res.json(item);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Delete grocery item
router.delete('/:id', async (req, res) => {
  try {
    await GroceryItem.findOneAndDelete({ _id: req.params.id, userId: req.auth.userId });
    res.json({ message: 'Deleted item' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;