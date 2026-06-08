const API_BASE = '/api';

const teamFlags = {
  825: '🇪🇬', 801: '🇸🇦', 815: '🇲🇦', 802: '🇹🇳', 778: '🇩🇿',
  762: '🇦🇷', 764: '🇧🇷', 759: '🇩🇪', 773: '🇫🇷', 770: '🏴󠁧󠁢󠁥󠁮󠁧󠁿',
  760: '🇪🇸', 786: '🇮🇹', 8601: '🇳🇱', 765: '🇵🇹', 766: '🇯🇵',
  772: '🇰🇷', 769: '🇲🇽', 771: '🇺🇸', 8030: '🇶🇦',
  779: '🇦🇺', 8062: '🇮🇶', 840: '🇮🇷', 805: '🇧🇪',
  788: '🇨🇭', 799: '🇭🇷', 792: '🇸🇪', 8601: '🇳🇱',
  765: '🇵🇹', 804: '🇸🇳', 763: '🇬🇭', 812: '🇨🇲',
  813: '🇳🇬', 1935: '🇨🇮', 774: '🇿🇦', 783: '🇳🇿',
  827: '🇵🇱', 816: '🇦🇹', 798: '🇨🇿', 866: '🇷🇸',
  8872: '🇳🇴', 820: '🇩🇰', 803: '🇹🇷', 758: '🇺🇾',
  818: '🇨🇴', 791: '🇪🇨', 761: '🇵🇾', 828: '🇨🇦',
  1836: '🇵🇦', 836: '🇭🇹', 8049: '🇯🇴', 8070: '🇺🇿',
  1060: '🇧🇦', 1930: '🇨🇻', 1934: '🇨🇩', 9460: '🇨🇼',
  8873: '🏴󠁧󠁢󠁳󠁣󠁴󠁿'
};

