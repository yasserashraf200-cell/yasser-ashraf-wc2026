const API_BASE = '/api';

const teamFlags = {
  773: '🇪🇬', 778: '🇸🇦', 792: '🇲🇦', 790: '🇹🇳', 789: '🇩🇿',
  783: '🇦🇷', 772: '🇧🇷', 762: '🇩🇪', 771: '🇫🇷', 770: '🏴󠁧󠁢󠁥󠁮󠁧󠁿',
  769: '🇪🇸', 784: '🇮🇹', 786: '🇳🇱', 785: '🇵🇹', 782: '🇯🇵',
  780: '🇰🇷', 768: '🇲🇽', 767: '🇺🇸', 794: '🇦🇪', 791: '🇶🇦',
  793: '🇦🇺', 796: '🇮🇶', 797: '🇺🇿', 811: '🇬🇭', 812: '🇨🇲',
  813: '🇳🇬', 814: '🇸🇳', 815: '🇨🇮', 816: '🇿🇦', 820: '🇳🇿',
  1882: '🇧🇪', 1883: '🇨🇭', 1884: '🇩🇰', 1885: '🇸🇪', 1886: '🇳🇴',
  1887: '🇵🇱', 1888: '🇦🇹', 1889: '🇨🇿', 1890: '🇷🇴', 1891: '🇷🇸',
  1892: '🇭🇷', 781: '🇮🇷'
};

const teamNames = {
  773: { en: 'Egypt', ar: 'مصر', crest: 'https://crests.football-data.org/773.png' },
  778: { en: 'Saudi Arabia', ar: 'السعودية', crest: 'https://crests.football-data.org/778.png' },
  792: { en: 'Morocco', ar: 'المغرب', crest: 'https://crests.football-data.org/792.png' },
  790: { en: 'Tunisia', ar: 'تونس', crest: 'https://crests.football-data.org/790.png' },
  789: { en: 'Algeria', ar: 'الجزائر', crest: 'https://crests.football-data.org/789.png' },
  783: { en: 'Argentina', ar: 'الأرجنتين', crest: 'https://crests.football-data.org/783.png' },
  772: { en: 'Brazil', ar: 'البرازيل', crest: 'https://crests.football-data.org/772.png' },
  762: { en: 'Germany', ar: 'ألمانيا', crest: 'https://crests.football-data.org/762.png' },
  771: { en: 'France', ar: 'فرنسا', crest: 'https://crests.football-data.org/771.png' },
  770: { en: 'England', ar: 'إنجلترا', crest: 'https://crests.football-data.org/770.png' },
  769: { en: 'Spain', ar: 'إسبانيا', crest: 'https://crests.football-data.org/769.png' },
  784: { en: 'Italy', ar: 'إيطاليا', crest: 'https://crests.football-data.org/784.png' },
  786: { en: 'Netherlands', ar: 'هولندا', crest: 'https://crests.football-data.org/786.png' },
  785: { en: 'Portugal', ar: 'البرتغال', crest: 'https://crests.football-data.org/785.png' },
  782: { en: 'Japan', ar: 'اليابان', crest: 'https://crests.football-data.org/782.png' },
  780: { en: 'South Korea', ar: 'كوريا', crest: 'https://crests.football-data.org/780.png' },
  768: { en: 'Mexico', ar: 'المكسيك', crest: 'https://crests.football-data.org/768.png' },
  767: { en: 'USA', ar: 'أمريكا', crest: 'https://crests.football-data.org/767.png' },
  794: { en: 'UAE', ar: 'الإمارات', crest: 'https://crests.football-data.org/794.png' },
  791: { en: 'Qatar', ar: 'قطر', crest: 'https://crests.football-data.org/791.png' },
  793: { en: 'Australia', ar: 'أستراليا', crest: 'https://crests.football-data.org/793.png' },
  796: { en: 'Iraq', ar: 'العراق', crest: 'https://crests.football-data.org/796.png' },
  797: { en: 'Uzbekistan', ar: 'أوزبكستان', crest: 'https://crests.football-data.org/797.png' },
  811: { en: 'Ghana', ar: 'غانا', crest: 'https://crests.football-data.org/811.png' },
  812: { en: 'Cameroon', ar: 'الكاميرون', crest: 'https://crests.football-data.org/812.png' },
  813: { en: 'Nigeria', ar: 'نيجيريا', crest: 'https://crests.football-data.org/813.png' },
  814: { en: 'Senegal', ar: 'السنغال', crest: 'https://crests.football-data.org/814.png' },
  815: { en: 'Ivory Coast', ar: 'ساحل العاج', crest: 'https://crests.football-data.org/815.png' },
  816: { en: 'South Africa', ar: 'جنوب أفريقيا', crest: 'https://crests.football-data.org/816.png' },
  820: { en: 'New Zealand', ar: 'نيوزيلندا', crest: 'https://crests.football-data.org/820.png' },
  1882: { en: 'Belgium', ar: 'بلجيكا', crest: 'https://crests.football-data.org/1882.png' },
  1883: { en: 'Switzerland', ar: 'سويسرا', crest: 'https://crests.football-data.org/1883.png' },
  1884: { en: 'Denmark', ar: 'الدنمارك', crest: 'https://crests.football-data.org/1884.png' },
  1885: { en: 'Sweden', ar: 'السويد', crest: 'https://crests.football-data.org/1885.png' },
  1886: { en: 'Norway', ar: 'النرويج', crest: 'https://crests.football-data.org/1886.png' },
  1887: { en: 'Poland', ar: 'بولندا', crest: 'https://crests.football-data.org/1887.png' },
  1888: { en: 'Austria', ar: 'النمسا', crest: 'https://crests.football-data.org/1888.png' },
  1889: { en: 'Czechia', ar: 'التشيك', crest: 'https://crests.football-data.org/1889.png' },
  1890: { en: 'Romania', ar: 'رومانيا', crest: 'https://crests.football-data.org/1890.png' },
  1891: { en: 'Serbia', ar: 'صربيا', crest: 'https://crests.football-data.org/1891.png' },
  1892: { en: 'Croatia', ar: 'كرواتيا', crest: 'https://crests.football-data.org/1892.png' },
  781: { en: 'Iran', ar: 'إيران', crest: 'https://crests.football-data.org/781.png' }
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
