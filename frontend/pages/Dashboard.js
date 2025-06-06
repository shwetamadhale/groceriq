import React from 'react';
import { Typography, Container } from '@mui/material';
import GroceryTable from '../components/GroceryTable';

export default function Dashboard() {
  // Temporary mock data
  const mockItems = [
    { id: 1, name: 'Apples', category: 'Fruits', quantity: 5 },
    { id: 2, name: 'Milk', category: 'Dairy', quantity: 2 },
    { id: 3, name: 'Bread', category: 'Bakery', quantity: 1 }
  ];

  return (
    <Container maxWidth="md">
      <Typography variant="h4" gutterBottom>
        My Groceries
      </Typography>
      <GroceryTable items={mockItems} />
    </Container>
  );
}