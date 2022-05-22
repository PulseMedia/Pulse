package pulse.contribute.android.api

import android.util.Log
import org.json.JSONArray
import org.json.JSONObject
import pulse.contribute.android.util.Promise
import pulse.contribute.android.util.PromiseEvent
import java.io.BufferedInputStream
import java.io.FileOutputStream
import java.io.InputStream
import java.io.OutputStream
import java.lang.Exception
import java.net.URL
import java.net.URLConnection
import java.util.concurrent.Executors


class FileDownloader (private val promiseId: String, private val url: String, private val toFile: String, private val optionsJson: String, private val progressEventId: String) {

    private var progressEvent: PromiseEvent = PromiseEvent(progressEventId)
    private var promiseReturn: Promise = Promise(promiseId)

    fun start(){
        Log.d("DOWNLOAD_FILE", "2")
        var thread = Executors.newSingleThreadExecutor()
        thread.execute {
            var count: Int
            try {
                val url = URL(url)
                val conn: URLConnection = url.openConnection()
                conn.setRequestProperty("Accept-Encoding", "identity");
                Log.d("DOWNLOAD_FILE", "3")
                Log.d("DOWNLOAD_FILE", optionsJson)
                val options = JSONObject(optionsJson);
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
                conn.connect()

                val fileSize: Int = conn.contentLength

                val input: InputStream = BufferedInputStream(url.openStream(), 8192)
                val output: OutputStream = FileOutputStream(toFile)
                val data = ByteArray(1024)
                var downloadedSize: Long = 0
                var progress: Int = 0
                var triggerThreshold = 1;
                this.progressEvent.trigger(progress)
                while (input.read(data).also { count = it } != -1) {
                    if(this.progressEvent.isValid) {
                        downloadedSize += count.toLong()
                        progress = (downloadedSize * 100 / fileSize).toInt()
                        if (progress >= triggerThreshold) {
                            triggerThreshold++;
                            this.progressEvent.trigger(progress)
                        }
                    }
                    output.write(data, 0, count)
                }
                output.flush()

                output.close()
                input.close()
                this.progressEvent.dispose()
                this.promiseReturn.resolve(true)
                thread.shutdown()
            } catch (e: Exception) {
                this.progressEvent.dispose()
                if(e.message != null){
                    this.promiseReturn.exception("Download Error", e.message!!)
                } else {
                    this.promiseReturn.exception("Download Error", e.message.toString())
                }
                thread.shutdown()
            }

        }
    }

}