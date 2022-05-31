package pulse.contribute.android.api.internal

import android.app.Notification
import android.app.PendingIntent
import android.content.Intent
import android.media.RingtoneManager
import android.net.Uri
import android.os.Build
import android.os.Handler
import android.widget.Toast
import androidx.core.app.NotificationCompat
import pulse.contribute.android.ApiMap
import pulse.contribute.android.App
import pulse.contribute.android.util.Promise
import java.lang.Exception
import java.util.*


class Native { companion object {

    fun showNativeToast(promiseId: String, toast: String) {
        Toast.makeText(App.applicationContext, toast, Toast.LENGTH_SHORT).show()
        return Promise(promiseId).resolveUndefined()
    }

    fun showNativeNotification(promiseId: String, title: String, message: String, time: Int){
        var notification: Notification.Builder? = null
        val notificationId: Int = Random().nextInt(100);
        if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.O) {
            notification = Notification.Builder(App.applicationContext, App.notificationChannelId)
                .setTimeoutAfter(time.toLong())
        } else {
            notification = Notification.Builder(App.applicationContext)
            Handler().postDelayed(Runnable {
                App.notificationManager.cancel(notificationId)
            }, time.toLong() + 1)
        }

        notification
            .setContentTitle(title)
            .setContentText(message)
            .setSmallIcon(android.R.drawable.ic_dialog_info)
            .setOngoing(true)
            .setAutoCancel(true)
            .setPriority(Notification.PRIORITY_MAX)
            .setDefaults(NotificationCompat.DEFAULT_ALL)
            .setContentIntent(PendingIntent.getActivity(App.applicationContext, 0, Intent(), PendingIntent.FLAG_UPDATE_CURRENT))

        App.notificationManager.notify(notificationId, notification.build());
        return Promise(promiseId).resolveUndefined()
    }

    fun playNotificationSound(promiseId: String) {
        try {
            val notification: Uri = RingtoneManager.getDefaultUri(RingtoneManager.TYPE_NOTIFICATION)
            val r = RingtoneManager.getRingtone(App.applicationContext, notification)
            r.play()
        } catch (e: Exception) {
            return Promise(promiseId).resolveFalse()
        }
        return Promise(promiseId).resolveTrue()
    }

} }