const User = require('../models/User');

// Fetch User Profile
exports.getProfile = async (req, res) => {
  try {
    const userId = req.user.id; // `req.user` is populated by token middleware
    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Return only profile-related fields
    const { height, weight, age, goal } = user;
    res.status(200).json({ height, weight, age, goal });
  } catch (error) {
    console.error('Error fetching profile:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Update User Profile
exports.updateProfile = async (req, res) => {
  try {
    const userId = req.user.id;
    const { height, weight, age, goal } = req.body;

    // Update profile fields in the database
    const user = await User.findByIdAndUpdate(
      userId,
      { height, weight, age, goal },
      { new: true, runValidators: true }
    );

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.status(200).json({ message: 'Profile updated successfully', user });
  } catch (error) {
    console.error('Error updating profile:', error);
    res.status(500).json({ message: 'Server error' });
  }
};
