import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import dotenv from 'dotenv';

dotenv.config(); // ⬅ add this line

export default defineConfig({
  plugins: [react()],
});
