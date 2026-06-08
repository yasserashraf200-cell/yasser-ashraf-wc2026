let currentPage = 'matches';
let currentFilter = 'all';
let currentGroup = 'all';
let allMatches = [];
let allTeams = [];
let selectedTeams = JSON.parse(localStorage.getItem('selectedTeams')) || [];

function showPage(page) {
  currentPage = page;
  document.querySelectorAll('.page').forEach(p => p.classList.remove('active'));
  document.getElementById(`${page}Page`).classList.add('active');
  document.querySelectorAll('.nav-btn').forEach(btn => btn.classList.remove('active'));
  document.querySelector(`[data-page="${page}"]`).classList.add('active');
  if (page === 'matches') loadMatches();
  if (page === 'teams') loadTeams();
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

function renderTeamsSelection() {
  const container = document.getElementById('teamsSelection');
  if (!container) return;
  container.innerHTML = allTeams.map(team => {
    const flagUrl = getTeamFlag(team.id);
    return `
    <div class="team-card ${selectedTeams.includes(team.id) ? 'selected' : ''}" onclick="toggleTeam(${team.id})">
      <div class="team-crest-container">
        ${flagUrl ? `<img src="${flagUrl}" class="team-flag-card" alt="${team.name}">` : `<span class="team-flag-emoji">${getTeamFlagEmoji(team.id)}</span>`}
      </div>
      <div class="team-name">${currentLang === 'ar' ? team.nameAr : team.name}</div>
      <div class="team-check">${selectedTeams.includes(team.id) ? '✓' : ''}</div>
    </div>
  `}).join('');
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
  updateTeamButtons();
}

function updateTeamButtons() {
  document.querySelectorAll('.all-team-card').forEach(card => {
    const teamId = parseInt(card.dataset.teamId);
    const btn = card.querySelector('.action-btn');
    if (selectedTeams.includes(teamId)) {
      btn.textContent = t('added');
      btn.classList.add('added');
    } else {
      btn.textContent = t('add');
      btn.classList.remove('added');
    }
  });
}

function renderMatches() {
  const container = document.getElementById('matchesList');
  if (!container) return;
  let filtered = [...allMatches];

  if (currentFilter === 'live') {
    filtered = filtered.filter(m => m.status === 'IN_PLAY' || m.status === 'PAUSED');
  } else if (currentFilter === 'upcoming') {
    filtered = filtered.filter(m => m.status === 'SCHEDULED');
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
  const isUpcoming = match.status === 'SCHEDULED';
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
  const homeFlag = getTeamFlag(match.homeTeamId);
  const awayFlag = getTeamFlag(match.awayTeamId);
  return `
    <div class="match-card ${isLive ? 'live' : ''}">
      <div class="match-header">
        <span class="match-status ${statusClass}">${statusText}</span>
        <span class="match-group">${groupText}</span>
      </div>
      <div class="match-teams">
        <div class="team-info home">
          ${homeFlag ? `<img class="team-flag-img" src="${homeFlag}" alt="">` : `<span class="flag-emoji">${getTeamFlagEmoji(match.homeTeamId)}</span>`}
          <span class="name">${currentLang === 'ar' ? match.homeTeamNameAr : match.homeTeamName}</span>
        </div>
        <div class="score">
          ${isUpcoming ? 'VS' : `${match.homeScore} - ${match.awayScore}`}
        </div>
        <div class="team-info away">
          <span class="name">${currentLang === 'ar' ? match.awayTeamNameAr : match.awayTeamName}</span>
          ${awayFlag ? `<img class="team-flag-img" src="${awayFlag}" alt="">` : `<span class="flag-emoji">${getTeamFlagEmoji(match.awayTeamId)}</span>`}
        </div>
      </div>
      ${events ? `<div class="match-events">${events}</div>` : ''}
      <div class="match-time">
        ${isUpcoming ? `${dateStr} ${timeStr}` : isLive ? `${match.matchday ? `MD ${match.matchday}` : ''}` : `${dateStr}`}
      </div>
    </div>
  `;
}

function renderYourTeams() {
  const container = document.getElementById('yourTeams');
  if (!container) return;
  if (selectedTeams.length === 0) {
    container.innerHTML = `<p style="color: var(--text-secondary)">${t('select_teams_first')}</p>`;
    return;
  }
  container.innerHTML = selectedTeams.map(teamId => {
    const flagUrl = getTeamFlag(teamId);
    return `
    <div class="your-team-tag">
      ${flagUrl ? `<img src="${flagUrl}" class="team-flag-tag" alt="">` : `<span>${getTeamFlagEmoji(teamId)}</span>`}
      <span>${getTeamName(teamId, currentLang)}</span>
    </div>
  `}).join('');
}

function renderAllTeams() {
  const container = document.getElementById('allTeams');
  if (!container) return;
  container.innerHTML = allTeams.map(team => {
    const flagUrl = getTeamFlag(team.id);
    return `
    <div class="all-team-card" data-team-id="${team.id}">
      <div class="team-left">
        ${flagUrl ? `<img src="${flagUrl}" class="team-flag-img" alt="">` : `<span class="flag-emoji">${getTeamFlagEmoji(team.id)}</span>`}
        <span class="name">${currentLang === 'ar' ? team.nameAr : team.name}</span>
      </div>
      <button class="action-btn ${selectedTeams.includes(team.id) ? 'added' : ''}" onclick="toggleTeam(${team.id})">
        ${selectedTeams.includes(team.id) ? t('added') : t('add')}
      </button>
    </div>
  `}).join('');
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

async function loadTeams() {
  const teams = await fetchTeams();
  if (teams) {
    allTeams = teams;
    renderYourTeams();
    renderAllTeams();
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
