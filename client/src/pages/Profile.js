import React, { useState, useEffect } from 'react';
import { useUser } from '@clerk/clerk-react';
import axios from 'axios';
import {
  Box,
  Typography,
  Avatar,
  Paper,
  Button,
  List,
  ListItem,
  ListItemText,
  Divider,
  TextField,
  CircularProgress
} from '@mui/material';
import {
  Edit as EditIcon,
  Save as SaveIcon,
  Cancel as CancelIcon
} from '@mui/icons-material';

const Profile = () => {
  const { user } = useUser();
  const [preferences, setPreferences] = useState(null);
  const [budget, setBudget] = useState(null);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState(false);
  const [editData, setEditData] = useState({});

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [prefsRes, budgetRes] = await Promise.all([
          axios.get('/api/preferences', {
            headers: { Authorization: `Bearer ${user.id}` }
          }),
          axios.get('/api/budget', {
            headers: { Authorization: `Bearer ${user.id}` }
          })
        ]);
        setPreferences(prefsRes.data);
        setBudget(budgetRes.data);
        setEditData({
          budgetAmount: budgetRes.data?.amount || 0,
          budgetDuration: budgetRes.data?.duration || 0
        });
      } catch (error) {
        console.error('Error fetching profile data:', error);
      } finally {
        setLoading(false);
      }
    };

    if (user) {
      fetchData();
    }
  }, [user]);

  const handleSave = async () => {
    try {
      await axios.post('/api/budget', {
        amount: editData.budgetAmount,
        duration: editData.budgetDuration
      }, {
        headers: { Authorization: `Bearer ${user.id}` }
      });
      setBudget({
        ...budget,
        amount: editData.budgetAmount,
        duration: editData.budgetDuration
      });
      setEditing(false);
    } catch (error) {
      console.error('Error updating budget:', error);
    }
  };

  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4" gutterBottom>Profile</Typography>
      
      <Paper elevation={3} sx={{ p: 3, mb: 3 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
          <Avatar
            src={user.imageUrl}
            alt={user.fullName}
            sx={{ width: 80, height: 80, mr: 3 }}
          />
          <Box>
            <Typography variant="h5">{user.fullName}</Typography>
            <Typography variant="body1" color="text.secondary">{user.primaryEmailAddress?.emailAddress}</Typography>
          </Box>
        </Box>
        
        <Divider sx={{ my: 2 }} />
        
        <Typography variant="h6" gutterBottom>Budget Settings</Typography>
        {editing ? (
          <Box sx={{ display: 'flex', gap: 2, mb: 2 }}>
            <TextField
              label="Amount ($)"
              type="number"
              value={editData.budgetAmount}
              onChange={(e) => setEditData({ ...editData, budgetAmount: Number(e.target.value) })}
              sx={{ flex: 1 }}
            />
            <TextField
              label="Duration (days)"
              type="number"
              value={editData.budgetDuration}
              onChange={(e) => setEditData({ ...editData, budgetDuration: Number(e.target.value) })}
              sx={{ flex: 1 }}
            />
            <Button
              variant="contained"
              startIcon={<SaveIcon />}
              onClick={handleSave}
            >
              Save
            </Button>
            <Button
              variant="outlined"
              startIcon={<CancelIcon />}
              onClick={() => setEditing(false)}
            >
              Cancel
            </Button>
          </Box>
        ) : (
          <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
            <Typography sx={{ flex: 1 }}>
              ${budget?.amount || 0} for {budget?.duration || 0} days
            </Typography>
            <Button
              variant="outlined"
              startIcon={<EditIcon />}
              onClick={() => setEditing(true)}
            >
              Edit
            </Button>
          </Box>
        )}
        
        <Divider sx={{ my: 2 }} />
        
        <Typography variant="h6" gutterBottom>Dietary Preferences</Typography>
        <List dense>
          <ListItem>
            <ListItemText
              primary="Cuisines"
              secondary={preferences?.cuisines?.join(', ') || 'Not specified'}
            />
          </ListItem>
          <ListItem>
            <ListItemText
              primary="Allergies"
              secondary={preferences?.allergies?.join(', ') || 'None'}
            />
          </ListItem>
          <ListItem>
            <ListItemText
              primary="Diet"
              secondary={preferences?.diet || 'Not specified'}
            />
          </ListItem>
          <ListItem>
            <ListItemText
              primary="Cooking Skills"
              secondary={preferences?.cookingSkills || 'Not specified'}
            />
          </ListItem>
        </List>
        
        <Button
          variant="contained"
          component="a"
          href="/preferences"
          sx={{ mt: 2 }}
        >
          Update Preferences
        </Button>
      </Paper>
      
      <Button
        variant="outlined"
        color="secondary"
        sx={{ mt: 2 }}
        onClick={() => {
          // Implement data export
          const data = {
            user: {
              name: user.fullName,
              email: user.primaryEmailAddress?.emailAddress
            },
            preferences,
            budget
          };
          const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
          const url = URL.createObjectURL(blob);
          const link = document.createElement('a');
          link.href = url;
          link.download = 'groceriq-data.json';
          link.click();
        }}
      >
        Export My Data
      </Button>
    </Box>
  );
};

export default Profile;