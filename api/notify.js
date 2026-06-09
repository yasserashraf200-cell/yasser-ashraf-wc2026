const { MongoClient } = require('mongodb');
const webpush = require('web-push');

const uri = process.env.MONGODB_URI;
const VAPID_PUBLIC = process.env.VAPID_PUBLIC_KEY;
const VAPID_PRIVATE = process.env.VAPID_PRIVATE_KEY;
const VAPID_EMAIL = process.env.VAPID_EMAIL;

webpush.setVapidDetails(
  VAPID_EMAIL || 'mailto:yasser@example.com',
  VAPID_PUBLIC,
  VAPID_PRIVATE
);

const matches = [
  ["MX","ZA","2026-06-11T16:00:00Z","A"],
  ["BR","MA","2026-06-11T19:00:00Z","C"],
  ["US","PY","2026-06-11T22:00:00Z","D"],
  ["DE","EC","2026-06-11T23:30:00Z","E"],
  ["CA","CH","2026-06-12T16:00:00Z","B"],
  ["FR","SN","2026-06-12T19:00:00Z","I"],
  ["ES","CV","2026-06-12T22:00:00Z","H"],
  ["BE","EG","2026-06-12T23:30:00Z","G"],
  ["AR","AT","2026-06-13T16:00:00Z","J"],
  ["GB","HR","2026-06-13T19:00:00Z","L"],
  ["NL","JP","2026-06-13T22:00:00Z","F"],
  ["PT","CO","2026-06-13T23:30:00Z","K"],
  ["MX","KR","2026-06-14T16:00:00Z","A"],
  ["BR","SC","2026-06-14T19:00:00Z","C"],
  ["US","AU","2026-06-14T22:00:00Z","D"],
  ["EC","CI","2026-06-14T23:30:00Z","E"],
  ["CA","QA","2026-06-15T16:00:00Z","B"],
  ["FR","IQ","2026-06-15T19:00:00Z","I"],
  ["ES","SA","2026-06-15T22:00:00Z","H"],
  ["BE","IR","2026-06-15T23:30:00Z","G"],
  ["AT","DZ","2026-06-16T16:00:00Z","J"],
  ["GB","GH","2026-06-16T19:00:00Z","L"],
  ["NL","TN","2026-06-16T22:00:00Z","F"],
  ["PT","UZ","2026-06-16T23:30:00Z","K"],
  ["ZA","CZ","2026-06-17T16:00:00Z","A"],
  ["BR","HT","2026-06-17T19:00:00Z","C"],
  ["US","TR","2026-06-17T22:00:00Z","D"],
  ["DE","CW","2026-06-17T23:30:00Z","E"],
  ["CH","BA","2026-06-18T16:00:00Z","B"],
  ["FR","NO","2026-06-18T19:00:00Z","I"],
  ["ES","UY","2026-06-18T22:00:00Z","H"],
  ["BE","NZ","2026-06-18T23:30:00Z","G"],
  ["AR","JO","2026-06-19T16:00:00Z","J"],
  ["GB","PA","2026-06-19T19:00:00Z","L"],
  ["JP","TN","2026-06-19T22:00:00Z","F"],
  ["PT","CD","2026-06-19T23:30:00Z","K"],
  ["MX","CZ","2026-06-20T16:00:00Z","A"],
  ["MA","SC","2026-06-20T19:00:00Z","C"],
  ["PY","AU","2026-06-20T22:00:00Z","D"],
  ["EC","CW","2026-06-20T23:30:00Z","E"],
  ["CH","QA","2026-06-21T16:00:00Z","B"],
  ["SN","IQ","2026-06-21T19:00:00Z","I"],
  ["CV","SA","2026-06-21T22:00:00Z","H"],
  ["EG","IR","2026-06-21T23:30:00Z","G"],
  ["DZ","JO","2026-06-22T16:00:00Z","J"],
  ["HR","GH","2026-06-22T19:00:00Z","L"],
  ["NL","SE","2026-06-22T22:00:00Z","F"],
  ["CO","UZ","2026-06-22T23:30:00Z","K"],
  ["KR","ZA","2026-06-23T16:00:00Z","A"],
  ["MA","HT","2026-06-23T19:00:00Z","C"],
  ["PY","TR","2026-06-23T22:00:00Z","D"],
  ["CI","CW","2026-06-23T23:30:00Z","E"],
  ["CA","BA","2026-06-24T16:00:00Z","B"],
  ["SN","NO","2026-06-24T19:00:00Z","I"],
  ["CV","UY","2026-06-24T22:00:00Z","H"],
  ["EG","NZ","2026-06-24T23:30:00Z","G"],
  ["AR","DZ","2026-06-25T16:00:00Z","J"],
  ["HR","PA","2026-06-25T19:00:00Z","L"],
  ["JP","SE","2026-06-25T22:00:00Z","F"],
  ["CO","CD","2026-06-25T23:30:00Z","K"],
  ["KR","CZ","2026-06-26T16:00:00Z","A"],
  ["SC","HT","2026-06-26T19:00:00Z","C"],
  ["AU","TR","2026-06-26T22:00:00Z","D"],
  ["IQ","NO","2026-06-26T23:30:00Z","I"],
  ["QA","BA","2026-06-27T16:00:00Z","B"],
  ["DE","CI","2026-06-27T19:00:00Z","E"],
  ["TN","SE","2026-06-27T22:00:00Z","F"],
  ["IR","NZ","2026-06-27T23:30:00Z","G"],
  ["SA","UY","2026-06-28T16:00:00Z","H"],
  ["AT","JO","2026-06-28T19:00:00Z","J"],
  ["UZ","CD","2026-06-28T22:00:00Z","K"],
  ["GH","PA","2026-06-28T23:30:00Z","L"]
];

