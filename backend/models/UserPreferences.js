const mongoose = require('mongoose');

const userPreferencesSchema = new mongoose.Schema({
  userId: { type: String, required: true, unique: true },
  dietaryRestrictions: { type: [String], default: [] },
  preferredCuisines: { type: [String], default: [] },
  allergies: { type: [String], default: [] },
  mealFrequency: {
    breakfast: { type: Number, default: 7 },
    lunch: { type: Number, default: 7 },
    dinner: { type: Number, default: 7 }
  }
});

module.exports = mongoose.model('UserPreferences', userPreferencesSchema);