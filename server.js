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

// Test route
app.get('/', (req, res) => res.send('API is running...'));

// Ensure the port is properly defined
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
