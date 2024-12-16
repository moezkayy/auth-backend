const express = require('express');
const { getProfile, updateProfile } = require('../controllers/profileController');
const { authenticateToken } = require('../middleware/authMiddleware');

const router = express.Router();

// Get Profile
router.get('/', authenticateToken, getProfile);

// Update Profile
router.put('/', authenticateToken, updateProfile);

module.exports = router;
