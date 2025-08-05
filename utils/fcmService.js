import messaging from '@react-native-firebase/messaging';
import NetInfo from 'react-native-netinfo';
import { Alert } from 'react-native';
import getTranslation from './getTranslation';
import notifee, { TriggerType, AndroidImportance, AndroidVisibility } from '@notifee/react-native';

// Ensure fetch is available
if (typeof global.fetch === 'undefined') {
  console.warn('Fetch not available, using XMLHttpRequest fallback');
}

class FCMService {
  constructor() {
    this.fcmToken = null;
    this.isInitialized = false;
    this.serverUrl = 'https://us-central1-perfect-roaster-9917d.cloudfunctions.net';
  }

  async initialize() {
    if (this.isInitialized) return;

    try {
      // Request permission for iOS
      const authStatus = await messaging().requestPermission();
      const enabled =
        authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
        authStatus === messaging.AuthorizationStatus.PROVISIONAL;

      if (enabled) {
        console.log('Authorization status:', authStatus);
      }

      // Get FCM token
      this.fcmToken = await messaging().getToken();
      console.log('FCM Token:', this.fcmToken);

      // Listen for token refresh
      messaging().onTokenRefresh(token => {
        this.fcmToken = token;
        console.log('FCM Token refreshed:', token);
      });

      // Handle background messages
      messaging().setBackgroundMessageHandler(async remoteMessage => {
        console.log('Message handled in the background!', remoteMessage);
        // Handle the notification here if needed
      });

      // Handle foreground messages
      messaging().onMessage(async remoteMessage => {
        console.log('A new FCM message arrived!', remoteMessage);
        // You can show a local notification here if needed
      });

      this.isInitialized = true;
    } catch (error) {
      console.error('FCM initialization failed:', error);
    }
  }

  async isOnline() {
    const netInfo = await NetInfo.fetch();
    return netInfo.isConnected && netInfo.isInternetReachable;
  }

  async scheduleTimer(durationInMs, locale = 'es_PE') {
    const fireAt = Date.now() + durationInMs;
    
    console.log('=== FCM Service Debug ===');
    console.log('Duration (ms):', durationInMs);
    console.log('Fire at:', new Date(fireAt).toISOString());
    console.log('Locale:', locale);
    
    try {
      // Check if online
      // const online = await this.isOnline();
      // console.log('Online status:', online);
      // console.log('FCM Token available:', !!this.fcmToken);
      
      if (this.fcmToken) {
        console.log('Attempting remote notification...');
        // Try to schedule remote notification
        const success = await this.scheduleRemoteNotification(fireAt, durationInMs, locale);
        
        if (success) {
          console.log('✅ Remote notification scheduled successfully');
          return { success: true, type: 'remote' };
        } else {
          console.log('❌ Remote notification failed, falling back to local');
        }
      } else {
        console.log('⚠️  Offline or no FCM token, using local notification');
      }
      
      // Fallback to local notification
      console.log('📱 Creating local notification...');
      await this.createLocalNotification(durationInMs, locale);
      console.log('✅ Local notification created successfully');
      
      return { success: true, type: 'local' };
    } catch (error) {
      console.error('❌ Failed to schedule notification:', error);
      
      // Final fallback to local notification
      try {
        console.log('🔄 Final fallback to local notification...');
        await this.createLocalNotification(durationInMs, locale);
        console.log('✅ Final fallback successful');
        return { success: true, type: 'local' };
      } catch (localError) {
        console.error('❌ Local notification also failed:', localError);
        return { success: false, error: localError };
      }
    }
  }

  async createLocalNotification(durationInMs, locale) {
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

  async scheduleRemoteNotification(fireAt, durationInMs, locale) {
    try {
      console.log('Attempting to schedule remote notification...');
      console.log('Server URL:', this.serverUrl);
      console.log('FCM Token available:', !!this.fcmToken);
      
      const requestBody = {
        pushToken: this.fcmToken,
        fireAt: fireAt,
        durationInMs: durationInMs,
        locale: locale,
        message: {
          title: getTranslation('listo', locale),
          body: getTranslation('ready_notif', locale)
        }
      };
      
      console.log('Request body:', JSON.stringify(requestBody, null, 2));
      
      // Use XMLHttpRequest instead of fetch for better React Native compatibility
      return new Promise((resolve, reject) => {
        const xhr = new XMLHttpRequest();
        xhr.open('POST', `${this.serverUrl}/scheduleTimer`, true);
        xhr.setRequestHeader('Content-Type', 'application/json');
        
        xhr.onload = function() {
          console.log('Response status:', xhr.status);
          
          if (xhr.status >= 200 && xhr.status < 300) {
            try {
              const result = JSON.parse(xhr.responseText);
              console.log('Server response:', result);
              resolve(result.success);
            } catch (parseError) {
              console.error('Failed to parse response:', parseError);
              resolve(false);
            }
          } else {
            console.error('Server error response:', xhr.responseText);
            resolve(false);
          }
        };
        
        xhr.onerror = function() {
          console.error('Network error occurred');
          resolve(false);
        };
        
        xhr.ontimeout = function() {
          console.error('Request timeout');
          resolve(false);
        };
        
        xhr.timeout = 10000; // 10 second timeout
        xhr.send(JSON.stringify(requestBody));
      });
      
    } catch (error) {
      console.error('Remote notification scheduling failed:', error);
      return false;
    }
  }

  getFCMToken() {
    return this.fcmToken;
  }

  isInitialized() {
    return this.isInitialized;
  }
}

// Export singleton instance
export default new FCMService(); 