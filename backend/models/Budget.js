const mongoose = require('mongoose');

const budgetSchema = new mongoose.Schema({
  userId: { type: String, required: true, unique: true },
  amount: { type: Number, required: true },
  duration: { type: String, enum: ['weekly', 'bi-weekly', 'monthly'], required: true },
  priority: {
    essentials: { type: Number, min: 0, max: 100, default: 50 },
    quality: { type: Number, min: 0, max: 100, default: 30 },
    treats: { type: Number, min: 0, max: 100, default: 20 }
  }
});

module.exports = mongoose.model('Budget', budgetSchema);