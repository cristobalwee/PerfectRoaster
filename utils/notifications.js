import notifee, { TriggerType, AndroidImportance, AndroidVisibility } from '@notifee/react-native';
import getTranslation from './getTranslation';

export async function getNotifPerms() {
  await notifee.requestPermission({ criticalAlert: true });
}

export async function onDisplayNotification(cookTime, elapsedTime, locale) {
  const trigger = {
    type: TriggerType.TIMESTAMP,
    timestamp: Date.now() + ((cookTime - elapsedTime/1000) * 1000) + 500
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
};

export async function cancelNotif(notificationId) {
  await notifee.cancelNotification(notificationId);
}
