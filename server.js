const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors'); // Adding CORS for cross-origin requests

// Initialize express app
const app = express();

// Load environment variables from .env file
dotenv.config();

// Import routes
const authRoutes = require('./routes/auth');
const profileRoutes = require('./routes/profileRoutes'); // Import the profile routes

// Middleware
app.use(cors()); // Enable CORS for all requests
app.use(express.json()); // Middleware for parsing JSON

// MongoDB connection (ensuring it handles error if not properly configured)
mongoose
  .connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB connected'))
  .catch((err) => {
    console.error('MongoDB connection error:', err);
    process.exit(1); // Exit the process if MongoDB connection fails
  });

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/profile', profileRoutes); // Add profile routes

// Test route
app.get('/', (req, res) => res.send('API is running...'));

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
