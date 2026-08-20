const express = require('express');
const cors = require('cors');
const { PrismaClient } = require('@prisma/client');

const app = express();
const prisma = new PrismaClient();
const PORT = 3001;

app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
  res.send('API is working');
});

// Get all items
app.get('/items', async (req, res) => {
  const items = await prisma.item.findMany();
  res.json(items);
});

// Add new item
app.post('/items', async (req, res) => {
  const data = req.body;
  const item = await prisma.item.create({ data });
  res.json(item);
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
