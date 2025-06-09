import React, { useState, useEffect } from 'react';
import { useUser } from '@clerk/clerk-react';
import axios from 'axios';
import {
  Box,
  Typography,
  TextField,
  Button,
  Slider,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Chip,
  Checkbox,
  FormControlLabel,
  Grid
} from '@mui/material';

const Preferences = () => {
  const { user } = useUser();
  const [preferences, setPreferences] = useState({
    cuisines: [],
    allergies: [],
    diet: '',
    flavorProfile: {
      spicy: 1,
      sweet: 1,
      savory: 1,
      sour: 1,
      salty: 1
    },
    mealPreferences: {
      breakfast: 2,
      lunch: 2,
      dinner: 2,
      snacks: 2
    },
    cookingSkills: 'Intermediate',
    toolsAvailable: []
  });

  const [newCuisine, setNewCuisine] = useState('');
  const [newAllergy, setNewAllergy] = useState('');

  const cuisinesOptions = ['Italian', 'Mexican', 'Chinese', 'Indian', 'Japanese', 'Mediterranean'];
  const allergiesOptions = ['Dairy', 'Gluten', 'Nuts', 'Shellfish', 'Eggs', 'Soy'];
  const dietOptions = ['None', 'Vegetarian', 'Vegan', 'Keto', 'Paleo', 'Pescatarian'];
  const toolsOptions = ['Oven', 'Microwave', 'Air Fryer', 'Blender', 'Instant Pot', 'Grill'];

  useEffect(() => {
    const fetchPreferences = async () => {
      try {
        const response = await axios.get('/api/preferences', {
          headers: { Authorization: `Bearer ${user.id}` }
        });
        if (response.data) {
          setPreferences(response.data);
        }
      } catch (error) {
        console.error('Error fetching preferences:', error);
      }
    };

    if (user) {
      fetchPreferences();
    }
  }, [user]);

  const handleFlavorChange = (flavor, value) => {
    setPreferences(prev => ({
      ...prev,
      flavorProfile: { ...prev.flavorProfile, [flavor]: value }
    }));
  };

  const handleMealPrefChange = (meal, value) => {
    setPreferences(prev => ({
      ...prev,
      mealPreferences: { ...prev.mealPreferences, [meal]: value }
    }));
  };

  const handleSubmit = async () => {
    try {
      await axios.post('/api/preferences', preferences, {
        headers: { Authorization: `Bearer ${user.id}` }
      });
      // Navigate to budget page
    } catch (error) {
      console.error('Error saving preferences:', error);
    }
  };

  return (
    <Box sx={{ p: 4 }}>
      <Typography variant="h4" gutterBottom>Your Preferences</Typography>
      
      {/* Cuisines Section */}
      <Box sx={{ mb: 4 }}>
        <Typography variant="h6" gutterBottom>Favorite Cuisines</Typography>
        <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
          <TextField
            label="Add Cuisine"
            value={newCuisine}
            onChange={(e) => setNewCuisine(e.target.value)}
            size="small"
            sx={{ mr: 2 }}
          />
          <Button
            variant="outlined"
            onClick={() => {
              if (newCuisine && !preferences.cuisines.includes(newCuisine)) {
                setPreferences(prev => ({
                  ...prev,
                  cuisines: [...prev.cuisines, newCuisine]
                }));
                setNewCuisine('');
              }
            }}
          >
            Add
          </Button>
        </Box>
        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
          {cuisinesOptions.map(cuisine => (
            <FormControlLabel
              key={cuisine}
              control={
                <Checkbox
                  checked={preferences.cuisines.includes(cuisine)}
                  onChange={(e) => {
                    if (e.target.checked) {
                      setPreferences(prev => ({
                        ...prev,
                        cuisines: [...prev.cuisines, cuisine]
                      }));
                    } else {
                      setPreferences(prev => ({
                        ...prev,
                        cuisines: prev.cuisines.filter(c => c !== cuisine)
                      }));
                    }
                  }}
                />
              }
              label={cuisine}
            />
          ))}
        </Box>
        <Box sx={{ mt: 2 }}>
          {preferences.cuisines.map(cuisine => (
            <Chip
              key={cuisine}
              label={cuisine}
              onDelete={() => {
                setPreferences(prev => ({
                  ...prev,
                  cuisines: prev.cuisines.filter(c => c !== cuisine)
                }));
              }}
              sx={{ mr: 1, mb: 1 }}
            />
          ))}
        </Box>
      </Box>

      {/* Allergies Section */}
      <Box sx={{ mb: 4 }}>
        <Typography variant="h6" gutterBottom>Allergies</Typography>
        <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
          <TextField
            label="Add Allergy"
            value={newAllergy}
            onChange={(e) => setNewAllergy(e.target.value)}
            size="small"
            sx={{ mr: 2 }}
          />
          <Button
            variant="outlined"
            onClick={() => {
              if (newAllergy && !preferences.allergies.includes(newAllergy)) {
                setPreferences(prev => ({
                  ...prev,
                  allergies: [...prev.allergies, newAllergy]
                }));
                setNewAllergy('');
              }
            }}
          >
            Add
          </Button>
        </Box>
        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
          {allergiesOptions.map(allergy => (
            <FormControlLabel
              key={allergy}
              control={
                <Checkbox
                  checked={preferences.allergies.includes(allergy)}
                  onChange={(e) => {
                    if (e.target.checked) {
                      setPreferences(prev => ({
                        ...prev,
                        allergies: [...prev.allergies, allergy]
                      }));
                    } else {
                      setPreferences(prev => ({
                        ...prev,
                        allergies: prev.allergies.filter(a => a !== allergy)
                      }));
                    }
                  }}
                />
              }
              label={allergy}
            />
          ))}
        </Box>
        <Box sx={{ mt: 2 }}>
          {preferences.allergies.map(allergy => (
            <Chip
              key={allergy}
              label={allergy}
              onDelete={() => {
                setPreferences(prev => ({
                  ...prev,
                  allergies: prev.allergies.filter(a => a !== allergy)
                }));
              }}
              sx={{ mr: 1, mb: 1 }}
            />
          ))}
        </Box>
      </Box>

      {/* Diet Section */}
      <Box sx={{ mb: 4 }}>
        <Typography variant="h6" gutterBottom>Diet</Typography>
        <FormControl fullWidth>
          <InputLabel>Select Diet</InputLabel>
          <Select
            value={preferences.diet}
            label="Select Diet"
            onChange={(e) => setPreferences(prev => ({ ...prev, diet: e.target.value }))}
          >
            {dietOptions.map(diet => (
              <MenuItem key={diet} value={diet}>{diet}</MenuItem>
            ))}
          </Select>
        </FormControl>
      </Box>

      {/* Flavor Profile Section */}
      <Box sx={{ mb: 4 }}>
        <Typography variant="h6" gutterBottom>Flavor Profile</Typography>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6}>
            <Typography>Spicy</Typography>
            <Slider
              value={preferences.flavorProfile.spicy}
              onChange={(e, value) => handleFlavorChange('spicy', value)}
              min={0}
              max={2}
              step={1}
              marks={[
                { value: 0, label: 'Mild' },
                { value: 1, label: 'Medium' },
                { value: 2, label: 'Very Hot' }
              ]}
              valueLabelDisplay="auto"
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <Typography>Sweet</Typography>
            <Slider
              value={preferences.flavorProfile.sweet}
              onChange={(e, value) => handleFlavorChange('sweet', value)}
              min={0}
              max={2}
              step={1}
              marks={[
                { value: 0, label: 'Not Sweet' },
                { value: 1, label: 'Lightly Sweet' },
                { value: 2, label: 'Very Sweet' }
              ]}
              valueLabelDisplay="auto"
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <Typography>Savory</Typography>
            <Slider
              value={preferences.flavorProfile.savory}
              onChange={(e, value) => handleFlavorChange('savory', value)}
              min={0}
              max={2}
              step={1}
              marks={[
                { value: 0, label: 'Subtle' },
                { value: 1, label: 'Balanced' },
                { value: 2, label: 'Intense' }
              ]}
              valueLabelDisplay="auto"
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <Typography>Sour/Tangy</Typography>
            <Slider
              value={preferences.flavorProfile.sour}
              onChange={(e, value) => handleFlavorChange('sour', value)}
              min={0}
              max={2}
              step={1}
              marks={[
                { value: 0, label: 'Not Sour' },
                { value: 1, label: 'Slightly Tangy' },
                { value: 2, label: 'Very Sour' }
              ]}
              valueLabelDisplay="auto"
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <Typography>Salty</Typography>
            <Slider
              value={preferences.flavorProfile.salty}
              onChange={(e, value) => handleFlavorChange('salty', value)}
              min={0}
              max={2}
              step={1}
              marks={[
                { value: 0, label: 'Low Salt' },
                { value: 1, label: 'Moderate' },
                { value: 2, label: 'Salty' }
              ]}
              valueLabelDisplay="auto"
            />
          </Grid>
        </Grid>
      </Box>

      {/* Meal Preferences Section */}
      <Box sx={{ mb: 4 }}>
        <Typography variant="h6" gutterBottom>Meal Preferences</Typography>
        <Grid container spacing={2}>
          {['breakfast', 'lunch', 'dinner', 'snacks'].map(meal => (
            <Grid item xs={12} sm={6} key={meal}>
              <Typography>{meal.charAt(0).toUpperCase() + meal.slice(1)}</Typography>
              <Slider
                value={preferences.mealPreferences[meal]}
                onChange={(e, value) => handleMealPrefChange(meal, value)}
                min={0}
                max={4}
                step={1}
                marks={[
                  { value: 0, label: 'Never' },
                  { value: 1, label: 'Rarely' },
                  { value: 2, label: 'Sometimes' },
                  { value: 3, label: 'Often' },
                  { value: 4, label: 'Always' }
                ]}
                valueLabelDisplay="auto"
              />
            </Grid>
          ))}
        </Grid>
      </Box>

      {/* Cooking Skills Section */}
      <Box sx={{ mb: 4 }}>
        <Typography variant="h6" gutterBottom>Cooking Skills</Typography>
        <FormControl fullWidth>
          <InputLabel>Select Skill Level</InputLabel>
          <Select
            value={preferences.cookingSkills}
            label="Select Skill Level"
            onChange={(e) => setPreferences(prev => ({ ...prev, cookingSkills: e.target.value }))}
          >
            <MenuItem value="Beginner">Beginner (can boil pasta, toast bread)</MenuItem>
            <MenuItem value="Intermediate">Intermediate (can follow recipes, meal prep)</MenuItem>
            <MenuItem value="Advanced">Advanced (enjoys cooking from scratch)</MenuItem>
          </Select>
        </FormControl>
      </Box>

      {/* Tools Available Section */}
      <Box sx={{ mb: 4 }}>
        <Typography variant="h6" gutterBottom>Tools Available</Typography>
        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
          {toolsOptions.map(tool => (
            <FormControlLabel
              key={tool}
              control={
                <Checkbox
                  checked={preferences.toolsAvailable.includes(tool)}
                  onChange={(e) => {
                    if (e.target.checked) {
                      setPreferences(prev => ({
                        ...prev,
                        toolsAvailable: [...prev.toolsAvailable, tool]
                      }));
                    } else {
                      setPreferences(prev => ({
                        ...prev,
                        toolsAvailable: prev.toolsAvailable.filter(t => t !== tool)
                      }));
                    }
                  }}
                />
              }
              label={tool}
            />
          ))}
        </Box>
      </Box>

      <Button
        variant="contained"
        size="large"
        onClick={handleSubmit}
        sx={{ mt: 4 }}
      >
        Save Preferences
      </Button>
    </Box>
  );
};

export default Preferences;