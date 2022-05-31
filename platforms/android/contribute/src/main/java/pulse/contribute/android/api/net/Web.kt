package pulse.contribute.android.api.net

import org.json.JSONArray
import org.json.JSONObject
import pulse.contribute.android.ApiMap
import pulse.contribute.android.App
import pulse.contribute.android.util.Promise
import pulse.contribute.android.util.PromiseEvent
import java.io.BufferedInputStream
import java.io.FileOutputStream
import java.io.InputStream
import java.io.OutputStream
import java.lang.Exception
import java.net.HttpURLConnection
import java.net.URL
import java.net.URLConnection
import java.util.concurrent.ExecutorService
import java.util.concurrent.Executors

class Web { companion object {

    fun asyncFetch(promiseId: String, url: String, optionsJson: String) {
        try {
            val conn: HttpURLConnection = URL(url).openConnection() as HttpURLConnection
            conn.useCaches = false
            conn.allowUserInteraction = false
            conn.setRequestProperty("User-Agent", App.userAgent)
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

            conn.connectTimeout = options.optInt("timeout", 1000)

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

    fun downloadFile(promiseId: String, url: String, saveTo: String, optionsJson: String, progressEventId: String){
        val progressEvent = PromiseEvent(progressEventId)
        val promiseReturn = Promise(promiseId)
        val thread = Executors.newSingleThreadExecutor()
        thread.execute {
            var count: Int
            try {
                val uri = URL(url)
                val conn: URLConnection = uri.openConnection()
                conn.setRequestProperty("Accept-Encoding", "identity");
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

                val input: InputStream = BufferedInputStream(uri.openStream(), 8192)
                val output: OutputStream = FileOutputStream(saveTo)
                val data = ByteArray(1024)
                var downloadedSize: Long = 0
                var progress: Int = 0
                var triggerThreshold = 1;
                progressEvent.trigger(progress)
                while (input.read(data).also { count = it } != -1) {
                    if(progressEvent.isValid) {
                        downloadedSize += count.toLong()
                        progress = (downloadedSize * 100 / fileSize).toInt()
                        if (progress >= triggerThreshold) {
                            triggerThreshold++;
                            progressEvent.trigger(progress)
                        }
                    }
                    output.write(data, 0, count)
                }
                output.flush()

                output.close()
                input.close()
                progressEvent.dispose()
                promiseReturn.resolve(true)
                thread.shutdown()
            } catch (e: Exception) {
                progressEvent.dispose()
                if(e.message != null){
                    promiseReturn.exception("Download Error", e.message!!)
                } else {
                    promiseReturn.exception("Download Error", e.message.toString())
                }
                thread.shutdown()
            }

        }
    }

} }