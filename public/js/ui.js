let currentPage = 'matches';
let currentFilter = 'all';
let currentGroup = 'all';
let allMatches = [];
let allTeams = [];
let selectedTeams = JSON.parse(localStorage.getItem('selectedTeams')) || [];

const groupsData = {
  'A': [
    { id: 769, emoji: '🇲🇽', ar: 'المكسيك', en: 'Mexico' },
    { id: 772, emoji: '🇰🇷', ar: 'كوريا الجنوبية', en: 'South Korea' },
    { id: 774, emoji: '🇿🇦', ar: 'جنوب أفريقيا', en: 'South Africa' },
    { id: 798, emoji: '🇨🇿', ar: 'التشيك', en: 'Czechia' }
  ],
  'B': [
    { id: 828, emoji: '🇨🇦', ar: 'كندا', en: 'Canada' },
    { id: 788, emoji: '🇨🇭', ar: 'سويسرا', en: 'Switzerland' },
    { id: 8030, emoji: '🇶🇦', ar: 'قطر', en: 'Qatar' },
    { id: 1060, emoji: '🇧🇦', ar: 'البوسنة والهرسك', en: 'Bosnia-Herzegovina' }
  ],
  'C': [
    { id: 764, emoji: '🇧🇷', ar: 'البرازيل', en: 'Brazil' },
    { id: 815, emoji: '🇲🇦', ar: 'المغرب', en: 'Morocco' },
    { id: 8873, emoji: '🏴󠁧󠁢󠁳󠁣󠁴󠁿', ar: 'اسكتلندا', en: 'Scotland' },
    { id: 836, emoji: '🇭🇹', ar: 'هايتي', en: 'Haiti' }
  ],
  'D': [
    { id: 771, emoji: '🇺🇸', ar: 'أمريكا', en: 'United States' },
    { id: 761, emoji: '🇵🇾', ar: 'باراغواي', en: 'Paraguay' },
    { id: 779, emoji: '🇦🇺', ar: 'أستراليا', en: 'Australia' },
    { id: 803, emoji: '🇹🇷', ar: 'تركيا', en: 'Turkey' }
  ],
  'E': [
    { id: 759, emoji: '🇩🇪', ar: 'ألمانيا', en: 'Germany' },
    { id: 791, emoji: '🇪🇨', ar: 'إكوادور', en: 'Ecuador' },
    { id: 1935, emoji: '🇨🇮', ar: 'ساحل العاج', en: 'Ivory Coast' },
    { id: 9460, emoji: '🇨🇼', ar: 'كوراساو', en: 'Curaçao' }
  ],
  'F': [
    { id: 8601, emoji: '🇳🇱', ar: 'هولندا', en: 'Netherlands' },
    { id: 766, emoji: '🇯🇵', ar: 'اليابان', en: 'Japan' },
    { id: 792, emoji: '🇸🇪', ar: 'السويد', en: 'Sweden' },
    { id: 802, emoji: '🇹🇳', ar: 'تونس', en: 'Tunisia' }
  ],
  'G': [
    { id: 805, emoji: '🇧🇪', ar: 'بلجيكا', en: 'Belgium' },
    { id: 825, emoji: '🇪🇬', ar: 'مصر', en: 'Egypt' },
    { id: 840, emoji: '🇮🇷', ar: 'إيران', en: 'IR Iran' },
    { id: 783, emoji: '🇳🇿', ar: 'نيوزيلندا', en: 'New Zealand' }
  ],
  'H': [
    { id: 760, emoji: '🇪🇸', ar: 'إسبانيا', en: 'Spain' },
    { id: 1930, emoji: '🇨🇻', ar: 'الرأس الأخضر', en: 'Cape Verde' },
    { id: 801, emoji: '🇸🇦', ar: 'السعودية', en: 'Saudi Arabia' },
    { id: 758, emoji: '🇺🇾', ar: 'أوروغواي', en: 'Uruguay' }
  ],
  'I': [
    { id: 773, emoji: '🇫🇷', ar: 'فرنسا', en: 'France' },
    { id: 804, emoji: '🇸🇳', ar: 'السنغال', en: 'Senegal' },
    { id: 8062, emoji: '🇮🇶', ar: 'العراق', en: 'Iraq' },
    { id: 8872, emoji: '🇳🇴', ar: 'النرويج', en: 'Norway' }
  ],
  'J': [
    { id: 762, emoji: '🇦🇷', ar: 'الأرجنتين', en: 'Argentina' },
    { id: 816, emoji: '🇦🇹', ar: 'النمسا', en: 'Austria' },
    { id: 778, emoji: '🇩🇿', ar: 'الجزائر', en: 'Algeria' },
    { id: 8049, emoji: '🇯🇴', ar: 'الأردن', en: 'Jordan' }
  ],
  'K': [
    { id: 765, emoji: '🇵🇹', ar: 'البرتغال', en: 'Portugal' },
    { id: 818, emoji: '🇨🇴', ar: 'كولومبيا', en: 'Colombia' },
    { id: 8070, emoji: '🇺🇿', ar: 'أوزبكستان', en: 'Uzbekistan' },
    { id: 1934, emoji: '🇨🇩', ar: 'الكونغو الديمقراطية', en: 'Congo DR' }
  ],
  'L': [
    { id: 770, emoji: '🏴󠁧󠁢󠁥󠁮󠁧󠁿', ar: 'إنجلترا', en: 'England' },
    { id: 799, emoji: '🇭🇷', ar: 'كرواتيا', en: 'Croatia' },
    { id: 763, emoji: '🇬🇭', ar: 'غانا', en: 'Ghana' },
    { id: 1836, emoji: '🇵🇦', ar: 'بنما', en: 'Panama' }
  ]
};

