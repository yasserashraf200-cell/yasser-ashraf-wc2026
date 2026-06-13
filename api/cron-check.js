import https from 'https';

const ONE_SIGNAL_APP_ID = '84adb832-e5e6-4fee-90e3-b7bf039a64de';
const ONE_SIGNAL_REST_KEY = 'os_v2_app_qsw3qmxf4zh65ehdw67qhgte32jrmj3lddvutu5z6o5qwylb3slntmbinguveut7rj56w6q2pyrg7epyniycbrsp7xxrdyhar7jlvei';
const FOOTBALL_API_KEY = '0af473f019dc44408f7b561ec109a646';

function fetchJSON(hostname, path, headers) {
  return new Promise((resolve, reject) => {
    const options = { hostname, path, method: 'GET', headers: headers || {} };
    const req = https.request(options, (res) => {
      let body = '';
      res.on('data', (chunk) => body += chunk);
      res.on('end', () => {
        try { resolve(JSON.parse(body)); }
        catch (e) { reject(new Error('Parse error')); }
      });
    });
    req.on('error', reject);
    req.end();
  });
}

function sendOneSignal(title, body, tag) {
  return new Promise((resolve, reject) => {
    const postData = JSON.stringify({
      app_id: ONE_SIGNAL_APP_ID,
      headings: { en: title },
      contents: { en: body },
      tags: tag ? [{ key: 'match', value: tag }] : undefined,
      url: 'https://yasser-ashraf-wc2026.vercel.app'
    });
    const options = {
      hostname: 'onesignal.com',
      path: '/api/v1/notifications',
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Basic ' + ONE_SIGNAL_REST_KEY,
        'Content-Length': Buffer.byteLength(postData)
      }
    };
    const req = https.request(options, (res) => {
      let body = '';
      res.on('data', (chunk) => body += chunk);
      res.on('end', () => { try { resolve(JSON.parse(body)); } catch(e) { resolve({}); } });
    });
    req.on('error', reject);
    req.write(postData);
    req.end();
  });
}

let prevScores = {};

export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');

  if (!ONE_SIGNAL_REST_KEY) {
    return res.status(200).json({ error: 'No OneSignal key', sent: 0 });
  }

  try {
    const apiData = await fetchJSON('api.football-data.org', '/v4/competitions/2000/matches', { 'X-Auth-Token': FOOTBALL_API_KEY });
    if (!apiData.matches) return res.status(200).json({ error: 'No matches', sent: 0 });

    let sent = 0;
    const now = Date.now();

    for (const m of apiData.matches) {
      const matchTime = new Date(m.utcDate).getTime();
      const diff = matchTime - now;
      const tag = `${m.homeTeam.tla}-${m.awayTeam.tla}-${m.utcDate}`;

      if (diff > 0 && diff <= 30 * 60000) {
        const mins = Math.round(diff / 60000);
        const body = `${m.homeTeam.shortName} vs ${m.awayTeam.shortName} بعد ${mins} دقيقة!`;
        await sendOneSignal('⏰ المباراة قريباً', body, tag);
        sent++;
      }

      if (m.score && m.score.fullTime && m.score.fullTime.home !== null) {
        const home = m.score.fullTime.home;
        const away = m.score.fullTime.away;
        const id = m.id;
        const goalTag = `goal-${id}-${home}-${away}`;

        if (prevScores[id]) {
          if (home > prevScores[id].h || away > prevScores[id].a) {
            let scored = '';
            if (home > prevScores[id].h && away > prevScores[id].a) scored = m.homeTeam.shortName + ' و' + m.awayTeam.shortName;
            else if (home > prevScores[id].h) scored = m.homeTeam.shortName;
            else if (away > prevScores[id].a) scored = m.awayTeam.shortName;

            const minute = m.minute ? m.minute + "' | " : '';
            const goalBody = `${minute}⚽ هدف ${scored}!\n${m.homeTeam.shortName} ${home} - ${away} ${m.awayTeam.shortName}`;
            await sendOneSignal('⚽ GOAL! ' + scored, goalBody, goalTag);
            sent++;
          }
        }
        prevScores[id] = { h: home, a: away };
      }
    }

    res.status(200).json({ ok: true, sent, total: apiData.matches.length });
  } catch (error) {
    res.status(200).json({ error: error.message, sent: 0 });
  }
}
