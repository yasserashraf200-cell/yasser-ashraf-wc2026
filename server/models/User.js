const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  deviceId: { type: String, required: true, unique: true },
  selectedTeams: [{ type: Number }],
  language: { type: String, default: 'ar', enum: ['ar', 'en'] },
  notificationsEnabled: { type: Boolean, default: true },
  subscription: {
    endpoint: String,
    keys: {
      p256dh: String,
      auth: String
    }
  },
  createdAt: { type: Date, default: Date.now },
  lastActive: { type: Date, default: Date.now }
});

module.exports = mongoose.model('User', userSchema);
