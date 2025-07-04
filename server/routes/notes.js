const express = require('express');
const router = express.Router();
const auth = require('../middleware/authMiddleware');
const Note = require('../models/Note');

// Create Note
router.post('/', auth, async (req, res) => {
  const { title, content, roomId, assignedTo } = req.body;

  try {
    const note = new Note({
      title,
      content,
      roomId,
      assignedTo,
      createdBy: req.user.id,
    });
    await note.save();
    res.status(201).json(note);
  } catch (err) {
    res.status(500).json({ msg: 'Error creating note' });
  }
});

// Get Notes (optionally by room)
router.get('/', auth, async (req, res) => {
  try {
    const { roomId } = req.query;
    const filter = roomId ? { roomId } : {};
    const notes = await Note.find(filter).populate('assignedTo', 'name');
    res.json(notes);
  } catch (err) {
    res.status(500).json({ msg: 'Error fetching notes' });
  }
});

// Update Note
router.put('/:id', auth, async (req, res) => {
  try {
    const note = await Note.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(note);
  } catch (err) {
    res.status(500).json({ msg: 'Error updating note' });
  }
});

// Delete Note
router.delete('/:id', auth, async (req, res) => {
  try {
    await Note.findByIdAndDelete(req.params.id);
    res.json({ msg: 'Note deleted' });
  } catch (err) {
    res.status(500).json({ msg: 'Error deleting note' });
  }
});

module.exports = router;
