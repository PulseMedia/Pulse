package pulse.contribute.android.util

class Promise(private val promiseRequest: String){

    companion object Static {
        //gets defined internally on App Start
        var promiseResolver: ((Any?, String) -> Unit)? = null
        var promiseUndefinedResolver: ((String) -> Unit)? = null
        var promiseObjectResolver: ((String, Any?, String) -> Unit)? = null
        var promiseException: ((String, String, String) -> Unit)? = null
    }

    fun resolve(returnValue: Any?) {
        promiseResolver?.invoke(returnValue, promiseRequest)
    }

    fun resolveUndefined() {
        promiseUndefinedResolver?.invoke(promiseRequest)
    }

    fun resolveTrue() {
        resolve(true)
    }

    fun resolveFalse() {
        resolve(false)
    }

    fun resolveObject(type: String, returnValue: Any?) {
        promiseObjectResolver?.invoke(type, returnValue, promiseRequest)
    }

    fun exception(name: String, message: String) {
        promiseException?.invoke("Native: $name", message, promiseRequest)
    }

}