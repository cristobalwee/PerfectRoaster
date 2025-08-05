const functions = require('firebase-functions');
const admin = require('firebase-admin');

// Initialize Firebase Admin SDK
admin.initializeApp();

// Store scheduled timers in Firestore
const db = admin.firestore();

// Schedule timer endpoint
exports.scheduleTimer = functions.https.onRequest(async (req, res) => {
  // Enable CORS
  res.set('Access-Control-Allow-Origin', '*');
  res.set('Access-Control-Allow-Methods', 'GET, POST, DELETE');
  res.set('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    res.status(204).send('');
    return;
  }

  if (req.method !== 'POST') {
    res.status(405).json({ success: false, error: 'Method not allowed' });
    return;
  }

  try {
    const { pushToken, fireAt, durationInMs, locale, message } = req.body;

    if (!pushToken || !fireAt || !message) {
      return res.status(400).json({ 
        success: false, 
        error: 'Missing required fields' 
      });
    }

    const timerId = `timer_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
    const delay = fireAt - Date.now();

    if (delay <= 0) {
      return res.status(400).json({ 
        success: false, 
        error: 'Fire time must be in the future' 
      });
    }

    // Store timer in Firestore
    await db.collection('timers').doc(timerId).set({
      pushToken,
      fireAt,
      message,
      locale,
      createdAt: admin.firestore.FieldValue.serverTimestamp(),
      status: 'scheduled'
    });

    console.log(`Timer ${timerId} scheduled for ${new Date(fireAt).toISOString()}`);

    res.json({ 
      success: true, 
      timerId,
      scheduledFor: new Date(fireAt).toISOString()
    });

  } catch (error) {
    console.error('Error scheduling timer:', error);
    res.status(500).json({ 
      success: false, 
      error: 'Internal server error' 
    });
  }
});

// Cancel timer endpoint
exports.cancelTimer = functions.https.onRequest(async (req, res) => {
  res.set('Access-Control-Allow-Origin', '*');
  res.set('Access-Control-Allow-Methods', 'GET, POST, DELETE');
  res.set('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    res.status(204).send('');
    return;
  }

  if (req.method !== 'DELETE') {
    res.status(405).json({ success: false, error: 'Method not allowed' });
    return;
  }

  try {
    const { timerId } = req.params;
    
    const timerDoc = await db.collection('timers').doc(timerId).get();
    
    if (timerDoc.exists) {
      await db.collection('timers').doc(timerId).update({
        status: 'cancelled',
        cancelledAt: admin.firestore.FieldValue.serverTimestamp()
      });
      
      res.json({ success: true, message: 'Timer cancelled' });
    } else {
      res.status(404).json({ success: false, error: 'Timer not found' });
    }
  } catch (error) {
    console.error('Error cancelling timer:', error);
    res.status(500).json({ success: false, error: 'Internal server error' });
  }
});

// Health check endpoint
exports.health = functions.https.onRequest(async (req, res) => {
  res.set('Access-Control-Allow-Origin', '*');
  
  try {
    // Count active timers
    const activeTimersSnapshot = await db.collection('timers')
      .where('status', '==', 'scheduled')
      .get();
    
    res.json({ 
      status: 'healthy', 
      activeTimers: activeTimersSnapshot.size,
      timestamp: new Date().toISOString(),
      environment: 'firebase-functions'
    });
  } catch (error) {
    console.error('Health check error:', error);
    res.status(500).json({ status: 'unhealthy', error: error.message });
  }
});

// Process expired timers (runs every minute - FREE)
exports.processExpiredTimers = functions.pubsub.schedule('every 1 minutes').onRun(async (context) => {
  try {
    const now = Date.now();
    
    // Get all scheduled timers that should have fired
    const expiredTimers = await db.collection('timers')
      .where('status', '==', 'scheduled')
      .where('fireAt', '<=', now)
      .limit(10) // Process in batches
      .get();
    
    if (expiredTimers.empty) {
      console.log('No expired timers to process');
      return null;
    }
    
    console.log(`Processing ${expiredTimers.size} expired timers`);
    
    const batch = db.batch();
    const promises = [];
    
    expiredTimers.docs.forEach(doc => {
      const timerData = doc.data();
      
      // Send notification
      const notificationPromise = sendPushNotification(
        timerData.pushToken, 
        timerData.message, 
        timerData.locale
      ).then(() => {
        // Update status to completed
        batch.update(doc.ref, {
          status: 'completed',
          completedAt: admin.firestore.FieldValue.serverTimestamp()
        });
      }).catch(error => {
        console.error(`Failed to send notification for timer ${doc.id}:`, error);
        // Update status to failed
        batch.update(doc.ref, {
          status: 'failed',
          error: error.message,
          failedAt: admin.firestore.FieldValue.serverTimestamp()
        });
      });
      
      promises.push(notificationPromise);
    });
    
    // Wait for all notifications to be sent
    await Promise.all(promises);
    
    // Commit all status updates
    await batch.commit();
    
    console.log(`Processed ${expiredTimers.size} timers`);
    return null;
    
  } catch (error) {
    console.error('Error processing expired timers:', error);
    return null;
  }
});

// Cleanup old timers (runs every hour - FREE)
exports.cleanupTimers = functions.pubsub.schedule('every 1 hours').onRun(async (context) => {
  try {
    const oneDayAgo = new Date();
    oneDayAgo.setDate(oneDayAgo.getDate() - 1);
    
    const expiredTimers = await db.collection('timers')
      .where('createdAt', '<', oneDayAgo)
      .get();
    
    const batch = db.batch();
    expiredTimers.docs.forEach(doc => {
      batch.delete(doc.ref);
    });
    
    await batch.commit();
    
    console.log(`Cleaned up ${expiredTimers.size} expired timers`);
    return null;
  } catch (error) {
    console.error('Cleanup error:', error);
    return null;
  }
});

// Send push notification using Firebase Admin SDK
async function sendPushNotification(pushToken, message, locale = 'es_PE') {
  const notification = {
    token: pushToken,
    notification: {
      title: message.title,
      body: message.body,
    },
    android: {
      priority: 'high',
      notification: {
        channelId: 'default-alert',
        sound: 'custom_alert',
        priority: 'high',
        defaultSound: true,
        defaultVibrateTimings: true,
        visibility: 'public',
        icon: 'ic_perfect_roaster',
        color: '#FF6B35',
        clickAction: 'FLUTTER_NOTIFICATION_CLICK'
      }
    },
    apns: {
      payload: {
        aps: {
          sound: 'custom_alert.caf',
          badge: 1,
          'mutable-content': 1,
          'content-available': 1
        }
      },
      headers: {
        'apns-priority': '10',
        'apns-push-type': 'alert'
      }
    },
    data: {
      type: 'timer_complete',
      locale: locale,
      timestamp: Date.now().toString()
    }
  };

  try {
    const response = await admin.messaging().send(notification);
    console.log('Successfully sent message:', response);
    return response;
  } catch (error) {
    console.error('Error sending message:', error);
    throw error;
  }
} 