const express = require('express');
const router = express.Router();
const Match = require('../models/Match');

router.get('/', async (req, res) => {
  try {
    const { status, group, matchday } = req.query;
    let query = {};
    if (status) query.status = status;
    if (group) query.group = group;
    if (matchday) query.matchday = parseInt(matchday);
    const matches = await Match.find(query).sort({ utcDate: 1 });
    res.json(matches);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.get('/live', async (req, res) => {
  try {
    const matches = await Match.find({ status: { $in: ['IN_PLAY', 'PAUSED'] } }).sort({ utcDate: 1 });
    res.json(matches);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.get('/team/:teamId', async (req, res) => {
  try {
    const teamId = parseInt(req.params.teamId);
    const matches = await Match.find({
      $or: [{ homeTeamId: teamId }, { awayTeamId: teamId }]
    }).sort({ utcDate: 1 });
    res.json(matches);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.get('/:id', async (req, res) => {
  try {
    const match = await Match.findOne({ apiMatchId: parseInt(req.params.id) });
    if (!match) return res.status(404).json({ error: 'Match not found' });
    res.json(match);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
