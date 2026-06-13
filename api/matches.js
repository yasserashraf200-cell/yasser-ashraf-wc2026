export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
  if (req.method === 'OPTIONS') return res.status(200).end();

  try {
    const apiKey = process.env.FOOTBALL_API_KEY || '0af473f019dc44408f7b561ec109a646';
    const response = await fetch('https://api.football-data.org/v4/competitions/2000/matches', {
      headers: { 'X-Auth-Token': apiKey }
    });
    const data = await response.json();
    if (!data.matches) {
      res.json([]);
      return;
    }
    const matches = data.matches.map(m => ({
      id: m.id,
      group: m.group,
      status: m.status,
      homeTeam: { id: m.homeTeam.id, name: m.homeTeam.shortName || m.homeTeam.name },
      awayTeam: { id: m.awayTeam.id, name: m.awayTeam.shortName || m.awayTeam.name },
      score: m.score,
      utcDate: m.utcDate,
      minute: m.minute
    }));
    res.json(matches);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}
