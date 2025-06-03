const mongoose = require('mongoose');

const budgetSchema = new mongoose.Schema({
  userId: {
    type: String,
    required: true,
    unique: true
  },
  amount: {
    type: Number,
    required: true,
    min: 500
  },
  duration: {
    type: String,
    enum: ['weekly', 'monthly'],
    default: 'monthly'
  },
  priority: {
    type: String,
    enum: ['balanced', 'health', 'savings'],
    default: 'balanced'
  },
  lastUpdated: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Budget', budgetSchema);