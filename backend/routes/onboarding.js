// routes/onboarding.js
const express = require("express");
const router = express.Router();
const UserPreferences = require("../models/UserPreferences");

router.post("/save-onboarding", async (req, res) => {
  const { clerkUserId, preferences, budget } = req.body;

  if (!clerkUserId || !preferences || !budget) {
    return res.status(400).json({ message: "Missing required data" });
  }

  try {
    const updated = await UserPreferences.findOneAndUpdate(
      { clerkUserId },
      {
        ...preferences,
        staples: preferences.staplePreferences.split(",").map(s => s.trim()),
        cookingSkill: preferences.cookingSkills,
        budget: {
          durationDays: budget.durationWeeks * 7,
          amount: budget.amount,
        },
        hasCompletedOnboarding: true,
      },
      { upsert: true, new: true, setDefaultsOnInsert: true }
    );

    return res.json({ message: "Onboarding saved", data: updated });
  } catch (err) {
    console.error("Error saving onboarding:", err);
    return res.status(500).json({ message: "Failed to save onboarding" });
  }
});

module.exports = router;
