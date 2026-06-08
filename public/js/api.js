const API_BASE = '/api';

const teamsData = {
  'Mexico': { ar: 'المكسيك', emoji: '🇲🇽', group: 'A', id: 769 },
  'South Korea': { ar: 'كوريا الجنوبية', emoji: '🇰🇷', group: 'A', id: 772 },
  'South Africa': { ar: 'جنوب أفريقيا', emoji: '🇿🇦', group: 'A', id: 774 },
  'Czechia': { ar: 'التشيك', emoji: '🇨🇿', group: 'A', id: 798 },
  'Canada': { ar: 'كندا', emoji: '🇨🇦', group: 'B', id: 828 },
  'Switzerland': { ar: 'سويسرا', emoji: '🇨🇭', group: 'B', id: 788 },
  'Qatar': { ar: 'قطر', emoji: '🇶🇦', group: 'B', id: 8030 },
  'Bosnia-Herzegovina': { ar: 'البوسنة والهرسك', emoji: '🇧🇦', group: 'B', id: 1060 },
  'Brazil': { ar: 'البرازيل', emoji: '🇧🇷', group: 'C', id: 764 },
  'Morocco': { ar: 'المغرب', emoji: '🇲🇦', group: 'C', id: 815 },
  'Scotland': { ar: 'اسكتلندا', emoji: '🏴󠁧󠁢󠁳󠁣󠁴󠁿', group: 'C', id: 8873 },
  'Haiti': { ar: 'هايتي', emoji: '🇭🇹', group: 'C', id: 836 },
  'United States': { ar: 'أمريكا', emoji: '🇺🇸', group: 'D', id: 771 },
  'Paraguay': { ar: 'باراغواي', emoji: '🇵🇾', group: 'D', id: 761 },
  'Australia': { ar: 'أستراليا', emoji: '🇦🇺', group: 'D', id: 779 },
  'Turkey': { ar: 'تركيا', emoji: '🇹🇷', group: 'D', id: 803 },
  'Germany': { ar: 'ألمانيا', emoji: '🇩🇪', group: 'E', id: 759 },
  'Ecuador': { ar: 'إكوادور', emoji: '🇪🇨', group: 'E', id: 791 },
  'Ivory Coast': { ar: 'ساحل العاج', emoji: '🇨🇮', group: 'E', id: 1935 },
  'Curaçao': { ar: 'كوراساو', emoji: '🇨🇼', group: 'E', id: 9460 },
  'Netherlands': { ar: 'هولندا', emoji: '🇳🇱', group: 'F', id: 8601 },
  'Japan': { ar: 'اليابان', emoji: '🇯🇵', group: 'F', id: 766 },
  'Tunisia': { ar: 'تونس', emoji: '🇹🇳', group: 'F', id: 802 },
  'Sweden': { ar: 'السويد', emoji: '🇸🇪', group: 'F', id: 792 },
  'Belgium': { ar: 'بلجيكا', emoji: '🇧🇪', group: 'G', id: 805 },
  'Egypt': { ar: 'مصر', emoji: '🇪🇬', group: 'G', id: 825 },
  'IR Iran': { ar: 'إيران', emoji: '🇮🇷', group: 'G', id: 840 },
  'New Zealand': { ar: 'نيوزيلندا', emoji: '🇳🇿', group: 'G', id: 783 },
  'Spain': { ar: 'إسبانيا', emoji: '🇪🇸', group: 'H', id: 760 },
  'Cape Verde': { ar: 'الرأس الأخضر', emoji: '🇨🇻', group: 'H', id: 1930 },
  'Saudi Arabia': { ar: 'السعودية', emoji: '🇸🇦', group: 'H', id: 801 },
  'Uruguay': { ar: 'أوروغواي', emoji: '🇺🇾', group: 'H', id: 758 },
  'France': { ar: 'فرنسا', emoji: '🇫🇷', group: 'I', id: 773 },
  'Senegal': { ar: 'السنغال', emoji: '🇸🇳', group: 'I', id: 804 },
  'Iraq': { ar: 'العراق', emoji: '🇮🇶', group: 'I', id: 8062 },
  'Norway': { ar: 'النرويج', emoji: '🇳🇴', group: 'I', id: 8872 },
  'Argentina': { ar: 'الأرجنتين', emoji: '🇦🇷', group: 'J', id: 762 },
  'Austria': { ar: 'النمسا', emoji: '🇦🇹', group: 'J', id: 816 },
  'Algeria': { ar: 'الجزائر', emoji: '🇩🇿', group: 'J', id: 778 },
  'Jordan': { ar: 'الأردن', emoji: '🇯🇴', group: 'J', id: 8049 },
  'Portugal': { ar: 'البرتغال', emoji: '🇵🇹', group: 'K', id: 765 },
  'Colombia': { ar: 'كولومبيا', emoji: '🇨🇴', group: 'K', id: 818 },
  'Uzbekistan': { ar: 'أوزبكستان', emoji: '🇺🇿', group: 'K', id: 8070 },
  'Congo DR': { ar: 'الكونغو الديمقراطية', emoji: '🇨🇩', group: 'K', id: 1934 },
  'England': { ar: 'إنجلترا', emoji: '🏴󠁧󠁢󠁥󠁮󠁧󠁿', group: 'L', id: 770 },
  'Croatia': { ar: 'كرواتيا', emoji: '🇭🇷', group: 'L', id: 799 },
  'Ghana': { ar: 'غانا', emoji: '🇬🇭', group: 'L', id: 763 },
  'Panama': { ar: 'بنما', emoji: '🇵🇦', group: 'L', id: 1836 }
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
  for (const key in teamsData) {
    if (teamsData[key].id === teamId) return teamsData[key].emoji;
  }
  return '⚽';
}

function getTeamName(teamId, lang) {
  for (const key in teamsData) {
    if (teamsData[key].id === teamId) {
      return lang === 'ar' ? teamsData[key].ar : key;
    }
  }
  return 'Unknown';
}

function getTeamNameAr(teamId) {
  for (const key in teamsData) {
    if (teamsData[key].id === teamId) return teamsData[key].ar;
  }
  return '';
}

function getTeamNameEn(teamId) {
  for (const key in teamsData) {
    if (teamsData[key].id === teamId) return key;
  }
  return '';
}

function getTeamGroup(teamId) {
  for (const key in teamsData) {
    if (teamsData[key].id === teamId) return teamsData[key].group;
  }
  return '';
}
