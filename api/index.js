module.exports = async (req, res) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
  if (req.method === 'OPTIONS') return res.status(200).end();
  try {
    const response = await fetch('https://api.football-data.org/v4/competitions/2000/matches', {
      headers: { 'X-Auth-Token': process.env.FOOTBALL_API_KEY }
    });
    const data = await response.json();
    res.json(data.matches || []);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
