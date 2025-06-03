import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useUser } from '@clerk/clerk-react';
import axios from 'axios';
import {
  Slider,
  Typography,
  Button,
  Container,
  Box,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem
} from '@mui/material';

const Budget = () => {
  const { user } = useUser();
  const navigate = useNavigate();
  const [budgetData, setBudgetData] = useState({
    amount: 5000, // Default ₹5000
    duration: 'weekly', // weekly/monthly
    priority: 'balanced' // budget/health/savings
  });

 const handleSubmit = async (e) => {
  e.preventDefault();
  try {
    // Save preferences and budget separately
    await Promise.all([
      axios.post('http://localhost:4000/api/preferences', {
        userId: user.id,
        ...preferencesData // Your form data
      }),
      axios.post('http://localhost:4000/api/budget', {
        userId: user.id,
        ...budgetData
      })
    ]);

    // Then trigger AI processing
    const response = await axios.post('http://localhost:4000/api/ai/generate-list', {
      userId: user.id
    });

    navigate('/dashboard', { state: { suggestions: response.data } });
  } catch (error) {
    console.error('Submission error:', error);
    // Add user-friendly error display
  }
};

  return (
    <Container maxWidth="sm" sx={{ mt: 4 }}>
      <Typography variant="h4" gutterBottom>Set Your Grocery Budget</Typography>
      
      <Box component="form" onSubmit={handleSubmit} sx={{ mt: 3 }}>
        {/* Budget Amount Slider */}
        <Typography gutterBottom>Monthly Budget: ₹{budgetData.amount}</Typography>
        <Slider
          value={budgetData.amount}
          min={1000}
          max={20000}
          step={500}
          onChange={(e, val) => setBudgetData({...budgetData, amount: val})}
          sx={{ mb: 3 }}
        />

        {/* Budget Duration */}
        <FormControl fullWidth sx={{ mb: 3 }}>
          <InputLabel>Budget Duration</InputLabel>
          <Select
            value={budgetData.duration}
            label="Budget Duration"
            onChange={(e) => setBudgetData({...budgetData, duration: e.target.value})}
          >
            <MenuItem value="weekly">Weekly</MenuItem>
            <MenuItem value="monthly">Monthly</MenuItem>
          </Select>
        </FormControl>

        {/* Spending Priority */}
        <FormControl fullWidth sx={{ mb: 3 }}>
          <InputLabel>Spending Priority</InputLabel>
          <Select
            value={budgetData.priority}
            label="Spending Priority"
            onChange={(e) => setBudgetData({...budgetData, priority: e.target.value})}
          >
            <MenuItem value="balanced">Balanced</MenuItem>
            <MenuItem value="health">Health Focus</MenuItem>
            <MenuItem value="savings">Max Savings</MenuItem>
          </Select>
        </FormControl>

        <Button 
          type="submit" 
          variant="contained" 
          size="large"
          fullWidth
        >
          Generate Smart Grocery List
        </Button>
      </Box>
    </Container>
  );
};

export default Budget;