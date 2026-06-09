const express = require('express');
const router = express.Router();
const axios = require('axios');

const API_KEY = process.env.FOOTBALL_API_KEY;
const API_URL = 'https://api.football-data.org/v4/competitions/2000/matches';

router.get('/', async (req, res) => {
  try {
    const response = await axios.get(API_URL, {
      headers: { 'X-Auth-Token': API_KEY }
    });
    res.json(response.data.matches || []);
  } catch (error) {
    console.error('Error fetching matches:', error.message);
    res.status(500).json({ error: 'Failed to fetch matches' });
  }
});

module.exports = router;
