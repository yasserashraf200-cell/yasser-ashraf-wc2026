const API_BASE = '/api';

const teamsData = {
  825: { en: 'Egypt', ar: 'مصر', emoji: '🇪🇬' },
  801: { en: 'Saudi Arabia', ar: 'السعودية', emoji: '🇸🇦' },
  815: { en: 'Morocco', ar: 'المغرب', emoji: '🇲🇦' },
  802: { en: 'Tunisia', ar: 'تونس', emoji: '🇹🇳' },
  778: { en: 'Algeria', ar: 'الجزائر', emoji: '🇩🇿' },
  762: { en: 'Argentina', ar: 'الأرجنتين', emoji: '🇦🇷' },
  764: { en: 'Brazil', ar: 'البرازيل', emoji: '🇧🇷' },
  759: { en: 'Germany', ar: 'ألمانيا', emoji: '🇩🇪' },
  773: { en: 'France', ar: 'فرنسا', emoji: '🇫🇷' },
  770: { en: 'England', ar: 'إنجلترا', emoji: '🏴󠁧󠁢󠁥󠁮󠁧󠁿' },
  760: { en: 'Spain', ar: 'إسبانيا', emoji: '🇪🇸' },
  786: { en: 'Italy', ar: 'إيطاليا', emoji: '🇮🇹' },
  8601: { en: 'Netherlands', ar: 'هولندا', emoji: '🇳🇱' },
  765: { en: 'Portugal', ar: 'البرتغال', emoji: '🇵🇹' },
  766: { en: 'Japan', ar: 'اليابان', emoji: '🇯🇵' },
  772: { en: 'South Korea', ar: 'كوريا الجنوبية', emoji: '🇰🇷' },
  769: { en: 'Mexico', ar: 'المكسيك', emoji: '🇲🇽' },
  771: { en: 'USA', ar: 'أمريكا', emoji: '🇺🇸' },
  8030: { en: 'Qatar', ar: 'قطر', emoji: '🇶🇦' },
  779: { en: 'Australia', ar: 'أستراليا', emoji: '🇦🇺' },
  8062: { en: 'Iraq', ar: 'العراق', emoji: '🇮🇶' },
  840: { en: 'Iran', ar: 'إيران', emoji: '🇮🇷' },
  805: { en: 'Belgium', ar: 'بلجيكا', emoji: '🇧🇪' },
  788: { en: 'Switzerland', ar: 'سويسرا', emoji: '🇨🇭' },
  799: { en: 'Croatia', ar: 'كرواتيا', emoji: '🇭🇷' },
  792: { en: 'Sweden', ar: 'السويد', emoji: '🇸🇪' },
  804: { en: 'Senegal', ar: 'السنغال', emoji: '🇸🇳' },
  763: { en: 'Ghana', ar: 'غانا', emoji: '🇬🇭' },
  812: { en: 'Cameroon', ar: 'الكاميرون', emoji: '🇨🇲' },
  813: { en: 'Nigeria', ar: 'نيجيريا', emoji: '🇳🇬' },
  1935: { en: 'Ivory Coast', ar: 'ساحل العاج', emoji: '🇨🇮' },
  774: { en: 'South Africa', ar: 'جنوب أفريقيا', emoji: '🇿🇦' },
  783: { en: 'New Zealand', ar: 'نيوزيلندا', emoji: '🇳🇿' },
  827: { en: 'Poland', ar: 'بولندا', emoji: '🇵🇱' },
  816: { en: 'Austria', ar: 'النمسا', emoji: '🇦🇹' },
  798: { en: 'Czechia', ar: 'التشيك', emoji: '🇨🇿' },
  866: { en: 'Serbia', ar: 'صربيا', emoji: '🇷🇸' },
  8872: { en: 'Norway', ar: 'النرويج', emoji: '🇳🇴' },
  820: { en: 'Denmark', ar: 'الدنمارك', emoji: '🇩🇰' },
  803: { en: 'Turkey', ar: 'تركيا', emoji: '🇹🇷' },
  758: { en: 'Uruguay', ar: 'أوروغواي', emoji: '🇺🇾' },
  818: { en: 'Colombia', ar: 'كولومبيا', emoji: '🇨🇴' },
  791: { en: 'Ecuador', ar: 'إكوادور', emoji: '🇪🇨' },
  761: { en: 'Paraguay', ar: 'باراغواي', emoji: '🇵🇾' },
  828: { en: 'Canada', ar: 'كندا', emoji: '🇨🇦' },
  1836: { en: 'Panama', ar: 'بنما', emoji: '🇵🇦' },
  836: { en: 'Haiti', ar: 'هايتي', emoji: '🇭🇹' },
  8049: { en: 'Jordan', ar: 'الأردن', emoji: '🇯🇴' },
  8070: { en: 'Uzbekistan', ar: 'أوزبكستان', emoji: '🇺🇿' },
  1060: { en: 'Bosnia', ar: 'البوسنة', emoji: '🇧🇦' },
  1930: { en: 'Cape Verde', ar: 'الرأس الأخضر', emoji: '🇨🇻' },
  1934: { en: 'Congo DR', ar: 'الكونغو الديمقراطية', emoji: '🇨🇩' },
  9460: { en: 'Curaçao', ar: 'كوراساو', emoji: '🇨🇼' },
  8873: { en: 'Scotland', ar: 'اسكتلندا', emoji: '🏴󠁧󠁢󠁳󠁣󠁴󠁿' }
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
  const team = teamsData[teamId];
  if (team) return team.emoji;
  return '⚽';
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
