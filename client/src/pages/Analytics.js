import React, { useState, useEffect } from 'react';
import { useUser } from '@clerk/clerk-react';
import axios from 'axios';
import {
  Box,
  Typography,
  Paper,
  Grid,
  List,
  ListItem,
  ListItemText,
  Divider,
  Chip,
  CircularProgress
} from '@mui/material';
import {
  LocalGroceryStore as GroceryIcon,
  Warning as WarningIcon,
  ThumbUp as ThumbUpIcon,
  ThumbDown as ThumbDownIcon,
  Restaurant as RestaurantIcon
} from '@mui/icons-material';

const Analytics = () => {
  const { user } = useUser();
  const [analytics, setAnalytics] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAnalytics = async () => {
      try {
        const response = await axios.get('/api/dashboard/analytics', {
          headers: { Authorization: `Bearer ${user.id}` }
        });
        setAnalytics(response.data);
      } catch (error) {
        console.error('Error fetching analytics:', error);
      } finally {
        setLoading(false);
      }
    };

    if (user) {
      fetchAnalytics();
    }
  }, [user]);

  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4" gutterBottom>Analytics</Typography>
      
      <Grid container spacing={3}>
        {/* Left Column - Heatmap */}
        <Grid item xs={12} md={4}>
          <Paper elevation={3} sx={{ p: 3, height: '100%' }}>
            <Typography variant="h6" gutterBottom sx={{ display: 'flex', alignItems: 'center' }}>
              <GroceryIcon sx={{ mr: 1 }} /> Item Usage Heatmap
            </Typography>
            <Box sx={{ mt: 2 }}>
              {analytics?.itemsByCategory ? (
                Object.entries(analytics.itemsByCategory).map(([category, count]) => (
                  <Box key={category} sx={{ mb: 2 }}>
                    <Typography variant="subtitle2">{category}</Typography>
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                      <Box
                        sx={{
                          width: `${Math.min(100, count * 20)}%`,
                          height: 20,
                          bgcolor: 'primary.main',
                          borderRadius: 1
                        }}
                      />
                      <Typography variant="body2" sx={{ ml: 1 }}>{count} items</Typography>
                    </Box>
                  </Box>
                ))
              ) : (
                <Typography>No data available</Typography>
              )}
            </Box>
          </Paper>
        </Grid>

        {/* Middle Column - Restock & Expiring */}
        <Grid item xs={12} md={4}>
          <Paper elevation={3} sx={{ p: 3, mb: 3, height: '48%' }}>
            <Typography variant="h6" gutterBottom sx={{ display: 'flex', alignItems: 'center' }}>
              <GroceryIcon sx={{ mr: 1 }} /> Items to Restock
            </Typography>
            <List dense>
              {analytics?.frequentlyUsed?.length > 0 ? (
                analytics.frequentlyUsed.slice(0, 5).map(item => (
                  <ListItem key={item._id}>
                    <ListItemText primary={item.name} secondary={`Used ${item.frequency}`} />
                  </ListItem>
                ))
              ) : (
                <ListItem>
                  <ListItemText primary="No frequently used items" />
                </ListItem>
              )}
            </List>
          </Paper>
          
          <Paper elevation={3} sx={{ p: 3, height: '48%' }}>
            <Typography variant="h6" gutterBottom sx={{ display: 'flex', alignItems: 'center' }}>
              <WarningIcon sx={{ mr: 1 }} /> Items Expiring Soon
            </Typography>
            <List dense>
              {analytics?.itemsExpiringSoon?.length > 0 ? (
                analytics.itemsExpiringSoon.slice(0, 5).map(item => (
                  <ListItem key={item._id}>
                    <ListItemText 
                      primary={item.name} 
                      secondary={`Expires ${new Date(item.expiryDate).toLocaleDateString()}`} 
                    />
                  </ListItem>
                ))
              ) : (
                <ListItem>
                  <ListItemText primary="No items expiring soon" />
                </ListItem>
              )}
            </List>
          </Paper>
        </Grid>

        {/* Right Column - Skip & Suggestions */}
        <Grid item xs={12} md={4}>
          <Paper elevation={3} sx={{ p: 3, mb: 3, height: '48%' }}>
            <Typography variant="h6" gutterBottom sx={{ display: 'flex', alignItems: 'center' }}>
              <ThumbDownIcon sx={{ mr: 1 }} /> Consider Skipping
            </Typography>
            <List dense>
              {analytics?.rarelyUsed?.length > 0 ? (
                analytics.rarelyUsed.slice(0, 5).map(item => (
                  <ListItem key={item._id}>
                    <ListItemText primary={item.name} secondary={`Used ${item.frequency}`} />
                  </ListItem>
                ))
              ) : (
                <ListItem>
                  <ListItemText primary="No rarely used items" />
                </ListItem>
              )}
            </List>
          </Paper>
          
          <Paper elevation={3} sx={{ p: 3, height: '48%' }}>
            <Typography variant="h6" gutterBottom sx={{ display: 'flex', alignItems: 'center' }}>
              <RestaurantIcon sx={{ mr: 1 }} /> Try Something New
            </Typography>
            <Typography sx={{ fontStyle: 'italic' }}>
              Based on your preferences, we recommend trying:
            </Typography>
            <Box sx={{ mt: 1 }}>
              <Chip label="Quinoa" sx={{ m: 0.5 }} />
              <Chip label="Avocado Oil" sx={{ m: 0.5 }} />
              <Chip label="Chia Seeds" sx={{ m: 0.5 }} />
              <Chip label="Kimchi" sx={{ m: 0.5 }} />
            </Box>
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Analytics;