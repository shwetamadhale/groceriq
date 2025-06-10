import { useState } from 'react';
import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api/preferences';
const dietaryOptions = ['Vegetarian', 'Vegan', 'Keto', 'Paleo', 'Halal', 'Kosher'];
const kitchenTools = ['Oven', 'Microwave', 'Blender', 'Pressure Cooker', 'Air Fryer'];

export default function PreferencesForm() {
  const [dietaryRestrictions, setDietaryRestrictions] = useState([]);
  const [allergies, setAllergies] = useState('');
  const [spiceLevel, setSpiceLevel] = useState(5);
  const [tools, setTools] = useState([]);

  const handleSubmit = async (e) => {
  e.preventDefault();
  const data = {
    dietaryRestrictions,
    allergies: allergies.split(',').map(a => a.trim()).filter(Boolean),
    spiceLevel,
    kitchenTools: tools,
  };

  try {
    await axios.post('http://localhost:5000/api/preferences', data);
    alert('Preferences saved!');
    // TODO → Redirect to /budget once we build that page
  } catch (err) {
    console.error(err);
    alert('Failed to save preferences');
  }
};

  const toggleDietary = (option) => {
    setDietaryRestrictions(prev =>
      prev.includes(option) ? prev.filter(item => item !== option) : [...prev, option]
    );
  };

  const toggleTool = (tool) => {
    setTools(prev =>
      prev.includes(tool) ? prev.filter(item => item !== tool) : [...prev, tool]
    );
  };

  return (
    <form onSubmit={handleSubmit} style={{ padding: '1rem' }}>
      <h2>User Preferences</h2>

      <div>
        <h4>Dietary Restrictions:</h4>
        {dietaryOptions.map(option => (
          <label key={option} style={{ marginRight: '10px' }}>
            <input
              type="checkbox"
              value={option}
              checked={dietaryRestrictions.includes(option)}
              onChange={() => toggleDietary(option)}
            />
            {option}
          </label>
        ))}
      </div>

      <div style={{ marginTop: '1rem' }}>
        <label>Allergies (comma separated):</label><br />
        <input
          type="text"
          value={allergies}
          onChange={(e) => setAllergies(e.target.value)}
          placeholder="e.g. peanuts, gluten"
          style={{ width: '300px' }}
        />
      </div>

      <div style={{ marginTop: '1rem' }}>
        <label>Spice Preference: {spiceLevel}</label><br />
        <input
          type="range"
          min="1"
          max="10"
          value={spiceLevel}
          onChange={(e) => setSpiceLevel(e.target.value)}
        />
      </div>

      <div style={{ marginTop: '1rem' }}>
        <h4>Available Kitchen Tools:</h4>
        {kitchenTools.map(tool => (
          <label key={tool} style={{ marginRight: '10px' }}>
            <input
              type="checkbox"
              value={tool}
              checked={tools.includes(tool)}
              onChange={() => toggleTool(tool)}
            />
            {tool}
          </label>
        ))}
      </div>

      <button type="submit" style={{ marginTop: '1rem' }}>Submit Preferences</button>
    </form>
  );
}
