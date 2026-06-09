const translations = {
  ar: {
    welcome_title: 'Yasser Ashraf FIFA WORLD CUP 2026',
    welcome_subtitle: 'اختر المنتخبات اللي عايز تتبعها',
    start_tracking: 'متابعة المباريات',
    matches: 'المباريات',
    teams: 'المنتخبات',
    notifications_tab: 'الإشعارات',
    all_matches: 'كل المباريات',
    live: 'مباشر',
    upcoming: 'قادمة',
    finished: 'منتهية',
    your_teams: 'المنتخبات بتاعتك',
    all_teams: 'كل المنتخبات',
    notifications: 'الإشعارات',
    mark_all_read: 'تحديد الكل كمقروء',
    no_matches: 'مفيش مباريات حالياً',
    no_notifications: 'مفيش إشعارات',
    select_teams_first: 'اختار المنتخبات الأول',
    goal_scored: 'سجلت جول',
    goal_conceded: 'استقبلت جول',
    match_started: 'المباراة بدأت',
    match_ended: 'المباراة خلصت',
    red_card: 'بطاقة حمراء',
    view_match: 'عرض المباراة',
    dismiss: 'تجاهل',
    minutes: 'دقيقة',
    add: 'إضافة',
    added: 'تمت الإضافة',
    groups: 'المجموعات',
  en: {
    welcome_title: 'Yasser Ashraf FIFA WORLD CUP 2026',
    welcome_subtitle: 'Choose the teams you want to track',
    start_tracking: 'Start Tracking',
    matches: 'Matches',
    teams: 'Teams',
    notifications_tab: 'Notifications',
    all_matches: 'All Matches',
    live: 'Live',
    upcoming: 'Upcoming',
    finished: 'Finished',
    your_teams: 'Your Teams',
    all_teams: 'All Teams',
    notifications: 'Notifications',
    mark_all_read: 'Mark all as read',
    no_matches: 'No matches currently',
    no_notifications: 'No notifications',
    select_teams_first: 'Select teams first',
    goal_scored: 'scored',
    goal_conceded: 'conceded',
    match_started: 'Match started',
    match_ended: 'Match ended',
    red_card: 'Red card',
    view_match: 'View Match',
    dismiss: 'Dismiss',
    minutes: 'min',
    add: 'Add',
    added: 'Added',
    groups: 'Groups',
  }
};

let currentLang = localStorage.getItem('lang') || 'ar';

function setLanguage(lang) {
  currentLang = lang;
  localStorage.setItem('lang', lang);
  document.documentElement.lang = lang;
  document.documentElement.dir = lang === 'ar' ? 'rtl' : 'ltr';
  document.getElementById('langText').textContent = lang === 'ar' ? 'EN' : 'عربي';
  document.querySelectorAll('[data-i18n]').forEach(el => {
    const key = el.getAttribute('data-i18n');
    if (translations[lang][key]) {
      el.textContent = translations[lang][key];
    }
  });
}

function t(key) {
  return translations[currentLang][key] || key;
}

function toggleLanguage() {
  const newLang = currentLang === 'ar' ? 'en' : 'ar';
  setLanguage(newLang);
  if (typeof loadMatches === 'function') loadMatches();
  if (typeof loadTeams === 'function') loadTeams();
}

setLanguage(currentLang);
