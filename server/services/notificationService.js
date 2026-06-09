const webpush = require('web-push');

const vapidPublicKey = process.env.VAPID_PUBLIC_KEY;
const vapidPrivateKey = process.env.VAPID_PRIVATE_KEY;

if (vapidPublicKey && vapidPrivateKey) {
  webpush.setVapidDetails(
    process.env.VAPID_EMAIL || 'mailto:admin@yasser-ashraf-wc2026.com',
    vapidPublicKey,
    vapidPrivateKey
  );
}

async function sendNotificationToUsers(user, payload) {
  try {
    if (!user.subscription || !user.subscription.endpoint) {
      console.log('No subscription for user:', user.deviceId);
      return;
    }
    const notificationPayload = JSON.stringify({
      title: user.language === 'ar' ? payload.titleAr : payload.title,
      body: user.language === 'ar' ? payload.bodyAr : payload.body,
      icon: '/icons/icon-192.png',
      badge: '/icons/badge.png',
      data: {
        url: `/match/${payload.matchId}`,
        teamId: payload.teamId,
        matchId: payload.matchId
      },
      actions: [
        { action: 'view', title: user.language === 'ar' ? 'عرض المباراة' : 'View Match' },
        { action: 'dismiss', title: user.language === 'ar' ? 'تجاهل' : 'Dismiss' }
      ]
    });
    await webpush.sendNotification(user.subscription, notificationPayload);
    console.log('Notification sent to user:', user.deviceId);
  } catch (error) {
    console.error('Error sending notification:', error.message);
    if (error.statusCode === 410 || error.statusCode === 404) {
      console.log('Subscription expired, user:', user.deviceId);
    }
  }
}

async function sendBulkNotifications(users, payload) {
  const promises = users.map(user => sendNotificationToUsers(user, payload));
  await Promise.allSettled(promises);
}

module.exports = { sendNotificationToUsers, sendBulkNotifications };
