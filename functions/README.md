# Perfect Roaster Firebase Functions

This directory contains Firebase Functions for scheduling and sending push notifications for the Perfect Roaster app.

## Setup

### 1. Install Dependencies
```bash
npm install
```

### 2. Deploy Functions
```bash
npm run deploy
```

## Architecture

The timer scheduling system uses **scheduled functions** for reliable and **completely free** scheduling:

- **Free**: Uses Firebase's free tier scheduled functions
- **Reliable**: Runs every minute to check for expired timers
- **Scalable**: Can handle thousands of concurrent timers
- **Cost-effective**: No additional charges beyond Firebase's free tier

## Functions

### `scheduleTimer`
- **Method**: POST
- **Purpose**: Schedule a push notification for a future time
- **Body**: `{ pushToken, fireAt, durationInMs, locale, message }`

### `cancelTimer`
- **Method**: DELETE
- **Purpose**: Cancel a scheduled timer
- **Params**: `timerId`

### `health`
- **Method**: GET
- **Purpose**: Health check endpoint

### `processExpiredTimers` (Scheduled)
- **Schedule**: Every 1 minute
- **Purpose**: Process timers that have expired and send notifications
- **Cost**: FREE (included in Firebase free tier)

### `cleanupTimers` (Scheduled)
- **Schedule**: Every 1 hour
- **Purpose**: Clean up old timer records
- **Cost**: FREE (included in Firebase free tier)

## How It Works

1. **Schedule**: User calls `scheduleTimer` → Timer stored in Firestore
2. **Process**: `processExpiredTimers` runs every minute → Checks for expired timers
3. **Notify**: Sends push notification and updates status
4. **Cleanup**: `cleanupTimers` removes old records

## Cost Analysis

### **FREE Solution (Current)**
- Firebase Functions: 2M invocations/month FREE
- Firestore: 1GB storage + 50K reads + 20K writes/month FREE
- Scheduled Functions: 2M invocations/month FREE

### **Typical Usage**
- 1,000 timers/month: ~$0.00
- 10,000 timers/month: ~$0.00
- 100,000 timers/month: ~$0.00 (still within free tier)

## Monitoring

You can monitor your functions in the Firebase Console:
- Functions: https://console.firebase.google.com/project/YOUR_PROJECT/functions
- Firestore: https://console.firebase.google.com/project/YOUR_PROJECT/firestore 