// routes/users.js
const express = require("express");
const router = express.Router();
const User = require("../models/User");
const auth = require("../middleware/authMiddleware");
const requireRole = require("../middleware/roleMiddleware");

// GET all users - only accessible by admin
router.get("/", auth, requireRole("admin"), async (req, res) => {
  try {
    const users = await User.find().select("-password"); // exclude passwords
    res.json(users);
  } catch (err) {
    res.status(500).json({ msg: "Failed to fetch users" });
  }
});

module.exports = router;
