package com.sinbad.agentdevelopment;

import android.app.Application;
import android.content.Context;
import com.facebook.react.PackageList;
import com.facebook.react.ReactApplication;
import com.facebook.react.ReactNativeHost;
import com.facebook.react.ReactPackage;
import com.facebook.soloader.SoLoader;
import com.airbnb.android.react.maps.MapsPackage;
import java.lang.reflect.InvocationTargetException;
import java.util.List;
import io.invertase.firebase.messaging.RNFirebaseMessagingPackage;
import io.invertase.firebase.notifications.RNFirebaseNotificationsPackage;
import io.invertase.firebase.firestore.RNFirebaseFirestorePackage;
import io.invertase.firebase.database.RNFirebaseDatabasePackage;
import com.microsoft.codepush.react.CodePush;
import com.moengage.react.MoEInitializer;
import com.moengage.react.MoEReactPackage;
import com.moengage.core.MoEngage;
import com.newrelic.agent.android.NewRelic;
import com.rnnewrelic.NewRelicPackage;

public class MainApplication extends Application implements ReactApplication {

  private final ReactNativeHost mReactNativeHost =
      new ReactNativeHost(this) {
        @Override
        public boolean getUseDeveloperSupport() {
          return BuildConfig.DEBUG;
        }

        @Override
        protected String getJSBundleFile() {
          return CodePush.getJSBundleFile();
        }

        @Override
        protected List<ReactPackage> getPackages() {
          @SuppressWarnings("UnnecessaryLocalVariable")
          List<ReactPackage> packages = new PackageList(this).getPackages();
          // Packages that cannot be autolinked yet can be added manually here, for example:
          // packages.add(new MyReactNativePackage());
          // packages.add(new MapsPackage());
          packages.add(new RNFirebaseMessagingPackage());
          packages.add(new RNFirebaseNotificationsPackage());
          packages.add(new RNFirebaseFirestorePackage());
          packages.add(new RNFirebaseDatabasePackage());
          packages.add(new NewRelicPackage());
          packages.add(new MoEReactPackage());
          return packages;
        }

        @Override
        protected String getJSMainModuleName() {
          return "index";
        }
      };

  @Override
  public ReactNativeHost getReactNativeHost() {
    return mReactNativeHost;
  }

  @Override
  public void onCreate() {
    super.onCreate();
    SoLoader.init(this, /* native exopackage */ false);
    if (!BuildConfig.NEWRELIC_KEY.isEmpty() && BuildConfig.NEWRELIC_KEY != null) {
      NewRelic.withApplicationToken(BuildConfig.NEWRELIC_KEY).start(this);
    }

    if(!BuildConfig.MOENGAGE_KEY.isEmpty() && BuildConfig.MOENGAGE_KEY != null){
        MoEngage.Builder moEngage = new MoEngage.Builder(this, BuildConfig.MOENGAGE_KEY);
        MoEInitializer.INSTANCE.initialize(getApplicationContext(), moEngage);
    }
  }
}
