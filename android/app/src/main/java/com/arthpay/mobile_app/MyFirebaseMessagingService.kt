package com.arthpay.mobile_app

import android.content.Intent
import android.speech.tts.TextToSpeech
import android.util.Log
import com.google.firebase.messaging.FirebaseMessagingService
import com.google.firebase.messaging.RemoteMessage
import java.util.*

class MyFirebaseMessagingService : FirebaseMessagingService() {
    override fun onMessageReceived(remoteMessage: RemoteMessage) {
        Log.d("FCMService", "FCM Message Received: ${remoteMessage.data}")

        val message = remoteMessage.notification?.body ?: remoteMessage.data["message"]
        message?.let {
            // ✅ Start TTS Foreground Service
            val intent = Intent(this, TTSForegroundService::class.java)
            intent.putExtra("tts_message", it)
            if (android.os.Build.VERSION.SDK_INT >= android.os.Build.VERSION_CODES.O) {
                startForegroundService(intent)  // Required for Android 8+ (Oreo and later)
            } else {
                startService(intent)
            }
        }
    }
}
