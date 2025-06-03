const express = require('express');
const Budget = require('../models/Budget');
const UserPreferences = require('../models/UserPreferences');
const router = express.Router();

// Save budget data
router.post('/', async (req, res) => {
  try {
    const { userId, ...budgetData } = req.body;
    
    const budget = await Budget.findOneAndUpdate(
      { userId },
      budgetData,
      { upsert: true, new: true }
    );

    res.json({
      success: true,
      data: budget
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
});

// Get combined preferences and budget
router.get('/combined/:userId', async (req, res) => {
  try {
    const [preferences, budget] = await Promise.all([
      UserPreferences.findOne({ userId: req.params.userId }),
      Budget.findOne({ userId: req.params.userId })
    ]);

    if (!preferences || !budget) {
      return res.status(404).json({
        success: false,
        message: 'User data not complete'
      });
    }

    res.json({
      success: true,
      data: {
        preferences,
        budget
      }
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
});

module.exports = router;