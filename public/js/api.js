const API_BASE = '/api';

const teamsData = {
  769: { en: 'Mexico', ar: 'المكسيك', flag: 'mx', group: 'A' },
  772: { en: 'South Korea', ar: 'كوريا الجنوبية', flag: 'kr', group: 'A' },
  774: { en: 'South Africa', ar: 'جنوب أفريقيا', flag: 'za', group: 'A' },
  798: { en: 'Czechia', ar: 'التشيك', flag: 'cz', group: 'A' },
  828: { en: 'Canada', ar: 'كندا', flag: 'ca', group: 'B' },
  788: { en: 'Switzerland', ar: 'سويسرا', flag: 'ch', group: 'B' },
  8030: { en: 'Qatar', ar: 'قطر', flag: 'qa', group: 'B' },
  1060: { en: 'Bosnia-Herzegovina', ar: 'البوسنة والهرسك', flag: 'ba', group: 'B' },
  764: { en: 'Brazil', ar: 'البرازيل', flag: 'br', group: 'C' },
  815: { en: 'Morocco', ar: 'المغرب', flag: 'ma', group: 'C' },
  8873: { en: 'Scotland', ar: 'اسكتلندا', flag: 'gb', group: 'C' },
  836: { en: 'Haiti', ar: 'هايتي', flag: 'ht', group: 'C' },
  771: { en: 'United States', ar: 'أمريكا', flag: 'us', group: 'D' },
  761: { en: 'Paraguay', ar: 'باراغواي', flag: 'py', group: 'D' },
  779: { en: 'Australia', ar: 'أستراليا', flag: 'au', group: 'D' },
  803: { en: 'Turkey', ar: 'تركيا', flag: 'tr', group: 'D' },
  759: { en: 'Germany', ar: 'ألمانيا', flag: 'de', group: 'E' },
  791: { en: 'Ecuador', ar: 'إكوادور', flag: 'ec', group: 'E' },
  1935: { en: 'Ivory Coast', ar: 'ساحل العاج', flag: 'ci', group: 'E' },
  9460: { en: 'Curaçao', ar: 'كوراساو', flag: 'cw', group: 'E' },
  8601: { en: 'Netherlands', ar: 'هولندا', flag: 'nl', group: 'F' },
  766: { en: 'Japan', ar: 'اليابان', flag: 'jp', group: 'F' },
  802: { en: 'Tunisia', ar: 'تونس', flag: 'tn', group: 'F' },
  792: { en: 'Sweden', ar: 'السويد', flag: 'se', group: 'F' },
  805: { en: 'Belgium', ar: 'بلجيكا', flag: 'be', group: 'G' },
  825: { en: 'Egypt', ar: 'مصر', flag: 'eg', group: 'G' },
  840: { en: 'IR Iran', ar: 'إيران', flag: 'ir', group: 'G' },
  783: { en: 'New Zealand', ar: 'نيوزيلندا', flag: 'nz', group: 'G' },
  760: { en: 'Spain', ar: 'إسبانيا', flag: 'es', group: 'H' },
  1930: { en: 'Cape Verde', ar: 'الرأس الأخضر', flag: 'cv', group: 'H' },
  801: { en: 'Saudi Arabia', ar: 'السعودية', flag: 'sa', group: 'H' },
  758: { en: 'Uruguay', ar: 'أوروغواي', flag: 'uy', group: 'H' },
  773: { en: 'France', ar: 'فرنسا', flag: 'fr', group: 'I' },
  804: { en: 'Senegal', ar: 'السنغال', flag: 'sn', group: 'I' },
  8062: { en: 'Iraq', ar: 'العراق', flag: 'iq', group: 'I' },
  8872: { en: 'Norway', ar: 'النرويج', flag: 'no', group: 'I' },
  762: { en: 'Argentina', ar: 'الأرجنتين', flag: 'ar', group: 'J' },
  816: { en: 'Austria', ar: 'النمسا', flag: 'at', group: 'J' },
  778: { en: 'Algeria', ar: 'الجزائر', flag: 'dz', group: 'J' },
  8049: { en: 'Jordan', ar: 'الأردن', flag: 'jo', group: 'J' },
  765: { en: 'Portugal', ar: 'البرتغال', flag: 'pt', group: 'K' },
  818: { en: 'Colombia', ar: 'كولومبيا', flag: 'co', group: 'K' },
  8070: { en: 'Uzbekistan', ar: 'أوزبكستان', flag: 'uz', group: 'K' },
  1934: { en: 'Congo DR', ar: 'الكونغو الديمقراطية', flag: 'cd', group: 'K' },
  770: { en: 'England', ar: 'إنجلترا', flag: 'gb', group: 'L' },
  799: { en: 'Croatia', ar: 'كرواتيا', flag: 'hr', group: 'L' },
  763: { en: 'Ghana', ar: 'غانا', flag: 'gh', group: 'L' },
  1836: { en: 'Panama', ar: 'بنما', flag: 'pa', group: 'L' }
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

async function fetchMatches() { return await apiGet('/matches'); }
async function fetchLiveMatches() { return await apiGet('/matches/live'); }
async function fetchTeams() { return await apiGet('/teams'); }
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
async function markNotificationRead(id) { return await apiPut(`/notifications/read/${id}`); }
async function markAllNotificationsRead() {
  const deviceId = getDeviceId();
  return await apiPut(`/notifications/read-all/${deviceId}`);
}

function getTeamFlagImg(teamId) {
  const team = teamsData[teamId];
  if (!team || !team.flag) return '';
  return `<img src="https://flagcdn.com/40x30/${team.flag}.png" alt="" class="flag-img">`;
}

function getTeamFlagUrl(teamId) {
  const team = teamsData[teamId];
  if (!team || !team.flag) return '';
  return `https://flagcdn.com/40x30/${team.flag}.png`;
}

function getTeamFlag(teamId) {
  const team = teamsData[teamId];
  return team ? team.flag : '';
}

function getTeamName(teamId, lang) {
  const team = teamsData[teamId];
  if (!team) return 'Unknown';
  return lang === 'ar' ? team.ar : team.en;
}

function getTeamNameAr(teamId) {
  const team = teamsData[teamId];
  return team ? team.ar : '';
}

function getTeamNameEn(teamId) {
  const team = teamsData[teamId];
  return team ? team.en : '';
}

function getTeamGroup(teamId) {
  const team = teamsData[teamId];
  return team ? team.group : '';
}
