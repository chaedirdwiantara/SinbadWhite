import React from 'react';
import { Alert, BackHandler } from 'react-native';
import { setJSExceptionHandler } from 'react-native-exception-handler';
import { Sentry, SentryConfig } from './SentryConfig';

SentryConfig();

const handleError = () => {
  Alert.alert(
    'Aplikasi Mengalami Kendala',
    'Silahkan coba kembali membuka aplikasi, jika masih terjadi kendala silahkan hubungin CS kami',
    [
      {
        text: 'OK',
        onPress: () => BackHandler.exitApp()
      }
    ]
  );
};

setJSExceptionHandler((error, isFatal) => {
  if (isFatal) {
    Sentry.configureScope(function(scope) {
      scope.setTag('Bug Type', 'Crash');
      scope.setTag('Team', 'mobile');
      scope.setLevel(Sentry.Severity.Critical);
      Sentry.captureException(error, scope);
    });
    handleError(error);
  }
});

const SentryCore = ({ children }) => {
  return <>{children}</>;
};

export default SentryCore;
