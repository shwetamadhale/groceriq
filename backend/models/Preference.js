import mongoose from 'mongoose';

const preferenceSchema = new mongoose.Schema({
  userId: {
    type: String,
    required: true,
    unique: true,
  },
  preferences: {
    type: Object,
    required: true,
  },
});

const Preference = mongoose.model('Preference', preferenceSchema);

export default Preference;
