const express = require('express');
const router = express.Router();
const clerk = require('@clerk/express');

// Initialize Clerk middleware
const { ClerkExpressRequireAuth } = clerk;

// Webhook handler
router.post('/webhook', express.raw({ type: 'application/json' }), (req, res) => {
  // Basic webhook handling
  console.log('Webhook received:', req.body.type);
  res.json({ received: true });
});

// Protected route example
router.get('/protected', ClerkExpressRequireAuth(), (req, res) => {
  res.json({ message: 'Protected route accessed successfully' });
});

module.exports = router;