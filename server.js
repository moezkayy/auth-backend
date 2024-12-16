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

// Handle unknown routes
app.use((req, res) => res.status(404).json({ message: 'Route not found' }));

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: 'Server error' });
});

// Ensure the port is properly defined
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
