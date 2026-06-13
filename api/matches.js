import https from 'https';

export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
  if (req.method === 'OPTIONS') return res.status(200).end();

  const apiKey = process.env.FOOTBALL_API_KEY || '0af473f019dc44408f7b561ec109a646';

  try {
    const data = await new Promise((resolve, reject) => {
      const options = {
        hostname: 'api.football-data.org',
        path: '/v4/competitions/2000/matches',
        method: 'GET',
        headers: { 'X-Auth-Token': apiKey }
      };
      const req2 = https.request(options, (res2) => {
        let body = '';
        res2.on('data', (chunk) => body += chunk);
        res2.on('end', () => {
          try { resolve(JSON.parse(body)); }
          catch (e) { reject(new Error('Parse error: ' + body.substring(0, 200))); }
        });
      });
      req2.on('error', reject);
      req2.end();
    });

    if (!data.matches) {
      res.status(200).json({ error: data.message || 'No matches', debug: apiKey.substring(0, 4) + '...' });
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
    res.status(200).json({ error: error.message });
  }
}
