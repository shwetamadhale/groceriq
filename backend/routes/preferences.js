const express = require('express');
const UserPreferences = require('../models/UserPreferences');
const router = express.Router();

// Save or update preferences
router.post('/', async (req, res) => {
  try {
    const { userId, ...preferences } = req.body;
    
    const existingPrefs = await UserPreferences.findOne({ userId });
    
    if (existingPrefs) {
      // Update existing preferences
      const updatedPrefs = await UserPreferences.findOneAndUpdate(
        { userId },
        preferences,
        { new: true }
      );
      res.json(updatedPrefs);
    } else {
      // Create new preferences
      const newPrefs = new UserPreferences({
        userId,
        ...preferences
      });
      await newPrefs.save();
      res.status(201).json(newPrefs);
    }
  } catch (error) {
    console.error('Error saving preferences:', error);
    res.status(500).json({ error: 'Failed to save preferences' });
  }
});

// Get preferences for a user
router.get('/:userId', async (req, res) => {
  try {
    const preferences = await UserPreferences.findOne({ 
      userId: req.params.userId 
    });
    
    if (!preferences) {
      return res.status(404).json({ error: 'Preferences not found' });
    }
    
    res.json(preferences);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch preferences' });
  }
});

module.exports = router;