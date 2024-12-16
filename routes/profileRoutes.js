// routes/profileRoutes.js
const express = require('express');
const { getProfile, updateProfile } = require('../controllers/profileController'); // Import controller functions
const { authenticateToken } = require('../middleware/authMiddleware'); // Import the middleware

const router = express.Router();

// Get Profile - Protected route
router.get('/', authenticateToken, getProfile);

// Update Profile - Protected route
router.put('/', authenticateToken, updateProfile);

module.exports = router; // Export the router correctly