const teamNames = {
  825: { en: 'Egypt', ar: 'مصر', crest: 'https://r2.thesportsdb.com/images/media/team/badge/uheyzo1742102234.png' },
  801: { en: 'Saudi Arabia', ar: 'السعودية', crest: 'https://r2.thesportsdb.com/images/media/team/badge/24xwpq1594125742.png' },
  815: { en: 'Morocco', ar: 'المغرب', crest: 'https://r2.thesportsdb.com/images/media/team/badge/hbmwkj1731791275.png' },
  802: { en: 'Tunisia', ar: 'تونس', crest: 'https://r2.thesportsdb.com/images/media/team/badge/7r89rg1526727277.png' },
  778: { en: 'Algeria', ar: 'الجزائر', crest: 'https://r2.thesportsdb.com/images/media/team/badge/rrwpry1455460218.png' },
  762: { en: 'Argentina', ar: 'الأرجنتين', crest: 'https://r2.thesportsdb.com/images/media/team/badge/3zplhu1726167477.png' },
  764: { en: 'Brazil', ar: 'البرازيل', crest: 'https://r2.thesportsdb.com/images/media/team/badge/jl6dip1726167280.png' },
  759: { en: 'Germany', ar: 'ألمانيا', crest: 'https://r2.thesportsdb.com/images/media/team/badge/1xysi51726167152.png' },
  773: { en: 'France', ar: 'فرنسا', crest: 'https://r2.thesportsdb.com/images/media/team/badge/p3n0z51726166851.png' },
  770: { en: 'England', ar: 'إنجلترا', crest: 'https://r2.thesportsdb.com/images/media/team/badge/vf5ttc1726166739.png' },
  760: { en: 'Spain', ar: 'إسبانيا', crest: 'https://r2.thesportsdb.com/images/media/team/badge/ncgqyr1726166942.png' },
  786: { en: 'Italy', ar: 'إيطاليا', crest: 'https://r2.thesportsdb.com/images/media/team/badge/fxijcp1726167035.png' },
  8601: { en: 'Netherlands', ar: 'هولندا', crest: 'https://r2.thesportsdb.com/images/media/team/badge/1p0hr41593787110.png' },
  765: { en: 'Portugal', ar: 'البرتغال', crest: 'https://r2.thesportsdb.com/images/media/team/badge/swqvpy1455466083.png' },
  766: { en: 'Japan', ar: 'اليابان', crest: 'https://r2.thesportsdb.com/images/media/team/badge/ffsyxz1591989843.png' },
  772: { en: 'South Korea', ar: 'كوريا', crest: 'https://r2.thesportsdb.com/images/media/team/badge/a8nqfs1589564916.png' },
  769: { en: 'Mexico', ar: 'المكسيك', crest: 'https://r2.thesportsdb.com/images/media/team/badge/3rmosi1748525208.png' },
  771: { en: 'USA', ar: 'أمريكا', crest: 'https://r2.thesportsdb.com/images/media/team/badge/21f0oi1597948195.png' },
  8030: { en: 'Qatar', ar: 'قطر', crest: 'https://r2.thesportsdb.com/images/media/team/badge/rs3ir31642708685.png' },
  779: { en: 'Australia', ar: 'أستراليا', crest: 'https://r2.thesportsdb.com/images/media/team/badge/lark6k1661780848.png' },
  8062: { en: 'Iraq', ar: 'العراق', crest: 'https://r2.thesportsdb.com/images/media/team/badge/aqidfn1742100110.png' },
  840: { en: 'Iran', ar: 'إيران', crest: 'https://r2.thesportsdb.com/images/media/team/badge/uttpvw1455465617.png' },
  805: { en: 'Belgium', ar: 'بلجيكا', crest: 'https://r2.thesportsdb.com/images/media/team/badge/8xlvxv1592062265.png' },
  788: { en: 'Switzerland', ar: 'سويسرا', crest: 'https://r2.thesportsdb.com/images/media/team/badge/mb7yqe1717365808.png' },
  799: { en: 'Croatia', ar: 'كرواتيا', crest: 'https://r2.thesportsdb.com/images/media/team/badge/vvtsyu1455465317.png' },
  792: { en: 'Sweden', ar: 'السويد', crest: 'https://r2.thesportsdb.com/images/media/team/badge/h5adzg1591981772.png' },
  804: { en: 'Senegal', ar: 'السنغال', crest: 'https://www.thesportsdb.com/images/media/team/badge/slayb01780546342.png' },
  763: { en: 'Ghana', ar: 'غانا', crest: 'https://r2.thesportsdb.com/images/media/team/badge/j589xw1751526124.png' },
  812: { en: 'Cameroon', ar: 'الكاميرون', crest: 'https://r2.thesportsdb.com/images/media/team/badge/txqspw1455463989.png' },
  813: { en: 'Nigeria', ar: 'نيجيريا', crest: 'https://r2.thesportsdb.com/images/media/team/badge/qruyxr1455466056.png' },
  1935: { en: 'Ivory Coast', ar: 'ساحل العاج', crest: 'https://r2.thesportsdb.com/images/media/team/badge/rwxuuu1455465643.png' },
  774: { en: 'South Africa', ar: 'جنوب أفريقيا', crest: 'https://r2.thesportsdb.com/images/media/team/badge/xjz9j91553368824.png' },
  783: { en: 'New Zealand', ar: 'نيوزيلندا', crest: 'https://r2.thesportsdb.com/images/media/team/badge/91xpk81742982935.png' },
  827: { en: 'Poland', ar: 'بولندا', crest: 'https://r2.thesportsdb.com/images/media/team/badge/ttvrxy1455466076.png' },
  816: { en: 'Austria', ar: 'النمسا', crest: 'https://r2.thesportsdb.com/images/media/team/badge/874p631628721400.png' },
  798: { en: 'Czechia', ar: 'التشيك', crest: 'https://r2.thesportsdb.com/images/media/team/badge/1o0cx31654205806.png' },
  866: { en: 'Serbia', ar: 'صربيا', crest: 'https://r2.thesportsdb.com/images/media/team/badge/oxvynb1689195538.png' },
  8872: { en: 'Norway', ar: 'النرويج', crest: 'https://r2.thesportsdb.com/images/media/team/badge/gyfn811591973155.png' },
  820: { en: 'Denmark', ar: 'الدنمارك', crest: 'https://r2.thesportsdb.com/images/media/team/badge/e13arj1717365623.png' },
  803: { en: 'Turkey', ar: 'تركيا', crest: 'https://r2.thesportsdb.com/images/media/team/badge/70c4oo1591982459.png' },
  758: { en: 'Uruguay', ar: 'أوروغواي', crest: 'https://r2.thesportsdb.com/images/media/team/badge/ivw23k1606855839.png' },
  818: { en: 'Colombia', ar: 'كولومبيا', crest: 'https://r2.thesportsdb.com/images/media/team/badge/xdjxkq1625293597.png' },
  791: { en: 'Ecuador', ar: 'إكوادور', crest: 'https://r2.thesportsdb.com/images/media/team/badge/ot8bdx1694927857.png' },
  761: { en: 'Paraguay', ar: 'باراغواي', crest: 'https://r2.thesportsdb.com/images/media/team/badge/nwyfbn1638200518.png' },
  828: { en: 'Canada', ar: 'كندا', crest: 'https://r2.thesportsdb.com/images/media/team/badge/8i4h4k1710355753.png' },
  1836: { en: 'Panama', ar: 'بنما', crest: 'https://r2.thesportsdb.com/images/media/team/badge/westdu1601073238.png' },
  836: { en: 'Haiti', ar: 'هايتي', crest: 'https://r2.thesportsdb.com/images/media/team/badge/uf1pwe1601073527.png' },
  8049: { en: 'Jordan', ar: 'الأردن', crest: 'https://r2.thesportsdb.com/images/media/team/badge/ypxrgs1601073547.png' },
  8070: { en: 'Uzbekistan', ar: 'أوزبكستان', crest: 'https://r2.thesportsdb.com/images/media/team/badge/rl46it1601073576.png' },
  1060: { en: 'Bosnia', ar: 'البوسنة', crest: 'https://r2.thesportsdb.com/images/media/team/badge/tqyv2u1636427531.png' },
  1930: { en: 'Cape Verde', ar: 'الرأس الأخضر', crest: 'https://r2.thesportsdb.com/images/media/team/badge/5s3y5i1695135155.png' },
  1934: { en: 'Congo DR', ar: 'الكونغو', crest: 'https://r2.thesportsdb.com/images/media/team/badge/iqjyyr1601073596.png' },
  9460: { en: 'Curaçao', ar: 'كوراساو', crest: 'https://r2.thesportsdb.com/images/media/team/badge/j3r1g51594349889.png' },
  8873: { en: 'Scotland', ar: 'اسكتلندا', crest: 'https://r2.thesportsdb.com/images/media/team/badge/westdu1565142175.png' }
};

