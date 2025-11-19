import notifee, { TriggerType, AndroidImportance, AndroidVisibility } from '@notifee/react-native';
import getTranslation from './getTranslation';

export async function getNotifPerms() {
  await notifee.requestPermission({ criticalAlert: true });
}

export async function onDisplayNotification(cookTime, elapsedTime, locale) {
  // cookTime is in seconds, elapsedTime is in milliseconds
  // Calculate remaining time in seconds
  const remainingTimeSeconds = cookTime - (elapsedTime / 1000);
  
  // Create future date for notification trigger (exactly like test file)
  const date = new Date(Date.now());
  date.setSeconds(date.getSeconds() + remainingTimeSeconds);

  // Create channel exactly like the working test
  const channelId = await notifee.createChannel({
    id: 'alarm',
    name: 'Alarm Channel',
    sound: 'custom_sound', // Match the working test file
    importance: AndroidImportance.HIGH,
  });

  const notificationId = await notifee.createTriggerNotification(
    {
      title: getTranslation('listo', locale),
      body: getTranslation('ready_notif', locale),
      android: {
        channelId,
        sound: 'custom_sound', // Match the working test file
        importance: AndroidImportance.HIGH,
        pressAction: { id: 'default' },
        fullScreenAction: { id: 'default' },
      },
      ios: {
        sound: 'custom_sound.caf', // Update iOS sound to match
        interruptionLevel: 'timeSensitive'
      }
    },
    {
      type: TriggerType.TIMESTAMP,
      timestamp: date.getTime(),
    }
  );

  // Optional: Log for debugging (remove in production)
  console.log('Notification scheduled:', {
    remainingTimeSeconds,
    triggerTimestamp: date.getTime(),
    notificationId
  });

  return notificationId;
};

export async function cancelNotif(notificationId) {
  await notifee.cancelNotification(notificationId);
}

export async function getActiveTriggerNotifications() {
  const triggerNotifications = await notifee.getTriggerNotifications();
  console.log('Active trigger notifications:', triggerNotifications);
  return triggerNotifications;
}

export async function cancelAllNotifications() {
  const triggerNotificationIds = await notifee.getTriggerNotificationIds();
  triggerNotificationIds.forEach(id => notifee.cancelNotification(id));
  console.log('Cancelled all notifications:', triggerNotificationIds);
}
