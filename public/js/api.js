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
  773: { en: 'Egypt', ar: 'مصر' },
  778: { en: 'Saudi Arabia', ar: 'السعودية' },
  792: { en: 'Morocco', ar: 'المغرب' },
  790: { en: 'Tunisia', ar: 'تونس' },
  789: { en: 'Algeria', ar: 'الجزائر' },
  783: { en: 'Argentina', ar: 'الأرجنتين' },
  772: { en: 'Brazil', ar: 'البرازيل' },
  762: { en: 'Germany', ar: 'ألمانيا' },
  771: { en: 'France', ar: 'فرنسا' },
  770: { en: 'England', ar: 'إنجلترا' },
  769: { en: 'Spain', ar: 'إسبانيا' },
  784: { en: 'Italy', ar: 'إيطاليا' },
  786: { en: 'Netherlands', ar: 'هولندا' },
  785: { en: 'Portugal', ar: 'البرتغال' },
  782: { en: 'Japan', ar: 'اليابان' },
  780: { en: 'South Korea', ar: 'كوريا' },
  768: { en: 'Mexico', ar: 'المكسيك' },
  767: { en: 'USA', ar: 'أمريكا' },
  794: { en: 'UAE', ar: 'الإمارات' },
  791: { en: 'Qatar', ar: 'قطر' },
  793: { en: 'Australia', ar: 'أستراليا' },
  796: { en: 'Iraq', ar: 'العراق' },
  797: { en: 'Uzbekistan', ar: 'أوزبكستان' },
  811: { en: 'Ghana', ar: 'غانا' },
  812: { en: 'Cameroon', ar: 'الكاميرون' },
  813: { en: 'Nigeria', ar: 'نيجيريا' },
  814: { en: 'Senegal', ar: 'السنغال' },
  815: { en: 'Ivory Coast', ar: 'ساحل العاج' },
  816: { en: 'South Africa', ar: 'جنوب أفريقيا' },
  820: { en: 'New Zealand', ar: 'نيوزيلندا' },
  1882: { en: 'Belgium', ar: 'بلجيكا' },
  1883: { en: 'Switzerland', ar: 'سويسرا' },
  1884: { en: 'Denmark', ar: 'الدنمارك' },
  1885: { en: 'Sweden', ar: 'السويد' },
  1886: { en: 'Norway', ar: 'النرويج' },
  1887: { en: 'Poland', ar: 'بولندا' },
  1888: { en: 'Austria', ar: 'النمسا' },
  1889: { en: 'Czechia', ar: 'التشيك' },
  1890: { en: 'Romania', ar: 'رومانيا' },
  1891: { en: 'Serbia', ar: 'صربيا' },
  1892: { en: 'Croatia', ar: 'كرواتيا' },
  781: { en: 'Iran', ar: 'إيران' },
  790: { en: 'Tunisia', ar: 'تونس' }
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

function getTeamName(teamId, lang) {
  const names = teamNames[teamId];
  if (!names) return 'Unknown';
  return names[lang] || names.en;
}
