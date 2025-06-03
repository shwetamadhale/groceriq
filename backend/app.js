// smartgrocery/backend/app.js
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const { ClerkExpressRequireAuth } = require("@clerk/clerk-sdk-node"); // Add this
require("dotenv").config();

const app = express();

// Middleware
app.use(cors({
  origin: "http://localhost:3000",
  methods: ["GET", "POST", "PUT", "DELETE"],
  allowedHeaders: ["Content-Type", "Authorization"]
}));
app.use(express.json());

// Database connection
mongoose.connect(process.env.MONGODB_URI)
  .then(() => console.log("MongoDB connected"))
  .catch(err => console.error("MongoDB error:", err));

// Routes (now protected with Clerk)
const preferencesRouter = require("./routes/preferences");
const groceryRouter = require("./routes/grocery");
const budgetRouter = require("./routes/budget");
const aiRouter = require("./routes/ai");

// Apply Clerk middleware to all API routes
app.use("/api/preferences", ClerkExpressRequireAuth(), preferencesRouter);
app.use("/api/grocery", ClerkExpressRequireAuth(), groceryRouter);
app.use("/api/budget", ClerkExpressRequireAuth(), budgetRouter);
app.use("/api/ai", ClerkExpressRequireAuth(), aiRouter);

// Health check (public route)
app.get("/health", (req, res) => {
  res.status(200).json({
    status: "healthy",
    database: mongoose.connection.readyState === 1 ? "connected" : "disconnected",
    timestamp: new Date().toISOString()
  });
});

// Error handling
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({
    success: false,
    message: "Internal server error",
    error: process.env.NODE_ENV === "development" ? err.message : undefined
  });
});

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));