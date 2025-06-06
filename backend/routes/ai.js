const express = require('express');
const router = express.Router();
const axios = require('axios');
const { ClerkExpressRequireAuth } = require('@clerk/clerk-sdk-node');
const UserPreferences = require('../models/UserPreferences');
const Budget = require('../models/Budget');
const GroceryItem = require('../models/GroceryItem');

router.use(ClerkExpressRequireAuth());

router.post('/generate-list', async (req, res) => {
  try {
    // Get user data
    const [preferences, budget, currentItems] = await Promise.all([
      UserPreferences.findOne({ userId: req.auth.userId }),
      Budget.findOne({ userId: req.auth.userId }),
      GroceryItem.find({ userId: req.auth.userId })
    ]);

    if (!preferences || !budget) {
      return res.status(400).json({ message: 'Complete onboarding first' });
    }

    // Create prompt
    const prompt = createPrompt(preferences, budget, currentItems);
    
    // Call Hugging Face API
    const response = await axios.post(
      'https://api-inference.huggingface.co/models/gpt2',
      { inputs: prompt },
      { headers: { Authorization: `Bearer ${process.env.HUGGING_FACE_API_KEY}` } }
    );

    // Parse response (simplified - you'd need more complex parsing)
    const generatedItems = parseAIResponse(response.data);

    res.json(generatedItems);
  } catch (err) {
    console.error('AI generation error:', err);
    res.status(500).json({ message: 'AI generation failed' });
  }
});

function createPrompt(preferences, budget, currentItems) {
  return `Generate a grocery shopping list based on:
  - Dietary restrictions: ${preferences.dietaryRestrictions.join(', ')}
  - Allergies: ${preferences.allergies.join(', ')}
  - Preferred cuisines: ${preferences.preferredCuisines.join(', ')}
  - Weekly budget: $${budget.amount}
  - Current items: ${currentItems.map(i => i.name).join(', ')}
  
  Return only a JSON array of items with name, category, and estimatedPrice.`;
}

function parseAIResponse(response) {
  try {
    // This is simplified - you'd need proper parsing based on your AI's response format
    const text = response[0]?.generated_text || '';
    const jsonStart = text.indexOf('[');
    const jsonEnd = text.lastIndexOf(']') + 1;
    const jsonString = text.slice(jsonStart, jsonEnd);
    return JSON.parse(jsonString);
  } catch (err) {
    console.error('Parsing error:', err);
    return [];
  }
}

module.exports = router;