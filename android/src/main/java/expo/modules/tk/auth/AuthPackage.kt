package expo.modules.tk.auth

import android.content.Context
import expo.modules.core.interfaces.ApplicationLifecycleListener
import expo.modules.core.interfaces.Package

class AuthPackage : Package {
    override fun createApplicationLifecycleListeners(context: Context): List<ApplicationLifecycleListener> {
        return listOf(AuthApplicationLifecycleListener())
    }
}