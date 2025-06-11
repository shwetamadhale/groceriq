import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import preferenceRoutes from './routes/preferences.js'; // ✅ make sure .js is present

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

app.use('/api/preferences', preferenceRoutes); // ✅ only one instance of this line

mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB Connected"))
  .catch(err => console.error(err));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
