package com.arthpay.mobile_app

import android.app.*
import android.content.*
import android.os.*
import android.speech.tts.TextToSpeech
import android.util.Log
import androidx.core.app.NotificationCompat
import java.util.*

class TTSForegroundService : Service() {
    private var tts: TextToSpeech? = null
    private val CHANNEL_ID = "tts_service_channel"

    override fun onCreate() {
        super.onCreate()
        Log.d("TTSService", "Service Created")

        // ✅ Initialize TTS
        tts = TextToSpeech(applicationContext) { status ->
            if (status == TextToSpeech.SUCCESS) {
                tts?.language = Locale.US
            } else {
                Log.e("TTSService", "TTS Initialization failed")
            }
        }

        // ✅ Restart Service if Killed
        registerRestartReceiver()
    }

    override fun onStartCommand(intent: Intent?, flags: Int, startId: Int): Int {
        Log.d("TTSService", "Service Started")

        // ✅ Ensure Foreground Service Runs Properly
        if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.O) {
            createNotificationChannel()
            val notification = NotificationCompat.Builder(this, CHANNEL_ID)
                .setContentTitle("TTS Service")
                .setContentText("Listening for messages...")
                .setSmallIcon(android.R.drawable.ic_dialog_info)
                .setPriority(NotificationCompat.PRIORITY_LOW)
                .build()
            startForeground(1, notification)
        }

        // ✅ Speak the incoming message
        val message = intent?.getStringExtra("tts_message")
        message?.let {
            Log.d("TTSService", "Speaking: $it")
            tts?.speak(it, TextToSpeech.QUEUE_FLUSH, null, null)
        }

        return START_STICKY  // ✅ Restart service if it's killed
    }

    override fun onDestroy() {
        tts?.stop()
        tts?.shutdown()
        super.onDestroy()
        Log.d("TTSService", "Service Destroyed")
    }

    override fun onBind(intent: Intent?): IBinder? {
        return null
    }

    // ✅ Ensure service restarts when killed
    private fun registerRestartReceiver() {
        val filter = IntentFilter(Intent.ACTION_BOOT_COMPLETED)
        registerReceiver(object : BroadcastReceiver() {
            override fun onReceive(context: Context?, intent: Intent?) {
                Log.d("TTSService", "Restarting service after boot")
                val serviceIntent = Intent(context, TTSForegroundService::class.java)
                if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.O) {
                    context?.startForegroundService(serviceIntent)
                } else {
                    context?.startService(serviceIntent)
                }
            }
        }, filter)
    }

    // ✅ Create Notification Channel
    private fun createNotificationChannel() {
        if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.O) {
            val channel = NotificationChannel(
                CHANNEL_ID,
                "TTS Background Service",
                NotificationManager.IMPORTANCE_LOW
            )
            val manager = getSystemService(NotificationManager::class.java)
            manager?.createNotificationChannel(channel)
        }
    }
}
