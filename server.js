const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');

// Initialize express app
const app = express();

// Load environment variables from .env file
dotenv.config();

// Import routes
const authRoutes = require('./routes/auth');

// Middleware for parsing JSON
app.use(express.json());

// Connect to MongoDB
mongoose
  .connect(process.env.MONGO_URI)  // Using MONGO_URI from .env file
  .then(() => console.log('MongoDB connected'))
  .catch((err) => console.error('MongoDB connection error:', err));

// Routes
app.use('/api/auth', authRoutes);

// Test route
app.get('/', (req, res) => res.send('API is running...'));

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