function showPage(page) {
  currentPage = page;
  document.querySelectorAll('.page').forEach(p => p.classList.remove('active'));
  document.getElementById(`${page}Page`).classList.add('active');
  document.querySelectorAll('.nav-btn').forEach(btn => btn.classList.remove('active'));
  document.querySelector(`[data-page="${page}"]`).classList.add('active');
  if (page === 'matches') loadMatches();
  if (page === 'groups') renderGroups();
  if (page === 'notifications') loadNotifications();
}

function filterMatches(filter) {
  currentFilter = filter;
  document.querySelectorAll('.tab').forEach(t => t.classList.remove('active'));
  event.target.classList.add('active');
  renderMatches();
}

function filterByGroup(group) {
  currentGroup = group;
  document.querySelectorAll('.group-tab').forEach(t => t.classList.remove('active'));
  event.target.classList.add('active');
  renderMatches();
}

function renderGroups() {
  const container = document.getElementById('groupsContainer');
  if (!container) return;
  const lang = currentLang || 'ar';
  let html = '';
  for (const group in groupsData) {
    const teams = groupsData[group];
    html += `
      <div class="group-card">
        <div class="group-header">
          <span class="group-letter">${group}</span>
          <span class="group-title">${lang === 'ar' ? 'المجموعة' : 'Group'} ${group}</span>
        </div>
        <div class="group-teams">
          ${teams.map(team => `
            <div class="group-team-row">
              <span class="group-team-emoji">${team.emoji}</span>
              <span class="group-team-name">${lang === 'ar' ? team.ar : team.en}</span>
            </div>
          `).join('')}
        </div>
      </div>
    `;
  }
  container.innerHTML = html;
}

function renderTeamsSelection() {
  const container = document.getElementById('teamsSelection');
  if (!container) return;
  const lang = currentLang || 'ar';
  let html = '';
  for (const group in groupsData) {
    const teams = groupsData[group];
    html += `<div class="selection-group"><div class="selection-group-title">${lang === 'ar' ? 'المجموعة' : 'Group'} ${group}</div>`;
    html += teams.map(team => `
      <div class="team-card ${selectedTeams.includes(team.id) ? 'selected' : ''}" onclick="toggleTeam(${team.id})">
        <div class="team-emoji">${team.emoji}</div>
        <div class="team-name-ar">${team.ar}</div>
        <div class="team-name-en">${team.en}</div>
        <div class="team-check">${selectedTeams.includes(team.id) ? '✓' : ''}</div>
      </div>
    `).join('');
    html += `</div>`;
  }
  container.innerHTML = html;
}

function toggleTeam(teamId) {
  const index = selectedTeams.indexOf(teamId);
  if (index === -1) {
    selectedTeams.push(teamId);
  } else {
    selectedTeams.splice(index, 1);
  }
  localStorage.setItem('selectedTeams', JSON.stringify(selectedTeams));
  renderTeamsSelection();
}

