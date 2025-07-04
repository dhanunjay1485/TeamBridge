const express = require('express');
const router = express.Router();
const auth = require('../middleware/authMiddleware');
const requireRole = require('../middleware/roleMiddleware');

router.get("/admin-only", auth, requireRole("admin"), (req, res) => {
  res.json({ message: "Welcome Admin!" });
});

router.get('/users', auth, requireRole('admin'), async (req, res) => {
  try {
    const users = await User.find({}, '-password'); // exclude password field
    res.json(users);
  } catch (err) {
    console.error("Error fetching users:", err.message);
    res.status(500).json({ msg: 'Server error' });
  }
});

router.put('/promote/:id', auth, requireRole('admin'), async (req, res) => {
  try {
    const user = await User.findByIdAndUpdate(
      req.params.id,
      { role: 'admin' },
      { new: true }
    );
    res.json({ msg: 'User promoted', user });
  } catch (err) {
    console.error('Promotion Error:', err.message);
    res.status(500).json({ msg: 'Server error' });
  }
});
module.exports = router;
