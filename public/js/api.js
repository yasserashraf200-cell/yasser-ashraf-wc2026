const API_BASE = '/api';

const teamFlags = {
  825: { flag: 'eg', name: 'Egypt', nameAr: 'مصر' },
  801: { flag: 'sa', name: 'Saudi Arabia', nameAr: 'السعودية' },
  815: { flag: 'ma', name: 'Morocco', nameAr: 'المغرب' },
  802: { flag: 'tn', name: 'Tunisia', nameAr: 'تونس' },
  778: { flag: 'dz', name: 'Algeria', nameAr: 'الجزائر' },
  762: { flag: 'ar', name: 'Argentina', nameAr: 'الأرجنتين' },
  764: { flag: 'br', name: 'Brazil', nameAr: 'البرازيل' },
  759: { flag: 'de', name: 'Germany', nameAr: 'ألمانيا' },
  773: { flag: 'fr', name: 'France', nameAr: 'فرنسا' },
  770: { flag: 'gb-eng', name: 'England', nameAr: 'إنجلترا' },
  760: { flag: 'es', name: 'Spain', nameAr: 'إسبانيا' },
  786: { flag: 'it', name: 'Italy', nameAr: 'إيطاليا' },
  8601: { flag: 'nl', name: 'Netherlands', nameAr: 'هولندا' },
  765: { flag: 'pt', name: 'Portugal', nameAr: 'البرتغال' },
  766: { flag: 'jp', name: 'Japan', nameAr: 'اليابان' },
  772: { flag: 'kr', name: 'South Korea', nameAr: 'كوريا' },
  769: { flag: 'mx', name: 'Mexico', nameAr: 'المكسيك' },
  771: { flag: 'us', name: 'USA', nameAr: 'أمريكا' },
  8030: { flag: 'qa', name: 'Qatar', nameAr: 'قطر' },
  779: { flag: 'au', name: 'Australia', nameAr: 'أستراليا' },
  8062: { flag: 'iq', name: 'Iraq', nameAr: 'العراق' },
  840: { flag: 'ir', name: 'Iran', nameAr: 'إيران' },
  805: { flag: 'be', name: 'Belgium', nameAr: 'بلجيكا' },
  788: { flag: 'ch', name: 'Switzerland', nameAr: 'سويسرا' },
  799: { flag: 'hr', name: 'Croatia', nameAr: 'كرواتيا' },
  792: { flag: 'se', name: 'Sweden', nameAr: 'السويد' },
  804: { flag: 'sn', name: 'Senegal', nameAr: 'السنغال' },
  763: { flag: 'gh', name: 'Ghana', nameAr: 'غانا' },
  812: { flag: 'cm', name: 'Cameroon', nameAr: 'الكاميرون' },
  813: { flag: 'ng', name: 'Nigeria', nameAr: 'نيجيريا' },
  1935: { flag: 'ci', name: 'Ivory Coast', nameAr: 'ساحل العاج' },
  774: { flag: 'za', name: 'South Africa', nameAr: 'جنوب أفريقيا' },
  783: { flag: 'nz', name: 'New Zealand', nameAr: 'نيوزيلندا' },
  827: { flag: 'pl', name: 'Poland', nameAr: 'بولندا' },
  816: { flag: 'at', name: 'Austria', nameAr: 'النمسا' },
  798: { flag: 'cz', name: 'Czechia', nameAr: 'التشيك' },
  866: { flag: 'rs', name: 'Serbia', nameAr: 'صربيا' },
  8872: { flag: 'no', name: 'Norway', nameAr: 'النرويج' },
  820: { flag: 'dk', name: 'Denmark', nameAr: 'الدنمارك' },
  803: { flag: 'tr', name: 'Turkey', nameAr: 'تركيا' },
  758: { flag: 'uy', name: 'Uruguay', nameAr: 'أوروغواي' },
  818: { flag: 'co', name: 'Colombia', nameAr: 'كولومبيا' },
  791: { flag: 'ec', name: 'Ecuador', nameAr: 'إكوادور' },
  761: { flag: 'py', name: 'Paraguay', nameAr: 'باراغواي' },
  828: { flag: 'ca', name: 'Canada', nameAr: 'كندا' },
  1836: { flag: 'pa', name: 'Panama', nameAr: 'بنما' },
  836: { flag: 'ht', name: 'Haiti', nameAr: 'هايتي' },
  8049: { flag: 'jo', name: 'Jordan', nameAr: 'الأردن' },
  8070: { flag: 'uz', name: 'Uzbekistan', nameAr: 'أوزبكستان' },
  1060: { flag: 'ba', name: 'Bosnia', nameAr: 'البوسنة' },
  1930: { flag: 'cv', name: 'Cape Verde', nameAr: 'الرأس الأخضر' },
  1934: { flag: 'cd', name: 'Congo DR', nameAr: 'الكونغو' },
  9460: { flag: 'cw', name: 'Curaçao', nameAr: 'كوراساو' },
  8873: { flag: 'gb-sct', name: 'Scotland', nameAr: 'اسكتلندا' }
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
  const team = teamFlags[teamId];
  if (team && team.flag) {
    return `https://flagcdn.com/w80/${team.flag}.png`;
  }
  return null;
}

function getTeamFlagEmoji(teamId) {
  const emojis = {
    825: '🇪🇬', 801: '🇸🇦', 815: '🇲🇦', 802: '🇹🇳', 778: '🇩🇿',
    762: '🇦🇷', 764: '🇧🇷', 759: '🇩🇪', 773: '🇫🇷', 770: '🏴󠁧󠁢󠁥󠁮󠁧󠁿',
    760: '🇪🇸', 786: '🇮🇹', 8601: '🇳🇱', 765: '🇵🇹', 766: '🇯🇵',
    772: '🇰🇷', 769: '🇲🇽', 771: '🇺🇸', 8030: '🇶🇦', 779: '🇦🇺',
    8062: '🇮🇶', 840: '🇮🇷', 805: '🇧🇪', 788: '🇨🇭', 799: '🇭🇷',
    792: '🇸🇪', 804: '🇸🇳', 763: '🇬🇭', 812: '🇨🇲', 813: '🇳🇬',
    1935: '🇨🇮', 774: '🇿🇦', 783: '🇳🇿', 827: '🇵🇱', 816: '🇦🇹',
    798: '🇨🇿', 866: '🇷🇸', 8872: '🇳🇴', 820: '🇩🇰', 803: '🇹🇷',
    758: '🇺🇾', 818: '🇨🇴', 791: '🇪🇨', 761: '🇵🇾', 828: '🇨🇦',
    1836: '🇵🇦', 836: '🇭🇹', 8049: '🇯🇴', 8070: '🇺🇿', 1060: '🇧🇦',
    1930: '🇨🇻', 1934: '🇨🇩', 9460: '🇨🇼', 8873: '🏴󠁧󠁢󠁳󠁣󠁴󠁿'
  };
  return emojis[teamId] || '⚽';
}

function getTeamName(teamId, lang) {
  const team = teamFlags[teamId];
  if (!team) return 'Unknown';
  return lang === 'ar' ? team.nameAr : team.name;
}
