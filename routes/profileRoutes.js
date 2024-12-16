// controllers/profileController.js
const User = require('../models/User'); // Assuming you have a User model

// Get Profile
const getProfile = async (req, res) => {
    try {
        // Fetch the user profile using the user ID from the decoded token
        const user = await User.findById(req.user.id); // req.user comes from the middleware

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        res.json({
            id: user._id,
            username: user.username,
            email: user.email,
            // add any other fields you want to return
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server error' });
    }
};

// Update Profile
const updateProfile = async (req, res) => {
    try {
        // Find user and update their profile
        const user = await User.findByIdAndUpdate(req.user.id, req.body, { new: true });

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        res.json({
            message: 'Profile updated successfully',
            user: {
                id: user._id,
                username: user.username,
                email: user.email,
            }
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server error' });
    }
};

module.exports = { getProfile, updateProfile };