const teamNames = {
  MX:'المكسيك',KR:'كوريا الجنوبية',ZA:'جنوب أفريقيا',CZ:'التشيك',
  CA:'كندا',CH:'سويسرا',QA:'قطر',BA:'البوسنة والهرسك',
  BR:'البرازيل',MA:'المغرب',SC:'اسكتلندا',HT:'هايتي',
  US:'أمريكا',PY:'باراغواي',AU:'أستراليا',TR:'تركيا',
  DE:'ألمانيا',EC:'إكوادور',CI:'ساحل العاج',CW:'كوراساو',
  NL:'هولندا',JP:'اليابان',TN:'تونس',SE:'السويد',
  BE:'بلجيكا',EG:'مصر',IR:'إيران',NZ:'نيوزيلندا',
  ES:'إسبانيا',CV:'الرأس الأخضر',SA:'السعودية',UY:'أوروغواي',
  FR:'فرنسا',SN:'السنغال',IQ:'العراق',NO:'النرويج',
  AR:'الأرجنتين',AT:'النمسا',DZ:'الجزائر',JO:'الأردن',
  PT:'البرتغال',CO:'كولومبيا',UZ:'أوزبكستان',CD:'الكونغو الديمقراطية',
  GB:'إنجلترا',HR:'كرواتيا',GH:'غانا',PA:'بنما'
};

module.exports = async (req, res) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  if (req.method === 'OPTIONS') return res.status(200).end();

  try {
    const client = new MongoClient(uri);
    await client.connect();
    const col = client.db('wc2026').collection('subscriptions');
    const subs = await col.find({}).toArray();
    if (!subs.length) {
      await client.close();
      return res.json({ sent: 0, message: 'No subscribers' });
    }

    const now = new Date();
    const upcoming = matches.filter(m => {
      const matchTime = new Date(m[2]);
      const diff = matchTime - now;
      return diff > 0 && diff <= 15 * 60 * 1000;
    });

    if (!upcoming.length) {
      await client.close();
      return res.json({ sent: 0, message: 'No upcoming matches in 15 min window' });
    }

    let sent = 0;
    const payload = JSON.stringify({
      title: 'WC 2026',
      body: upcoming.map(m =>
        teamNames[m[0]] + ' vs ' + teamNames[m[1]] + ' بعد ' + Math.round((new Date(m[2]) - now) / 60000) + ' دقيقة'
      ).join('\n'),
      tag: 'wc2026-' + now.getTime()
    });

    for (const sub of subs) {
      try {
        await webpush.sendNotification(sub, payload);
        sent++;
      } catch (err) {
        if (err.statusCode === 410 || err.statusCode === 404) {
          await col.deleteOne({ endpoint: sub.endpoint });
        }
      }
    }

    await client.close();
    res.json({ sent, total: subs.length, upcoming: upcoming.length });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
