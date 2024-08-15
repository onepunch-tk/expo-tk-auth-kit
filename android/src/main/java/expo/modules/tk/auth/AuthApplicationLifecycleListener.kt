package expo.modules.tk.auth

import android.app.Application
import android.util.Log
import com.kakao.sdk.common.KakaoSdk
import expo.modules.core.interfaces.ApplicationLifecycleListener

class AuthApplicationLifecycleListener : ApplicationLifecycleListener {

    override fun onCreate(application: Application) {
        val kakaoAppKeyResId = application.resources.getIdentifier("kakao_app_key","string",application.packageName)
        Log.d("KAKAO SDK",kakaoAppKeyResId.toString())
        if(kakaoAppKeyResId != 0) {
            val kakaoAppKey = application.getString(kakaoAppKeyResId)
            if(!kakaoAppKey.isNullOrEmpty()) {
                try {
                    Log.d("KAKAO SDK","Kakao SDK Init start...")
                    KakaoSdk.init(application,kakaoAppKey)
                    Log.d("KAKAO SDK","Kakao SDK Init end...")
                } catch (e:Error) {
                  Log.e("KAKAO SDK",e.message?:"Kakao SDK Init Error")
                }
            }
        }
    }
}
