// server.js
const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const authRoutes = require('./routes/auth');
const dashboard = require('./routes/dashboard');
const adminRoutes = require('./routes/admin');
const roomRoutes = require("./routes/rooms");
const noteRoutes = require('./routes/notes');
const taskRoutes = require("./routes/tasks");
const uploadRoutes = require('./routes/upload');
const userRoutes = require("./routes/users");

dotenv.config();

const connectDB = require('./config/db'); // Import DB connection

const app = express();
const PORT = process.env.PORT || 5000;

// Connect to MongoDB
connectDB();

// Middleware
app.use(cors());
app.use(express.json());
app.use('/api/auth', authRoutes);
app.use('/api/dashboard', dashboard);
app.use("/api/admin", adminRoutes);
app.use("/api/rooms", roomRoutes);
app.use('/api/notes', noteRoutes);
app.use("/api/tasks", taskRoutes );
app.use("/api/users", userRoutes);
app.use("/api/upload", uploadRoutes);
app.use("/uploads", express.static("uploads"));

// Basic test route
app.get('/', (req, res) => {
  res.send('CollabSphere API is running!');
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
