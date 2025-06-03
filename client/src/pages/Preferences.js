import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useUser } from '@clerk/clerk-react';
import axios from 'axios';
import {
  Slider,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Checkbox,
  ListItemText,
  Button,
  Typography
} from '@mui/material';

// Constants for dropdown options
const DIET_OPTIONS = ['Vegetarian', 'Vegan', 'Keto', 'Paleo', 'Pescetarian', 'None'];
const ALLERGY_OPTIONS = ['Dairy', 'Nuts', 'Gluten', 'Shellfish', 'Soy', 'Eggs', 'None'];
const MEAL_FREQUENCY = ['Daily', 'Weekly', 'Monthly', 'Rarely'];

const Preferences = () => {
  const { user } = useUser();
  const navigate = useNavigate();

  // Form state
  const [formData, setFormData] = useState({
    diets: [],
    allergies: [],
    flavorProfile: {
      spicy: 2, // 1-3 scale
      sweet: 2,
      savory: 2,
      sour: 2,
      salty: 2
    },
    mealFrequency: {
      breakfast: 'Weekly',
      lunch: 'Daily',
      dinner: 'Daily',
      snacks: 'Weekly'
    },
    cookingSkill: 'Intermediate',
    tools: ['Oven', 'Microwave']
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:4000/api/preferences', {
        userId: user.id,
        ...formData
      });
      navigate('/budget');
    } catch (error) {
      console.error('Error saving preferences:', error);
    }
  };

  const handleFlavorChange = (flavor, value) => {
    setFormData(prev => ({
      ...prev,
      flavorProfile: { ...prev.flavorProfile, [flavor]: value }
    }));
  };

  return (
    <div style={{ padding: '2rem', maxWidth: '800px', margin: '0 auto' }}>
      <Typography variant="h4" gutterBottom>Your Dietary Preferences</Typography>
      
      <form onSubmit={handleSubmit}>
        {/* Diet Selection */}
        <FormControl fullWidth margin="normal">
          <InputLabel>Dietary Preferences</InputLabel>
          <Select
            multiple
            value={formData.diets}
            onChange={(e) => setFormData({...formData, diets: e.target.value})}
            renderValue={(selected) => selected.join(', ')}
          >
            {DIET_OPTIONS.map((diet) => (
              <MenuItem key={diet} value={diet}>
                <Checkbox checked={formData.diets.includes(diet)} />
                <ListItemText primary={diet} />
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        {/* Allergies */}
        <FormControl fullWidth margin="normal">
          <InputLabel>Allergies/Restrictions</InputLabel>
          <Select
            multiple
            value={formData.allergies}
            onChange={(e) => setFormData({...formData, allergies: e.target.value})}
            renderValue={(selected) => selected.join(', ')}
          >
            {ALLERGY_OPTIONS.map((allergy) => (
              <MenuItem key={allergy} value={allergy}>
                <Checkbox checked={formData.allergies.includes(allergy)} />
                <ListItemText primary={allergy} />
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        {/* Flavor Profile */}
        <Typography variant="h6" gutterBottom style={{ marginTop: '2rem' }}>
          Flavor Preferences
        </Typography>
        
        {['spicy', 'sweet', 'savory', 'sour', 'salty'].map((flavor) => (
          <div key={flavor} style={{ marginBottom: '1rem' }}>
            <Typography gutterBottom>
              {flavor.charAt(0).toUpperCase() + flavor.slice(1)}: 
              {formData.flavorProfile[flavor] === 1 && ' Low'}
              {formData.flavorProfile[flavor] === 2 && ' Medium'}
              {formData.flavorProfile[flavor] === 3 && ' High'}
            </Typography>
            <Slider
              value={formData.flavorProfile[flavor]}
              min={1}
              max={3}
              step={1}
              onChange={(e, val) => handleFlavorChange(flavor, val)}
              marks={[
                { value: 1, label: 'Low' },
                { value: 2, label: 'Medium' },
                { value: 3, label: 'High' }
              ]}
            />
          </div>
        ))}

        <Button 
          type="submit" 
          variant="contained" 
          color="primary"
          size="large"
          style={{ marginTop: '2rem' }}
        >
          Save Preferences
        </Button>
      </form>
    </div>
  );
};

export default Preferences;