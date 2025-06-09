import mongoose from 'mongoose';

const budgetSchema = new mongoose.Schema({
  userId: {
    type: String,
    required: true,
    unique: true
  },
  amount: {
    type: Number,
    required: true
  },
  duration: {
    type: Number, // in days
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
});

const Budget = mongoose.model('Budget', budgetSchema);

export default Budget;