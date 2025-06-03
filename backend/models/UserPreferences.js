const mongoose = require('mongoose');

const preferenceSchema = new mongoose.Schema({
  userId: { 
    type: String, 
    required: true,
    unique: true 
  },
  diets: [String],
  allergies: [String],
  flavorProfile: {
    spicy: { type: Number, min: 1, max: 3 },
    sweet: { type: Number, min: 1, max: 3 },
    savory: { type: Number, min: 1, max: 3 },
    sour: { type: Number, min: 1, max: 3 },
    salty: { type: Number, min: 1, max: 3 }
  },
  mealFrequency: {
    breakfast: String,
    lunch: String,
    dinner: String,
    snacks: String
  },
  cookingSkill: String,
  tools: [String],
  createdAt: { 
    type: Date, 
    default: Date.now 
  }
});

module.exports = mongoose.model('UserPreferences', preferenceSchema);