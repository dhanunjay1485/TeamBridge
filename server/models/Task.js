const mongoose = require("mongoose");

const taskSchema = new mongoose.Schema({
  roomId: { type: mongoose.Schema.Types.ObjectId, ref: "Room", required: true },
  title: { type: String, required: true },
  completed: { type: Boolean, default: false },
  assignedTo: { type: mongoose.Schema.Types.ObjectId, ref: "User" }, // Optional
}, { timestamps: true });

module.exports = mongoose.model("Task", taskSchema);
