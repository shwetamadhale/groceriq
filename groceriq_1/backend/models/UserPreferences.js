const mongoose = require('mongoose');

const PreferencesSchema = new mongoose.Schema({
  dietaryRestrictions: [String],
  allergies: [String],
  spiceLevel: Number,
  kitchenTools: [String],
});

module.exports = mongoose.model('Preferences', PreferencesSchema);
