const API_BASE = '/api';

const teamFlags = {
  825: '🇪🇬', 801: '🇸🇦', 815: '🇲🇦', 802: '🇹🇳', 778: '🇩🇿',
  762: '🇦🇷', 764: '🇧🇷', 759: '🇩🇪', 773: '🇫🇷', 770: '🏴󠁧󠁢󠁥󠁮󠁧󠁿',
  760: '🇪🇸', 786: '🇮🇹', 8601: '🇳🇱', 765: '🇵🇹', 766: '🇯🇵',
  772: '🇰🇷', 769: '🇲🇽', 771: '🇺🇸', 794: '🇦🇪', 8030: '🇶🇦',
  779: '🇦🇺', 8062: '🇮🇶', 8070: '🇺🇿', 763: '🇬🇭', 812: '🇨🇲',
  813: '🇳🇬', 804: '🇸🇳', 1935: '🇨🇮', 774: '🇿🇦', 783: '🇳🇿',
  805: '🇧🇪', 788: '🇨🇭', 820: '🇩🇰', 792: '🇸🇪', 8872: '🇳🇴',
  827: '🇵🇱', 816: '🇦🇹', 798: '🇨🇿', 868: '🇷🇴', 866: '🇷🇸',
  799: '🇭🇷', 840: '🇮🇷'
};

const teamNames = {
  825: { en: 'Egypt', ar: 'مصر', crest: 'https://crests.football-data.org/825.svg' },
  801: { en: 'Saudi Arabia', ar: 'السعودية', crest: 'https://crests.football-data.org/saudi_arabia.svg' },
  815: { en: 'Morocco', ar: 'المغرب', crest: 'https://crests.football-data.org/morocco.svg' },
  802: { en: 'Tunisia', ar: 'تونس', crest: 'https://crests.football-data.org/tunisia.svg' },
  778: { en: 'Algeria', ar: 'الجزائر', crest: 'https://crests.football-data.org/algeria.svg' },
  762: { en: 'Argentina', ar: 'الأرجنتين', crest: 'https://crests.football-data.org/762.png' },
  764: { en: 'Brazil', ar: 'البرازيل', crest: 'https://crests.football-data.org/764.svg' },
  759: { en: 'Germany', ar: 'ألمانيا', crest: 'https://crests.football-data.org/759.svg' },
  773: { en: 'France', ar: 'فرنسا', crest: 'https://crests.football-data.org/773.svg' },
  770: { en: 'England', ar: 'إنجلترا', crest: 'https://crests.football-data.org/770.svg' },
  760: { en: 'Spain', ar: 'إسبانيا', crest: 'https://crests.football-data.org/760.svg' },
  786: { en: 'Italy', ar: 'إيطاليا', crest: 'https://crests.football-data.org/786.svg' },
  8601: { en: 'Netherlands', ar: 'هولندا', crest: 'https://crests.football-data.org/8601.svg' },
  765: { en: 'Portugal', ar: 'البرتغال', crest: 'https://crests.football-data.org/765.svg' },
  766: { en: 'Japan', ar: 'اليابان', crest: 'https://crests.football-data.org/766.svg' },
  772: { en: 'South Korea', ar: 'كوريا', crest: 'https://crests.football-data.org/772.png' },
  769: { en: 'Mexico', ar: 'المكسيك', crest: 'https://crests.football-data.org/769.svg' },
  771: { en: 'USA', ar: 'أمريكا', crest: 'https://crests.football-data.org/usa.svg' },
  8030: { en: 'Qatar', ar: 'قطر', crest: 'https://crests.football-data.org/8030.svg' },
  779: { en: 'Australia', ar: 'أستراليا', crest: 'https://crests.football-data.org/779.svg' },
  8062: { en: 'Iraq', ar: 'العراق', crest: 'https://crests.football-data.org/iraq.svg' },
  8070: { en: 'Uzbekistan', ar: 'أوزبكستان', crest: 'https://crests.football-data.org/8070.png' },
  763: { en: 'Ghana', ar: 'غانا', crest: 'https://crests.football-data.org/ghana.svg' },
  804: { en: 'Senegal', ar: 'السنغال', crest: 'https://crests.football-data.org/senegal.svg' },
  1935: { en: 'Ivory Coast', ar: 'ساحل العاج', crest: 'https://crests.football-data.org/787.svg' },
  774: { en: 'South Africa', ar: 'جنوب أفريقيا', crest: 'https://crests.football-data.org/9396.svg' },
  783: { en: 'New Zealand', ar: 'نيوزيلندا', crest: 'https://crests.football-data.org/783.svg' },
  805: { en: 'Belgium', ar: 'بلجيكا', crest: 'https://crests.football-data.org/805.svg' },
  788: { en: 'Switzerland', ar: 'سويسرا', crest: 'https://crests.football-data.org/788.svg' },
  792: { en: 'Sweden', ar: 'السويد', crest: 'https://crests.football-data.org/792.svg' },
  8872: { en: 'Norway', ar: 'النرويج', crest: 'https://crests.football-data.org/813.svg' },
  816: { en: 'Austria', ar: 'النمسا', crest: 'https://crests.football-data.org/816.svg' },
  798: { en: 'Czechia', ar: 'التشيك', crest: 'https://crests.football-data.org/798.svg' },
  799: { en: 'Croatia', ar: 'كرواتيا', crest: 'https://crests.football-data.org/799.svg' },
  840: { en: 'Iran', ar: 'إيران', crest: 'https://crests.football-data.org/iran.svg' },
  803: { en: 'Turkey', ar: 'تركيا', crest: 'https://crests.football-data.org/803.svg' },
  1060: { en: 'Bosnia', ar: 'البوسنة', crest: 'https://crests.football-data.org/bosnia.svg' },
  1836: { en: 'Panama', ar: 'بنما', crest: 'https://crests.football-data.org/panama.svg' },
  828: { en: 'Canada', ar: 'كندا', crest: 'https://crests.football-data.org/canada.svg' },
  8049: { en: 'Jordan', ar: 'الأردن', crest: 'https://crests.football-data.org/8049.png' },
  8601: { en: 'Netherlands', ar: 'هولندا', crest: 'https://crests.football-data.org/8601.svg' },
  8873: { en: 'Scotland', ar: 'اسكتلندا', crest: 'https://crests.football-data.org/814.svg' },
  9460: { en: 'Curaçao', ar: 'كوراساو', crest: 'https://crests.football-data.org/curacao.svg' },
  1930: { en: 'Cape Verde', ar: 'الرأس الأخضر', crest: 'https://crests.football-data.org/cape_verde.svg' },
  1934: { en: 'Congo DR', ar: 'الكونغو', crest: 'https://crests.football-data.org/congo_dr.svg' },
  836: { en: 'Haiti', ar: 'هايتي', crest: 'https://crests.football-data.org/haiti.svg' }
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
