let swRegistration = null;

async function initNotifications() {
  if (!('serviceWorker' in navigator) || !('Notification' in window)) {
    console.log('Notifications not supported');
    return;
  }
  try {
    swRegistration = await navigator.serviceWorker.register('/sw.js');
    console.log('Service Worker registered');
  } catch (error) {
    console.error('Service Worker registration failed:', error);
  }
}

async function requestNotificationPermission() {
  if (!('Notification' in window)) return false;
  if (Notification.permission === 'granted') return true;
  if (Notification.permission === 'denied') return false;
  const permission = await Notification.requestPermission();
  return permission === 'granted';
}

async function subscribeToPush() {
  try {
    if (!swRegistration) await initNotifications();
    if (!swRegistration) return null;
    const permission = await requestNotificationPermission();
    if (!permission) return null;
    const vapidPublicKey = await fetchVapidKey();
    if (!vapidPublicKey) return null;
    const subscription = await swRegistration.pushManager.subscribe({
      userVisibleOnly: true,
      applicationServerKey: urlBase64ToUint8Array(vapidPublicKey)
    });
    return subscription.toJSON();
  } catch (error) {
    console.error('Push subscription error:', error);
    return null;
  }
}

async function fetchVapidKey() {
  try {
    const response = await fetch('/api/config/vapid-key');
    const data = await response.json();
    return data.publicKey;
  } catch (error) {
    return null;
  }
}

function urlBase64ToUint8Array(base64String) {
  const padding = '='.repeat((4 - (base64String.length % 4)) % 4);
  const base64 = (base64String + padding).replace(/-/g, '+').replace(/_/g, '/');
  const rawData = atob(base64);
  return Uint8Array.from([...rawData].map(c => c.charCodeAt(0)));
}

async function setupNotifications() {
  const subscription = await subscribeToPush();
  if (subscription) {
    await saveSubscription(subscription);
    console.log('Push subscription saved');
  }
}

async function loadNotifications() {
  const container = document.getElementById('notificationsList');
  if (!container) return;
  const notifications = await fetchNotifications();
  if (!notifications || notifications.length === 0) {
    container.innerHTML = `
      <div class="empty-state">
        <div class="icon">🔔</div>
        <h3>${t('no_notifications')}</h3>
      </div>
    `;
    return;
  }
  container.innerHTML = notifications.map(notif => renderNotification(notif)).join('');
}

function renderNotification(notif) {
  const timeAgo = getTimeAgo(notif.createdAt);
  const icon = notif.type === 'GOAL_SCORED' ? '⚽' : notif.type === 'GOAL_CONCEDED' ? '🥅' : '🔔';
  const title = currentLang === 'ar' ? notif.messageAr : notif.message;
  return `
    <div class="notif-card ${notif.read ? '' : 'unread'}" onclick="markNotifRead('${notif._id}')">
      <div class="notif-type">
        <span class="notif-icon">${icon}</span>
        <span class="notif-title">${currentLang === 'ar' ? notif.teamNameAr : notif.teamName}</span>
      </div>
      <div class="notif-message">${title}</div>
      <div class="notif-time">${timeAgo}</div>
    </div>
  `;
}

function getTimeAgo(dateStr) {
  const now = new Date();
  const date = new Date(dateStr);
  const diff = Math.floor((now - date) / 1000);
  if (diff < 60) return currentLang === 'ar' ? 'الآن' : 'Just now';
  if (diff < 3600) {
    const mins = Math.floor(diff / 60);
    return currentLang === 'ar' ? `منذ ${mins} دقيقة` : `${mins} min ago`;
  }
  if (diff < 86400) {
    const hours = Math.floor(diff / 3600);
    return currentLang === 'ar' ? `منذ ${hours} ساعة` : `${hours} hours ago`;
  }
  const days = Math.floor(diff / 86400);
  return currentLang === 'ar' ? `منذ ${days} يوم` : `${days} days ago`;
}

async function markNotifRead(id) {
  await markNotificationRead(id);
  updateNotificationBadge();
  loadNotifications();
}

async function updateNotificationBadge() {
  const result = await fetchUnreadCount();
  const badge = document.getElementById('notifCount');
  if (result && result.count > 0) {
    badge.textContent = result.count;
    badge.style.display = 'block';
  } else {
    badge.style.display = 'none';
  }
}

if ('serviceWorker' in navigator) {
  navigator.serviceWorker.ready.then(() => {
    initNotifications();
  });
}
