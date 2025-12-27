// server/routes/rooms.js
const express = require("express");
const mongoose = require("mongoose");
const router = express.Router();
const Room = require("../models/Room");
const auth = require("../middleware/authMiddleware");

// Create a new room
router.post("/", auth, async (req, res) => {
  try {
    const room = new Room({
      name: req.body.name,
      createdBy: req.user.id,
      members: [req.user.id]
    });
    await room.save();
    res.status(201).json(room);
  } catch (err) {
    res.status(500).json({ msg: "Server error" });
  }
});

// Get all rooms the user is part of
router.get("/", auth, async (req, res) => {
  try {
    const rooms = await Room.find({ members: req.user.id });
    res.json(rooms);
  } catch (err) {
    res.status(500).json({ msg: "Server error" });
  }
});

router.get("/:id", auth , async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ message: "Invalid room ID" });
  }

  try {
    const room = await Room.findById(id).populate("members", "name email");
    if (!room) {
      return res.status(404).json({ message: "room not found" });
    }

    res.json(room);
  } catch (err) {
    console.error("Error fetching room by ID:", err);
    res.status(500).json({ message: "Server error" });
  }
});

// Join an existing room
router.post("/join/:roomId", auth, async (req, res) => {
  try {
    const room = await Room.findById(req.params.roomId);
    if (!room.members.includes(req.user.id)) {
      room.members.push(req.user.id);
      await room.save();
    }
    res.json(room);
  } catch (err) {
    res.status(500).json({ msg: "Server error" });
  }
});

router.post("/add-member/:roomId", auth,  async (req, res) => {
  const { userId } = req.body;
  const roomId = req.params.roomId;

  try {
    const room = await Room.findById(roomId);
    if (!room) return res.status(404).json({ message: "Room not found" });

    if (!room.members.includes(userId)) {
      room.members.push(userId);
      await room.save();
    }

    const updatedRoom = await Room.findById(roomId).populate("members", "name email");
    res.json(updatedRoom);
  } catch (err) {
    console.error("Error adding member:", err);
    res.status(500).json({ message: "Server error" });
  }
});


module.exports = router;
