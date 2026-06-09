const express = require('express');
const router = express.Router();
const Team = require('../models/Team');

router.get('/', async (req, res) => {
  try {
    const { group, confederation } = req.query;
    let query = {};
    if (group) query.group = group;
    if (confederation) query.confederation = confederation;
    const teams = await Team.find(query).sort({ name: 1 });
    res.json(teams);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.get('/:id', async (req, res) => {
  try {
    const team = await Team.findOne({ id: parseInt(req.params.id) });
    if (!team) return res.status(404).json({ error: 'Team not found' });
    res.json(team);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
