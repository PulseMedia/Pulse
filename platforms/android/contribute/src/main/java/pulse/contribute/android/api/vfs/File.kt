package pulse.contribute.android.api.vfs

import pulse.contribute.android.util.Helper
import pulse.contribute.android.util.Promise
import java.io.File
import java.lang.Exception

class File { companion object {

    fun writeFile(promiseId: String, path: String, content: String) {
        return Promise(promiseId).resolve(
            Helper.tryActionOrFalse {
                File(path).writeText(content, Charsets.UTF_8)
            }
        )
    }

    fun appendFile(promiseId: String, path: String, content: String) {
        return Promise(promiseId).resolve(
            Helper.tryActionOrFalse {
                File(path).appendText(content, Charsets.UTF_8)
            }
        )
    }

    fun readFile(promiseId: String, path: String) {
        return try {
            val file = File(path)
            Promise(promiseId).resolve(file.readText(Charsets.UTF_8))
        } catch (e: Exception) {
            Promise(promiseId).resolveUndefined()
        }
    }

    fun deleteFile(promiseId: String, path: String) {
        return try {
            val file = File(path)
            Promise(promiseId).resolve(file.exists() && file.isFile && file.delete())
        } catch (e: Exception) {
            Promise(promiseId).resolveFalse()
        }
    }

    fun existsFile(promiseId: String, path: String) {
        return try {
            val file = File(path)
            Promise(promiseId).resolve(file.exists() && file.isFile)
        } catch (e: Exception) {
            Promise(promiseId).resolve(false)
        }
    }

} }