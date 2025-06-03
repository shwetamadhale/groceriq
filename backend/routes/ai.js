const express = require('express');
const { OpenAI } = require('openai');
const UserPreferences = require('../models/UserPreferences');
const Budget = require('../models/Budget');
const GroceryItem = require('../models/GroceryItem');
const router = express.Router();

const openai = new OpenAI({
  apiKey: process.env.OPENAI_KEY
});

// Generate grocery list
router.post('/generate-list', async (req, res) => {
  try {
    const { userId } = req.body;

    // Get user data
    const [preferences, budget, existingItems] = await Promise.all([
      UserPreferences.findOne({ userId }),
      Budget.findOne({ userId }),
      GroceryItem.find({ userId })
    ]);

    if (!preferences || !budget) {
      return res.status(400).json({
        success: false,
        message: 'Complete onboarding first'
      });
    }

    // Prepare AI prompt
    const prompt = `
      Generate a ${budget.duration} grocery list for:
      - Dietary preferences: ${preferences.diets.join(', ') || 'None'}
      - Allergies: ${preferences.allergies.join(', ') || 'None'}
      - Flavor profile: ${JSON.stringify(preferences.flavorProfile)}
      - Budget: ₹${budget.amount} (Priority: ${budget.priority})
      - Existing items: ${existingItems.map(i => i.name).join(', ') || 'None'}
      
      Return JSON format with:
      - essentialItems: Array of must-have items
      - suggestedItems: Array of recommended items
      - estimatedCost: Total estimated cost
      - mealSuggestions: 3 meal ideas
    `;

    // Call OpenAI
    const completion = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [
        { role: "system", content: "You are a helpful nutritionist and grocery planning assistant." },
        { role: "user", content: prompt }
      ],
      temperature: 0.7,
      max_tokens: 1000
    });

    // Parse and save the response
    const aiResponse = JSON.parse(completion.choices[0].message.content);
    
    res.json({
      success: true,
      data: aiResponse
    });

  } catch (error) {
    console.error('AI processing error:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to generate suggestions'
    });
  }
});

module.exports = router;