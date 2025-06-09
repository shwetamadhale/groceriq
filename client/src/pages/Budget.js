import React, { useState, useEffect } from 'react';
import { useUser } from '@clerk/clerk-react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import {
  Box,
  Typography,
  Slider,
  Button,
  TextField,
  Grid,
  Paper
} from '@mui/material';

const Budget = () => {
  const { user } = useUser();
  const navigate = useNavigate();
  const [budget, setBudget] = useState({
    amount: 100,
    duration: 7
  });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchBudget = async () => {
      try {
        const response = await axios.get('/api/budget', {
          headers: { Authorization: `Bearer ${user.id}` }
        });
        if (response.data) {
          setBudget({
            amount: response.data.amount || 100,
            duration: response.data.duration || 7
          });
        }
      } catch (error) {
        console.error('Error fetching budget:', error);
      }
    };

    if (user) {
      fetchBudget();
    }
  }, [user]);

const handleSubmit = async () => {
  setLoading(true);
  try {
    // Save budget first
    await axios.post('/api/budget', budget, {
      headers: { Authorization: `Bearer ${user.id}` }
    });
    
    // Generate grocery list with AI
    const response = await axios.post('/api/ai/generate-list', {}, {
      headers: { Authorization: `Bearer ${user.id}` }
    });
    
    // Navigate to dashboard which will show the new items
    navigate('/dashboard');
  } catch (error) {
    console.error('Error saving budget or generating list:', error);
  } finally {
    setLoading(false);
  }
};

  return (
    <Box sx={{ p: 4 }}>
      <Typography variant="h4" gutterBottom>Set Your Budget</Typography>
      
      <Paper elevation={3} sx={{ p: 4, mb: 4 }}>
        <Typography variant="h6" gutterBottom>Budget Amount</Typography>
        <Grid container spacing={2} alignItems="center">
          <Grid item xs={12} sm={9}>
            <Slider
              value={budget.amount}
              onChange={(e, value) => setBudget(prev => ({ ...prev, amount: value }))}
              min={20}
              max={500}
              step={10}
              valueLabelDisplay="auto"
              aria-labelledby="budget-amount-slider"
            />
          </Grid>
          <Grid item xs={12} sm={3}>
            <TextField
              label="Amount ($)"
              type="number"
              value={budget.amount}
              onChange={(e) => setBudget(prev => ({ ...prev, amount: Number(e.target.value) }))}
              inputProps={{ min: 20, max: 500 }}
              fullWidth
            />
          </Grid>
        </Grid>
      </Paper>

      <Paper elevation={3} sx={{ p: 4, mb: 4 }}>
        <Typography variant="h6" gutterBottom>Budget Duration</Typography>
        <Grid container spacing={2} alignItems="center">
          <Grid item xs={12} sm={9}>
            <Slider
              value={budget.duration}
              onChange={(e, value) => setBudget(prev => ({ ...prev, duration: value }))}
              min={1}
              max={30}
              step={1}
              valueLabelDisplay="auto"
              aria-labelledby="budget-duration-slider"
            />
          </Grid>
          <Grid item xs={12} sm={3}>
            <TextField
              label="Duration (days)"
              type="number"
              value={budget.duration}
              onChange={(e) => setBudget(prev => ({ ...prev, duration: Number(e.target.value) }))}
              inputProps={{ min: 1, max: 30 }}
              fullWidth
            />
          </Grid>
        </Grid>
      </Paper>

      <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
        <Button
          variant="contained"
          size="large"
          onClick={handleSubmit}
          disabled={loading}
          sx={{ mt: 2 }}
        >
          {loading ? 'Generating...' : 'Generate Grocery List'}
        </Button>
      </Box>
    </Box>
  );
};

export default Budget;