function renderMatches() {
  const container = document.getElementById('matchesList');
  if (!container) return;
  let filtered = [...allMatches];

  if (currentFilter === 'live') {
    filtered = filtered.filter(m => m.status === 'IN_PLAY' || m.status === 'PAUSED');
  } else if (currentFilter === 'upcoming') {
    filtered = filtered.filter(m => m.status === 'SCHEDULED' || m.status === 'TIMED');
  } else if (currentFilter === 'finished') {
    filtered = filtered.filter(m => m.status === 'FINISHED');
  }

  if (currentGroup !== 'all') {
    filtered = filtered.filter(m => m.group === currentGroup);
  }

  if (filtered.length === 0) {
    container.innerHTML = `
      <div class="empty-state">
        <div class="icon">⚽</div>
        <h3>${t('no_matches')}</h3>
      </div>
    `;
    return;
  }
  container.innerHTML = filtered.map(match => renderMatchCard(match)).join('');
}

function renderMatchCard(match) {
  const isLive = match.status === 'IN_PLAY' || match.status === 'PAUSED';
  const isFinished = match.status === 'FINISHED';
  const isUpcoming = match.status === 'SCHEDULED' || match.status === 'TIMED';
  const statusClass = isLive ? 'live' : isFinished ? 'finished' : 'upcoming';
  const statusText = isLive ? t('live') : isFinished ? t('finished') : t('upcoming');
  const matchDate = new Date(match.utcDate);
  const timeStr = matchDate.toLocaleTimeString(currentLang === 'ar' ? 'ar-EG' : 'en-US', { hour: '2-digit', minute: '2-digit' });
  const dateStr = matchDate.toLocaleDateString(currentLang === 'ar' ? 'ar-EG' : 'en-US', { month: 'short', day: 'numeric' });
  const groupText = match.group ? (currentLang === 'ar' ? `المجموعة ${match.group}` : `Group ${match.group}`) : match.stage;
  const events = (match.events || []).map(e => `
    <div class="event">
      <span class="icon">⚽</span>
      <span>${e.minute}' ${e.player}</span>
    </div>
  `).join('');
  const homeEmoji = getTeamFlag(match.homeTeamId);
  const awayEmoji = getTeamFlag(match.awayTeamId);
  const homeNameAr = getTeamNameAr(match.homeTeamId);
  const homeNameEn = getTeamNameEn(match.homeTeamId);
  const awayNameAr = getTeamNameAr(match.awayTeamId);
  const awayNameEn = getTeamNameEn(match.awayTeamId);
  return `
    <div class="match-card ${isLive ? 'live' : ''}">
      <div class="match-header">
        <span class="match-status ${statusClass}">${statusText}</span>
        <span class="match-group">${groupText}</span>
      </div>
      <div class="match-teams">
        <div class="team-info home">
          <span class="team-emoji-lg">${homeEmoji}</span>
          <div class="team-names">
            <span class="name-ar">${homeNameAr}</span>
            <span class="name-en">${homeNameEn}</span>
          </div>
        </div>
        <div class="score">
          ${isUpcoming ? 'VS' : `${match.homeScore} - ${match.awayScore}`}
        </div>
        <div class="team-info away">
          <div class="team-names">
            <span class="name-ar">${awayNameAr}</span>
            <span class="name-en">${awayNameEn}</span>
          </div>
          <span class="team-emoji-lg">${awayEmoji}</span>
        </div>
      </div>
      ${events ? `<div class="match-events">${events}</div>` : ''}
      <div class="match-time">
        ${isUpcoming ? `${dateStr} ${timeStr}` : isLive ? `${match.matchday ? `MD ${match.matchday}` : ''}` : `${dateStr}`}
      </div>
    </div>
  `;
}

async function loadMatches() {
  const container = document.getElementById('matchesList');
  container.innerHTML = `<div class="loading"><div class="spinner"></div></div>`;
  const matches = await fetchMatches();
  if (matches) {
    allMatches = matches;
    renderMatches();
  }
}

async function saveSelectedTeams() {
  if (selectedTeams.length === 0) {
    alert(t('select_teams_first'));
    return;
  }
  await saveUserTeams(selectedTeams);
  await registerUser();
  showPage('matches');
}

async function markAllRead() {
  await markAllNotificationsRead();
  loadNotifications();
  updateNotificationBadge();
}
