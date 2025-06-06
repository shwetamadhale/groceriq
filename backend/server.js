require('dotenv').config();
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const authRouter = require('./routes/auth');
const groceryRouter = require('./routes/grocery');
const aiRouter = require('./routes/ai');

const { ClerkExpressRequireAuth } = require('@clerk/express');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// MongoDB Connection
mongoose.connect(process.env.MONGODB_URI)
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error('MongoDB connection error:', err));

// Routes
app.use('/api/auth', authRouter);
app.use('/api/grocery', ClerkExpressRequireAuth(), groceryRouter);
app.use('/api/ai', ClerkExpressRequireAuth(), aiRouter);

// Basic route
app.get('/', (req, res) => {
  res.send('GrocerIQ API is running');
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});