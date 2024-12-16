const mongoose = require('mongoose');  // Add this line to import mongoose

const UserSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true }, // For authentication
  height: { type: String, default: '' }, // Optional, can be updated later
  weight: { type: String, default: '' }, // Optional
  age: { type: String, default: '' },    // Optional
  goal: { type: String, default: '' },   // Optional
});

module.exports = mongoose.model('User', UserSchema);
