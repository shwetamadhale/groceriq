const express = require("express");
const router = express.Router();
const GroceryItem = require("../models/GroceryItem");

// Create new grocery item
router.post("/", async (req, res) => {
  try {
    const newItem = new GroceryItem(req.body);
    await newItem.save();
    res.status(201).json({
      success: true,
      data: newItem
    });
  } catch (err) {
    res.status(400).json({
      success: false,
      error: err.message
    });
  }
});

// Get all grocery items for a user
router.get("/:clerkUserId", async (req, res) => {
  try {
    const items = await GroceryItem.find({ clerkUserId: req.params.clerkUserId });
    res.json({
      success: true,
      data: items
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      error: err.message
    });
  }
});

// Update a grocery item
router.put("/:id", async (req, res) => {
  try {
    const updatedItem = await GroceryItem.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    res.json({
      success: true,
      data: updatedItem
    });
  } catch (err) {
    res.status(400).json({
      success: false,
      error: err.message
    });
  }
});

// Delete a grocery item
router.delete("/:id", async (req, res) => {
  try {
    await GroceryItem.findByIdAndDelete(req.params.id);
    res.json({
      success: true,
      message: "Item deleted successfully"
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      error: err.message
    });
  }
});

module.exports = router;