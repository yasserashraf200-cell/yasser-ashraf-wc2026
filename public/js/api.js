const API_BASE = '/api';

const teamsData = {
  769: { en: 'Mexico', ar: 'المكسيك', emoji: '🇲🇽', group: 'A' },
  772: { en: 'South Korea', ar: 'كوريا الجنوبية', emoji: '🇰🇷', group: 'A' },
  774: { en: 'South Africa', ar: 'جنوب أفريقيا', emoji: '🇿🇦', group: 'A' },
  798: { en: 'Czechia', ar: 'التشيك', emoji: '🇨🇿', group: 'A' },
  828: { en: 'Canada', ar: 'كندا', emoji: '🇨🇦', group: 'B' },
  788: { en: 'Switzerland', ar: 'سويسرا', emoji: '🇨🇭', group: 'B' },
  8030: { en: 'Qatar', ar: 'قطر', emoji: '🇶🇦', group: 'B' },
  1060: { en: 'Bosnia-Herzegovina', ar: 'البوسنة والهرسك', emoji: '🇧🇦', group: 'B' },
  764: { en: 'Brazil', ar: 'البرازيل', emoji: '🇧🇷', group: 'C' },
  815: { en: 'Morocco', ar: 'المغرب', emoji: '🇲🇦', group: 'C' },
  8873: { en: 'Scotland', ar: 'اسكتلندا', emoji: '🏴󠁧󠁢󠁳󠁣󠁴󠁿', group: 'C' },
  836: { en: 'Haiti', ar: 'هايتي', emoji: '🇭🇹', group: 'C' },
  771: { en: 'United States', ar: 'أمريكا', emoji: '🇺🇸', group: 'D' },
  761: { en: 'Paraguay', ar: 'باراغواي', emoji: '🇵🇾', group: 'D' },
  779: { en: 'Australia', ar: 'أستراليا', emoji: '🇦🇺', group: 'D' },
  803: { en: 'Turkey', ar: 'تركيا', emoji: '🇹🇷', group: 'D' },
  759: { en: 'Germany', ar: 'ألمانيا', emoji: '🇩🇪', group: 'E' },
  791: { en: 'Ecuador', ar: 'إكوادور', emoji: '🇪🇨', group: 'E' },
  1935: { en: 'Ivory Coast', ar: 'ساحل العاج', emoji: '🇨🇮', group: 'E' },
  9460: { en: 'Curaçao', ar: 'كوراساو', emoji: '🇨🇼', group: 'E' },
  8601: { en: 'Netherlands', ar: 'هولندا', emoji: '🇳🇱', group: 'F' },
  766: { en: 'Japan', ar: 'اليابان', emoji: '🇯🇵', group: 'F' },
  802: { en: 'Tunisia', ar: 'تونس', emoji: '🇹🇳', group: 'F' },
  792: { en: 'Sweden', ar: 'السويد', emoji: '🇸🇪', group: 'F' },
  805: { en: 'Belgium', ar: 'بلجيكا', emoji: '🇧🇪', group: 'G' },
  825: { en: 'Egypt', ar: 'مصر', emoji: '🇪🇬', group: 'G' },
  840: { en: 'IR Iran', ar: 'إيران', emoji: '🇮🇷', group: 'G' },
  783: { en: 'New Zealand', ar: 'نيوزيلندا', emoji: '🇳🇿', group: 'G' },
  760: { en: 'Spain', ar: 'إسبانيا', emoji: '🇪🇸', group: 'H' },
  1930: { en: 'Cape Verde', ar: 'الرأس الأخضر', emoji: '🇨🇻', group: 'H' },
  801: { en: 'Saudi Arabia', ar: 'السعودية', emoji: '🇸🇦', group: 'H' },
  758: { en: 'Uruguay', ar: 'أوروغواي', emoji: '🇺🇾', group: 'H' },
  773: { en: 'France', ar: 'فرنسا', emoji: '🇫🇷', group: 'I' },
  804: { en: 'Senegal', ar: 'السنغال', emoji: '🇸🇳', group: 'I' },
  8062: { en: 'Iraq', ar: 'العراق', emoji: '🇮🇶', group: 'I' },
  8872: { en: 'Norway', ar: 'النرويج', emoji: '🇳🇴', group: 'I' },
  762: { en: 'Argentina', ar: 'الأرجنتين', emoji: '🇦🇷', group: 'J' },
  816: { en: 'Austria', ar: 'النمسا', emoji: '🇦🇹', group: 'J' },
  778: { en: 'Algeria', ar: 'الجزائر', emoji: '🇩🇿', group: 'J' },
  8049: { en: 'Jordan', ar: 'الأردن', emoji: '🇯🇴', group: 'J' },
  765: { en: 'Portugal', ar: 'البرتغال', emoji: '🇵🇹', group: 'K' },
  818: { en: 'Colombia', ar: 'كولومبيا', emoji: '🇨🇴', group: 'K' },
  8070: { en: 'Uzbekistan', ar: 'أوزبكستان', emoji: '🇺🇿', group: 'K' },
  1934: { en: 'Congo DR', ar: 'الكونغو الديمقراطية', emoji: '🇨🇩', group: 'K' },
  770: { en: 'England', ar: 'إنجلترا', emoji: '🏴󠁧󠁢󠁥󠁮󠁧󠁿', group: 'L' },
  799: { en: 'Croatia', ar: 'كرواتيا', emoji: '🇭🇷', group: 'L' },
  763: { en: 'Ghana', ar: 'غانا', emoji: '🇬🇭', group: 'L' },
  1836: { en: 'Panama', ar: 'بنما', emoji: '🇵🇦', group: 'L' }
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

function getTeamFlag(teamId) {
  const team = teamsData[teamId];
  return team ? team.emoji : '⚽';
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
