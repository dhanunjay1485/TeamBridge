const express = require("express");
const router = express.Router();
const auth = require("../middleware/authMiddleware");
const Task = require("../models/Task");

// Get tasks for a room
router.get("/", auth, async (req, res) => {
  const { roomId } = req.query;
  try {
    const tasks = await Task.find({ roomId });
    res.json(tasks);
  } catch {
    res.status(500).json({ msg: "Error fetching tasks" });
  }
});

// Create task
router.post("/", auth, async (req, res) => {
  try {
    const newTask = new Task(req.body);
    await newTask.save();
    res.status(201).json(newTask);
  } catch {
    res.status(500).json({ msg: "Error creating task" });
  }
});

// Update task
router.put("/:id", auth, async (req, res) => {
  try {
    const updated = await Task.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(updated);
  } catch {
    res.status(500).json({ msg: "Error updating task" });
  }
});

// Delete task
router.delete("/:id", auth, async (req, res) => {
  try {
    await Task.findByIdAndDelete(req.params.id);
    res.json({ msg: "Task deleted" });
  } catch {
    res.status(500).json({ msg: "Error deleting task" });
  }
});

module.exports = router;
