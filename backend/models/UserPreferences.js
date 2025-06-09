import mongoose from 'mongoose';

const preferenceSchema = new mongoose.Schema({
  userId: {
    type: String,
    required: true,
    unique: true
  },
  cuisines: [String],
  allergies: [String],
  diet: String,
  flavorProfile: {
    spicy: { type: Number, min: 0, max: 2 },
    sweet: { type: Number, min: 0, max: 2 },
    savory: { type: Number, min: 0, max: 2 },
    sour: { type: Number, min: 0, max: 2 },
    salty: { type: Number, min: 0, max: 2 }
  },
  mealPreferences: {
    breakfast: { type: Number, min: 0, max: 4 },
    lunch: { type: Number, min: 0, max: 4 },
    dinner: { type: Number, min: 0, max: 4 },
    snacks: { type: Number, min: 0, max: 4 }
  },
  cookingSkills: { type: String, enum: ['Beginner', 'Intermediate', 'Advanced'] },
  toolsAvailable: [String],
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
});

const UserPreferences = mongoose.model('UserPreferences', preferenceSchema);

export default UserPreferences;