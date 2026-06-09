const express = require('express');
const router = express.Router();
const User = require('../models/User');

router.post('/register', async (req, res) => {
  try {
    const { deviceId, language } = req.body;
    let user = await User.findOne({ deviceId });
    if (user) {
      user.lastActive = new Date();
      if (language) user.language = language;
      await user.save();
      return res.json(user);
    }
    user = new User({ deviceId, language: language || 'ar' });
    await user.save();
    res.status(201).json(user);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.put('/teams/:deviceId', async (req, res) => {
  try {
    const { teams } = req.body;
    const user = await User.findOne({ deviceId: req.params.deviceId });
    if (!user) return res.status(404).json({ error: 'User not found' });
    user.selectedTeams = teams;
    user.lastActive = new Date();
    await user.save();
    res.json(user);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.put('/language/:deviceId', async (req, res) => {
  try {
    const { language } = req.body;
    const user = await User.findOne({ deviceId: req.params.deviceId });
    if (!user) return res.status(404).json({ error: 'User not found' });
    user.language = language;
    await user.save();
    res.json(user);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.put('/subscription/:deviceId', async (req, res) => {
  try {
    const { subscription } = req.body;
    const user = await User.findOne({ deviceId: req.params.deviceId });
    if (!user) return res.status(404).json({ error: 'User not found' });
    user.subscription = subscription;
    user.notificationsEnabled = true;
    await user.save();
    res.json(user);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.get('/:deviceId', async (req, res) => {
  try {
    const user = await User.findOne({ deviceId: req.params.deviceId });
    if (!user) return res.status(404).json({ error: 'User not found' });
    res.json(user);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
