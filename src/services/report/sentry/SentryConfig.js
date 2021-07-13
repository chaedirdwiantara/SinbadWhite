import * as Sentry from '@sentry/react-native';
import { SENTRY_DSN } from '@env';

const SentryConfig = () => {
  return Sentry.init({
    dsn: SENTRY_DSN,
    enableAutoSessionTracking: true
  });
};

export { SentryConfig, Sentry };
