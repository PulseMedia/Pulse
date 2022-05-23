package pulse.contribute.android

import android.content.Context
import android.view.Window
import android.webkit.JavascriptInterface
import android.widget.Toast
import org.json.JSONObject
import java.io.File
import java.lang.Exception
import java.net.HttpURLConnection
import java.net.URL
import org.json.JSONArray
import android.R
import android.app.Notification
import android.app.NotificationManager
import android.app.PendingIntent
import android.content.Intent
import android.os.Build
import android.os.Handler
import java.util.*

import android.app.NotificationChannel
import android.media.RingtoneManager
import android.net.Uri
import androidx.core.app.NotificationCompat
import pulse.contribute.android.api.FileDownloader
import pulse.contribute.android.util.Helper
import pulse.contribute.android.util.Promise

class ApiInterface(private val mContext: Context?) {

    companion object{

        //gets defined internally on App Start
        var activityWindow: Window? = null
        var defaultUserAgent = "";

        //gets defined in the init function below
        var notificationManager: NotificationManager? = null
        var notificationChannel: NotificationChannel? = null

        //Platform api function map for this platform
        fun platformApiMap(): String {
            return JSONObject(hashMapOf(

                "NATIVE_TOAST" to "showNativeToast",
                "NATIVE_NOTIFICATION" to "showNativeNotification",
                "NATIVE_NOTIFICATION_SOUND" to "playNotificationSound",

                "WRITE_FILE" to "writeFile",
                "APPEND_FILE" to "appendFile",
                "READ_FILE" to "readFile",
                "DELETE_FILE" to "deleteFile",
                "EXISTS_FILE" to "existsFile",

                "EXISTS_DIRECTORY" to "existsDirectory",
                "CREATE_DIRECTORY" to "createDirectory",
                "DELETE_DIRECTORY" to "deleteDirectory",
                "READ_DIRECTORY" to "readDirectory",

                "FETCH" to "asyncFetch",
                "DOWNLOAD_FILE" to "downloadFile"

            ) as Map<String, String>).toString()
        }

        //called during app loading (SplashScreen)
        fun init(mContext: Context) {
            notificationManager = (mContext?.getSystemService(Context.NOTIFICATION_SERVICE) as NotificationManager)
            if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.O) {
                notificationChannel = NotificationChannel(
                    "native_notification",
                    "Pulse Notifications",
                    NotificationManager.IMPORTANCE_HIGH
                )
                notificationManager?.createNotificationChannel(notificationChannel!!);
            }
        }

    }

    //todo
    //Rename this file to ApiMap?
    //Functions as below:
    //@JavascriptInterface
    //fun showTest(promiseId: String, toast: String) { subPackage.showTest(promiseId, toast) }

    //<editor-fold desc="Internal.Native">
    @JavascriptInterface
    fun showNativeToast(promiseId: String, toast: String) {
        Toast.makeText(mContext, toast, Toast.LENGTH_SHORT).show()
        return Promise(promiseId).resolveUndefined()
    }

    @JavascriptInterface
    fun showNativeNotification(promiseId: String, title: String, message: String, time: Int){
        var notification: Notification.Builder? = null
        val notificationId: Int = Random().nextInt(100);
        if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.O) {
            notification = Notification.Builder(mContext, "native_notification")
                    .setTimeoutAfter(time.toLong())
        } else {
            notification = Notification.Builder(mContext)
            Handler().postDelayed(Runnable {
                notificationManager?.cancel(notificationId)
            }, time.toLong() + 1)
        }

        notification = notification!!
            .setContentTitle(title)
            .setContentText(message)
            .setSmallIcon(R.drawable.ic_dialog_info)
            .setOngoing(true)
            .setAutoCancel(true)
            .setPriority(Notification.PRIORITY_MAX)
            .setDefaults(NotificationCompat.DEFAULT_ALL)
            .setContentIntent(PendingIntent.getActivity(mContext, 0, Intent(), PendingIntent.FLAG_UPDATE_CURRENT))
        
        notificationManager?.notify(notificationId, notification.build());
        return Promise(promiseId).resolveUndefined()
    }

    @JavascriptInterface
    fun playNotificationSound(promiseId: String) {
        try {
            val notification: Uri = RingtoneManager.getDefaultUri(RingtoneManager.TYPE_NOTIFICATION)
            val r = RingtoneManager.getRingtone(mContext, notification)
            r.play()
        } catch (e: Exception) {
            return Promise(promiseId).resolveFalse()
        }
        return Promise(promiseId).resolveTrue()
    }

    //</editor-fold>

    //<editor-fold desc="VFS.File">

    @JavascriptInterface
    fun writeFile(promiseId: String, path: String, content: String) {
        return Promise(promiseId).resolve(
            Helper.tryActionOrFalse {
                File(path).writeText(content, Charsets.UTF_8)
            }
        )
    }

    @JavascriptInterface
    fun appendFile(promiseId: String, path: String, content: String) {
        return Promise(promiseId).resolve(
            Helper.tryActionOrFalse {
                File(path).appendText(content, Charsets.UTF_8)
            }
        )
    }

    @JavascriptInterface
    fun readFile(promiseId: String, path: String) {
        return try {
            val file = File(path)
            Promise(promiseId).resolve(file.readText(Charsets.UTF_8))
        } catch (e: Exception) {
            Promise(promiseId).resolveUndefined()
        }
    }

    @JavascriptInterface
    fun deleteFile(promiseId: String, path: String) {
        return try {
            val file = File(path)
            Promise(promiseId).resolve(file.exists() && file.isFile && file.delete())
        } catch (e: Exception) {
            Promise(promiseId).resolve(false)
        }
    }

    @JavascriptInterface
    fun existsFile(promiseId: String, path: String) {
        return try {
            val file = File(path)
            Promise(promiseId).resolve(file.exists() && file.isFile)
        } catch (e: Exception) {
            Promise(promiseId).resolve(false)
        }
    }

    //</editor-fold>

    //<editor-fold desc="VFS.Directory">

    @JavascriptInterface
    fun existsDirectory(promiseId: String, path: String) {
        return try {
            val dir = File(path)
            Promise(promiseId).resolve(dir.exists() && dir.isDirectory)
        } catch (e: Exception) {
            Promise(promiseId).resolve(false)
        }
    }

    @JavascriptInterface
    fun createDirectory(promiseId: String, path: String) {
        return Promise(promiseId).resolve(
            Helper.tryActionOrFalse {
                val dir = File(path)
                if (!(dir.exists() && dir.isDirectory)) {
                    dir.mkdir()
                }
            }
        )
    }

    @JavascriptInterface
    fun deleteDirectory(promiseId: String, path: String) {
        return try {
            val dir = File(path)
            Promise(promiseId).resolve(dir.exists() && dir.isDirectory && dir.deleteRecursively())
        } catch (e: Exception) {
            Promise(promiseId).resolve(false)
        }
    }

    @JavascriptInterface
    fun readDirectory(promiseId: String, path: String) {
        var files = JSONArray()
        var dirs = JSONArray()
        val dir = File(path)
        if(dir.exists() && dir.isDirectory) {
            dir.walk(FileWalkDirection.TOP_DOWN).forEach {
                if(it.absolutePath != dir.absolutePath) {
                    if (it.isDirectory) {
                        dirs.put(it.name)
                    } else {
                        files.put(it.name)
                    }
                }
            }
        }
        return Promise(promiseId).resolve(JSONObject(
            hashMapOf(
                "dirs" to dirs,
                "files" to files
            ) as Map<String, *>
        ))
    }

    //</editor-fold>

    //<editor-fold desc="NET.Web">

    @JavascriptInterface
    fun asyncFetch(promiseId: String, url: String, optionsJson: String) {
        try {
            val conn: HttpURLConnection = URL(url).openConnection() as HttpURLConnection
            conn.useCaches = false
            conn.allowUserInteraction = false
            conn.setRequestProperty("User-Agent", defaultUserAgent)
            conn.connectTimeout = 1000
            val options = JSONObject(optionsJson);
            conn.requestMethod = options.optString("method", "GET")
            val customHeader: JSONObject? = options.optJSONObject("header");
            if(customHeader != null) {
                val headerNames: JSONArray? = customHeader.names()
                if (headerNames != null) {
                    for (i in 0 until headerNames.length()) {
                        conn.setRequestProperty(
                            headerNames.getString(i),
                            customHeader.getString(headerNames.getString(i))
                        );
                    }
                }
            }
            val body = options.optString("body", "")
            if (body.isNotEmpty()) {
                conn.doOutput = true;
                conn.outputStream.use {
                    it.write(body.toByteArray())
                }
            } else {
                conn.doOutput = false;
            }

            val responseCode = conn.responseCode
            val responseBody = if (responseCode in 400..599) {
                conn.errorStream.use { it.readBytes() }.toString(Charsets.UTF_8)
            } else {
                conn.inputStream.use { it.readBytes() }.toString(Charsets.UTF_8)
            }

            val mapHeader = conn.headerFields
            val respHeader = JSONObject()
            for ((headKey, value) in mapHeader) {
                if(headKey != null) {
                    var headval = value.toTypedArray();
                    if(headval.count() == 1){
                        respHeader.put(headKey, headval[0])
                    } else {
                        respHeader.put(headKey, headval)
                    }
                }
            }

            conn.disconnect()

            Promise(promiseId).resolveObject(
                "FETCH_RESPONSE", JSONObject(
                    hashMapOf(
                        "status" to conn.responseCode,
                        "body" to responseBody,
                        "header" to respHeader
                    ) as Map<String, *>
                )
            )
        } catch (e: Exception) {
            Promise(promiseId).resolveObject(
                "FETCH_RESPONSE", JSONObject(
                    hashMapOf(
                        "status" to 400,
                        "body" to "",
                        "header" to JSONObject()
                    ) as Map<String, *>
                )
            )
        }
    }

    @JavascriptInterface
    fun downloadFile(promiseId: String, url: String, saveTo: String, optionsJson: String, progressEventId: String){
        FileDownloader(promiseId, url, saveTo, optionsJson, progressEventId).start()
    }

    //</editor-fold>

}