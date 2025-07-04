// routes/dashboard.js
const express = require("express");
const router = express.Router();
const auth = require("../middleware/authMiddleware");

router.get("/", auth, (req, res) => {
  res.json({ message: `Welcome ${req.user.name}` });
});

module.exports = router;
