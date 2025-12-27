const express = require("express");
const router = express.Router();
const upload = require("../middleware/upload");
const auth = require("../middleware/authMiddleware");

// Upload single file (e.g., for a note/task)
router.post("/file", auth, upload.single("file"), (req, res) => {
  if (!req.file) return res.status(400).json({ msg: "No file uploaded" });

  res.status(200).json({
    msg: "File uploaded successfully",
    filePath: `/uploads/${req.file.filename}`,
    fileName: req.file.originalname
  });
});

module.exports = router;
