package pulse.contribute.android.util

class PromiseEvent(private val promiseEvent: String){

    companion object Static {
        //gets defined internally on App Start
        var promiseEventResolver: ((Any?, Boolean, String) -> Unit)? = null
        var promiseEventDisposer: ((String) -> Unit)? = null
    }

    var isValid: Boolean = (promiseEvent != "[UNDEFINED_EVENT]")

    fun trigger(returnValue: Any?, isLastTrigger: Boolean = false) {
        if(promiseEvent == "[UNDEFINED_EVENT]"){ return }
        promiseEventResolver?.invoke(returnValue, isLastTrigger, promiseEvent)
    }

    fun dispose() {
        if(promiseEvent == "[UNDEFINED_EVENT]"){ return }
        promiseEventDisposer?.invoke(promiseEvent)
    }

}