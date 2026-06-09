const axios = require('axios');

module.exports = async (req, res) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  try {
    const response = await axios.get('https://api.football-data.org/v4/competitions/2000/matches', {
      headers: { 'X-Auth-Token': process.env.FOOTBALL_API_KEY }
    });
    res.json(response.data.matches || []);
  } catch (error) {
    console.error('Error:', error.message);
    res.status(500).json({ error: 'Failed to fetch matches' });
  }
};
