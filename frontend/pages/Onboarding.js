import React from 'react';
import { Typography, Container, Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';

export default function Onboarding() {
  const navigate = useNavigate();

  return (
    <Container maxWidth="md">
      <Typography variant="h4" gutterBottom>
        Welcome to GrocerIQ!
      </Typography>
      <Typography paragraph>
        Let's set up your grocery preferences.
      </Typography>
      <Button 
        variant="contained" 
        onClick={() => navigate('/')}
      >
        Complete Setup
      </Button>
    </Container>
  );
}