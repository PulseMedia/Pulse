package pulse.contribute.android.api.vfs

import android.webkit.JavascriptInterface
import org.json.JSONArray
import org.json.JSONObject
import pulse.contribute.android.util.Helper
import pulse.contribute.android.util.Promise
import java.io.File
import java.lang.Exception

class Directory { companion object {

    fun existsDirectory(promiseId: String, path: String) {
        return try {
            val dir = File(path)
            Promise(promiseId).resolve(dir.exists() && dir.isDirectory)
        } catch (e: Exception) {
            Promise(promiseId).resolve(false)
        }
    }

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

    fun deleteDirectory(promiseId: String, path: String) {
        return try {
            val dir = File(path)
            Promise(promiseId).resolve(dir.exists() && dir.isDirectory && dir.deleteRecursively())
        } catch (e: Exception) {
            Promise(promiseId).resolve(false)
        }
    }

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
        return Promise(promiseId).resolve(
            JSONObject(
                hashMapOf(
                    "dirs" to dirs,
                    "files" to files
                ) as Map<String, *>
            )
        )
    }

} }