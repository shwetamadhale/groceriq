import express from 'express';
const router = express.Router();
import Preference from '../models/Preference.js';

// POST /api/preferences - Save user preferences
router.post('/', async (req, res) => {
  try {
    const { userId, preferences } = req.body;

    if (!userId || !preferences) {
      return res.status(400).json({ message: 'Missing userId or preferences' });
    }

    let preference = await Preference.findOne({ userId });

    if (preference) {
      // Update existing preferences
      preference.preferences = preferences;
      await preference.save();
    } else {
      // Create new preference
      preference = new Preference({ userId, preferences });
      await preference.save();
    }

    res.status(200).json({ message: 'Preferences saved', preference });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

export default router;