function getDeviceId() {
  let deviceId = localStorage.getItem('deviceId');
  if (!deviceId) {
    deviceId = 'device_' + Math.random().toString(36).substr(2, 9) + '_' + Date.now();
    localStorage.setItem('deviceId', deviceId);
  }
  return deviceId;
}

async function apiGet(endpoint) {
  try {
    const response = await fetch(`${API_BASE}${endpoint}`);
    if (!response.ok) throw new Error('API error');
    return await response.json();
  } catch (error) {
    console.error('API GET error:', error);
    return null;
  }
}

async function apiPost(endpoint, data) {
  try {
    const response = await fetch(`${API_BASE}${endpoint}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    });
    if (!response.ok) throw new Error('API error');
    return await response.json();
  } catch (error) {
    console.error('API POST error:', error);
    return null;
  }
}

async function apiPut(endpoint, data) {
  try {
    const response = await fetch(`${API_BASE}${endpoint}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    });
    if (!response.ok) throw new Error('API error');
    return await response.json();
  } catch (error) {
    console.error('API PUT error:', error);
    return null;
  }
}

async function fetchMatches() {
  return await apiGet('/matches');
}

async function fetchLiveMatches() {
  return await apiGet('/matches/live');
}

async function fetchTeams() {
  return await apiGet('/teams');
}

async function fetchNotifications() {
  const deviceId = getDeviceId();
  return await apiGet(`/notifications/${deviceId}`);
}

async function fetchUnreadCount() {
  const deviceId = getDeviceId();
  return await apiGet(`/notifications/unread-count/${deviceId}`);
}

async function registerUser() {
  const deviceId = getDeviceId();
  return await apiPost('/users/register', { deviceId, language: currentLang });
}

async function saveUserTeams(teams) {
  const deviceId = getDeviceId();
  return await apiPut(`/users/teams/${deviceId}`, { teams });
}

async function saveSubscription(subscription) {
  const deviceId = getDeviceId();
  return await apiPut(`/users/subscription/${deviceId}`, { subscription });
}

async function markNotificationRead(id) {
  return await apiPut(`/notifications/read/${id}`);
}

async function markAllNotificationsRead() {
  const deviceId = getDeviceId();
  return await apiPut(`/notifications/read-all/${deviceId}`);
}

function getTeamFlag(teamId) {
  return teamFlags[teamId] || '⚽';
}

function getTeamCrest(teamId) {
  const team = teamNames[teamId];
  if (team && team.crest) return team.crest;
  return null;
}

function getTeamName(teamId, lang) {
  const names = teamNames[teamId];
  if (!names) return 'Unknown';
  return names[lang] || names.en;
}
