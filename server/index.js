const express = require('express');
const cors = require('cors');
const path = require('path');
const axios = require('axios');

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

app.get('/api/matches', async (req, res) => {
  try {
    const response = await axios.get('https://api.football-data.org/v4/competitions/2000/matches', {
      headers: { 'X-Auth-Token': process.env.FOOTBALL_API_KEY }
    });
    res.json(response.data.matches || []);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch matches' });
  }
});

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'public/index.html'));
});

module.exports = app;
