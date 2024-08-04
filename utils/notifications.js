import notifee, { TriggerType } from '@notifee/react-native';
import getTranslation from './getTranslation';

// https://stackoverflow.com/questions/74319959/react-native-navigate-to-particular-screen-when-notification-is-clicked-in-notif

export async function onDisplayNotification(cookTime, elapsedTime, locale) {
  await notifee.requestPermission({ criticalAlert: true });
  const trigger = {
    type: TriggerType.TIMESTAMP,
    timestamp: Date.now() + ((cookTime - elapsedTime/1000) * 1000) + 500
  };

  const channelId = await notifee.createChannel({
    id: 'default',
    name: 'Default Channel',
  });

  await notifee.createTriggerNotification({
    title: getTranslation('listo', locale),
    body: getTranslation('ready_notif', locale),
    android: {
      channelId,
      pressAction: {
        id: 'default',
      },
    },
    ios: {
      interruptionLevel: 'timeSensitive',
      critical: true,
      sound: 'default'
    }
  }, trigger);
};

export async function cancelNotif(notificationId) {
  await notifee.cancelNotification(notificationId);
}
