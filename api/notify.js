export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  if (req.method === 'OPTIONS') return res.status(200).end();

  const ONE_SIGNAL_APP_ID = '84adb832-e5e6-4fee-90e3-b7bf039a64de';
  const ONE_SIGNAL_REST_KEY = req.headers['x-onesignal-rest-key'] || process.env.ONESIGNAL_REST_KEY;

  if (!ONE_SIGNAL_REST_KEY) {
    return res.status(400).json({ error: 'Missing OneSignal REST API Key' });
  }

  try {
    const { title, body, tag, url } = req.body || {};
    
    const response = await fetch('https://onesignal.com/api/v1/notifications', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Basic ' + ONE_SIGNAL_REST_KEY
      },
      body: JSON.stringify({
        app_id: ONE_SIGNAL_APP_ID,
        headings: { en: title || 'Yas app' },
        contents: { en: body || 'World Cup 2026' },
        tags: tag ? [{ key: 'match', value: tag }] : undefined,
        url: url || 'https://yasser-ashraf-wc2026.vercel.app',
        web_buttons: [{ id: 'open', text: 'شوف المباراة', icon: 'https://crests.football-data.org/wm26.png' }]
      })
    });

    const data = await response.json();
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}
