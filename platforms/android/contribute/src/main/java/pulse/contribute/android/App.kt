package pulse.contribute.android

import android.app.NotificationChannel
import android.app.NotificationManager
import android.content.Context
import android.os.Build

class App(private val contextGetter: (() -> Context)) {

    companion object Static {

        //gets defined internally (after init{})
        lateinit var Instance: App

        //gets defined internally (before init{} via apply{})
        //(Only access getter below to prevent overrides)
        lateinit var Prop_DefaultUserAgent: String

        //getter that can be used in the api
        val applicationContext: Context get() = Instance.contextGetter()
        val notificationManager: NotificationManager get() = Instance.notificationManager!!
        val notificationChannel: NotificationChannel get() = Instance.notificationChannel
        val userAgent: String get() = Prop_DefaultUserAgent; //eg: Pulse/<AppVersion> (Android <AndroidVersion>)

        val notificationChannelId: String get() = "native_notification";
    }

    //gets defined in init{} below
    var notificationManager: NotificationManager? = null
    lateinit var notificationChannel: NotificationChannel

    init {
        notificationManager = (contextGetter().getSystemService(Context.NOTIFICATION_SERVICE) as NotificationManager)
        if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.O) {
            notificationChannel = NotificationChannel(
                notificationChannelId,
                "Pulse Notifications",
                NotificationManager.IMPORTANCE_HIGH
            )
            notificationManager!!.createNotificationChannel(notificationChannel);
        }
    }

}