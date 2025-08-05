import notifee, { TriggerType, AndroidImportance, AndroidVisibility } from '@notifee/react-native';
import getTranslation from './getTranslation';
import fcmService from './fcmService';

export async function getNotifPerms() {
  await notifee.requestPermission({ criticalAlert: true });
}

// Separate function for local notifications to avoid circular dependency
async function createLocalNotification(durationInMs, locale) {
  const trigger = {
    type: TriggerType.TIMESTAMP,
    timestamp: Date.now() + durationInMs + 500
  };

  const channelId = await notifee.createChannel({
    id: 'default-alert',
    name: 'High Importance Channel',
    importance: AndroidImportance.HIGH,
    sound: 'custom_alert',
    vibration: true
  });

  await notifee.createTriggerNotification({
    title: getTranslation('listo', locale),
    body: getTranslation('ready_notif', locale),
    android: {
      channelId,
      smallIcon: 'ic_perfect_roaster',
      sound: 'custom_alert',
      pressAction: {
        id: 'default',
        launchActivity: 'default'
      },
      visibility: AndroidVisibility.PUBLIC
    },
    ios: {
      sound: 'custom_alert.caf',
      interruptionLevel: 'timeSensitive'
    }
  }, trigger);
}

export async function onDisplayNotification(cookTime, elapsedTime, locale) {
  // Calculate duration in milliseconds
  const durationInMs = (cookTime - elapsedTime/1000) * 1000;
  
  // Try to schedule remote notification first, fallback to local
  const result = await fcmService.scheduleTimer(durationInMs, locale);
  
  if (!result.success) {
    // If FCM fails completely, use local notification as final fallback
    await createLocalNotification(durationInMs, locale);
  }
}

export async function cancelNotif(notificationId) {
  await notifee.cancelNotification(notificationId);
}

// Initialize FCM service when notifications module is imported
fcmService.initialize();
