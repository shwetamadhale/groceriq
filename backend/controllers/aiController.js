import axios from 'axios';
import GroceryItem from '../models/GroceryItem.js';
import UserPreferences from '../models/UserPreferences.js';
import Budget from '../models/Budget.js';

export const generateGroceryList = async (req, res) => {
  try {
    const { userId } = req.auth;
    
    // Get user data
    const [preferences, budget] = await Promise.all([
      UserPreferences.findOne({ userId }),
      Budget.findOne({ userId })
    ]);
    
    if (!preferences || !budget) {
      return res.status(400).json({ error: 'User preferences or budget not set' });
    }
    
    // Construct prompt for AI
    const prompt = `Generate a grocery shopping list for a ${preferences.diet || 'standard'} diet with the following characteristics:
    - Budget: $${budget.amount} for ${budget.duration} days
    - Preferred cuisines: ${preferences.cuisines.join(', ') || 'none'}
    - Allergies: ${preferences.allergies.join(', ') || 'none'}
    - Cooking skill level: ${preferences.cookingSkills}
    - Flavor preferences: 
      * Spiciness: ${['Mild', 'Medium', 'Hot'][preferences.flavorProfile.spicy]}
      * Sweetness: ${['Not sweet', 'Lightly sweet', 'Very sweet'][preferences.flavorProfile.sweet]}
      * Savory: ${['Subtle', 'Balanced', 'Intense'][preferences.flavorProfile.savory]}
    
    Return the list as an array of objects with these properties for each item:
    - name: string
    - category: string (Produce, Dairy, Meat, Bakery, Frozen, Canned, Dry Goods, Spices, Other)
    - estimatedPrice: number
    - quantity: number
    - priority: string (Essential, Recommended, Optional)
    
    Also include 3 meal suggestions that can be made with these ingredients.`;

    // Call Hugging Face API (or your preferred AI service)
    const response = await axios.post(
      'https://api-inference.huggingface.co/models/bigscience/bloom', // Replace with your model
      { inputs: prompt },
      {
        headers: {
          Authorization: `Bearer ${process.env.HF_API_KEY}`,
        },
      }
    );

    // Process the response
    const aiResponse = response.data;
    let groceryList = [];
    let mealSuggestions = [];

    // Simple parsing - in a real app you'd need more robust parsing
    if (Array.isArray(aiResponse)) {
      groceryList = aiResponse;
    } else if (typeof aiResponse === 'string') {
      // Try to parse JSON if the response is a string
      try {
        const parsed = JSON.parse(aiResponse);
        if (Array.isArray(parsed)) {
          groceryList = parsed;
        }
      } catch (e) {
        console.error('Failed to parse AI response:', e);
      }
    }

    // Save the generated items to the database
    const savedItems = await Promise.all(
      groceryList.map(item => 
        GroceryItem.create({
          userId,
          name: item.name,
          category: item.category || 'Other',
          price: item.estimatedPrice || 0,
          quantity: item.quantity || 1,
          frequency: item.priority === 'Essential' ? 'Weekly' : 
                   item.priority === 'Recommended' ? 'Monthly' : 'Occasionally'
        })
      )
    );

    res.json({
      items: savedItems,
      suggestions: mealSuggestions
    });
  } catch (error) {
    console.error('AI generation error:', error);
    res.status(500).json({ error: 'Failed to generate grocery list' });
  }
};

export const getRecommendations = async (req, res) => {
  try {
    const { userId } = req.auth;
    
    // Get user's existing items
    const items = await GroceryItem.find({ userId });
    
    if (items.length === 0) {
      return res.json({ suggestions: [] });
    }
    
    // Construct prompt for AI
    const prompt = `Suggest 5 grocery items that would complement the following items:
    ${items.slice(0, 10).map(i => i.name).join(', ')}
    
    Return the suggestions as an array of strings.`;
    
    // Call AI service
    const response = await axios.post(
      'https://api-inference.huggingface.co/models/bigscience/bloom',
      { inputs: prompt },
      {
        headers: {
          Authorization: `Bearer ${process.env.HF_API_KEY}`,
        },
      }
    );
    
    // Process response
    let suggestions = [];
    if (Array.isArray(response.data)) {
      suggestions = response.data;
    } else if (typeof response.data === 'string') {
      suggestions = response.data.split('\n').filter(Boolean);
    }
    
    res.json({ suggestions: suggestions.slice(0, 5) });
  } catch (error) {
    console.error('Recommendation error:', error);
    res.status(500).json({ error: 'Failed to get recommendations' });
  }
};