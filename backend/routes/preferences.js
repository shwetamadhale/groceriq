const express = require('express');
const router = express.Router();
const Preferences = require('../models/UserPreferences');

router.post('/', async (req, res) => {
  try {
    const newPreferences = new Preferences(req.body);
    await newPreferences.save();
    res.json({ message: 'Preferences saved successfully' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
});

module.exports = router;
