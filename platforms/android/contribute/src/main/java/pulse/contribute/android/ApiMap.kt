package pulse.contribute.android

import android.webkit.JavascriptInterface
import org.json.JSONObject

import pulse.contribute.android.api.vfs.File as VFS_File
import pulse.contribute.android.api.vfs.Directory as VFS_Directory
import pulse.contribute.android.api.net.Web as NET_Web
import pulse.contribute.android.api.internal.Native as Internal_Native

class ApiMap() {

    companion object{

        //gets defined internally on App Start

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

    }

    //<editor-fold desc="Internal.Native">

    @JavascriptInterface
    fun showNativeToast(promiseId: String, toast: String) = Internal_Native.showNativeToast(promiseId, toast)

    @JavascriptInterface
    fun showNativeNotification(promiseId: String, title: String, message: String, time: Int) = Internal_Native.showNativeNotification(promiseId, title, message, time)

    @JavascriptInterface
    fun playNotificationSound(promiseId: String) = Internal_Native.playNotificationSound(promiseId)

    //</editor-fold>

    //<editor-fold desc="VFS.File">

    @JavascriptInterface
    fun writeFile(promiseId: String, path: String, content: String) = VFS_File.writeFile(promiseId, path, content)

    @JavascriptInterface
    fun appendFile(promiseId: String, path: String, content: String) = VFS_File.appendFile(promiseId, path, content)

    @JavascriptInterface
    fun readFile(promiseId: String, path: String) = VFS_File.readFile(promiseId, path)

    @JavascriptInterface
    fun deleteFile(promiseId: String, path: String) = VFS_File.deleteFile(promiseId, path)

    @JavascriptInterface
    fun existsFile(promiseId: String, path: String) = VFS_File.existsFile(promiseId, path)

    //</editor-fold>

    //<editor-fold desc="VFS.Directory">

    @JavascriptInterface
    fun existsDirectory(promiseId: String, path: String) = VFS_Directory.existsDirectory(promiseId, path)

    @JavascriptInterface
    fun createDirectory(promiseId: String, path: String) = VFS_Directory.createDirectory(promiseId, path)

    @JavascriptInterface
    fun deleteDirectory(promiseId: String, path: String) = VFS_Directory.deleteDirectory(promiseId, path)

    @JavascriptInterface
    fun readDirectory(promiseId: String, path: String) = VFS_Directory.readDirectory(promiseId, path)

    //</editor-fold>

    //<editor-fold desc="NET.Web">

    @JavascriptInterface
    fun asyncFetch(promiseId: String, url: String, optionsJson: String) = NET_Web.asyncFetch(promiseId, url, optionsJson)

    @JavascriptInterface
    fun downloadFile(promiseId: String, url: String, saveTo: String, optionsJson: String, progressEventId: String) = NET_Web.downloadFile(promiseId, url, saveTo, optionsJson, progressEventId)

    //</editor-fold>

}