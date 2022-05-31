package pulse.contribute.android.util

import java.lang.Exception

class Helper(){

    companion object {

        fun tryActionOrFalse(action: (()->Unit)): Boolean{
            return try {
                action.invoke()
                true
            } catch (e: Exception){
                false
            }
        }



    }

}