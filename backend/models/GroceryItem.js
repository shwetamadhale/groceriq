const mongoose = require('mongoose');

const groceryItemSchema = new mongoose.Schema({
  userId: { type: String, required: true },
  name: { type: String, required: true },
  category: { type: String, required: true },
  quantity: { type: Number, required: true },
  expiryDate: { type: Date },
  addedDate: { type: Date, default: Date.now },
  price: { type: Number },
  priority: { type: String, enum: ['low', 'medium', 'high'], default: 'medium' }
});

module.exports = mongoose.model('GroceryItem', groceryItemSchema);