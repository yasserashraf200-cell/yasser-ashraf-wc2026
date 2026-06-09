let isInitialized = false;

async function init() {
  if (isInitialized) return;
  isInitialized = true;
  console.log('Initializing Yasser Ashraf FIFA WORLD CUP 2026...');
  await registerUser();
  const teams = await fetchTeams();
  if (teams) {
    allTeams = teams;
  }
  if (selectedTeams.length > 0) {
    showPage('matches');
    loadMatches();
  } else {
    showPage('matches');
    renderTeamsSelection();
  }
  initNotifications();
  updateNotificationBadge();
  setInterval(updateNotificationBadge, 30000);
  setInterval(() => {
    if (currentPage === 'matches') loadMatches();
  }, 60000);
}

document.addEventListener('DOMContentLoaded', init);
