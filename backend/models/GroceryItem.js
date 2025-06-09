import mongoose from 'mongoose';

const groceryItemSchema = new mongoose.Schema({
  userId: {
    type: String,
    required: true
  },
  name: {
    type: String,
    required: true
  },
  category: {
    type: String,
    required: true,
    enum: ['Produce', 'Dairy', 'Meat', 'Bakery', 'Frozen', 'Canned', 'Dry Goods', 'Spices', 'Other']
  },
  price: {
    type: Number,
    required: true
  },
  quantity: {
    type: Number,
    default: 1
  },
  expiryDate: {
    type: Date
  },
  purchaseDate: {
    type: Date,
    default: Date.now
  },
  frequency: {
    type: String,
    enum: ['Daily', 'Weekly', 'Monthly', 'Occasionally', 'Rarely'],
    default: 'Weekly'
  },
  status: {
    type: String,
    enum: ['Active', 'Used Up', 'Expired', 'Skip Next'],
    default: 'Active'
  }
}, { timestamps: true });

const GroceryItem = mongoose.model('GroceryItem', groceryItemSchema);

export default GroceryItem;