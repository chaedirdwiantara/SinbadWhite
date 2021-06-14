import * as Sentry from '@sentry/react-native';

const SentryConfig = () => {
  return Sentry.init({
    dsn:
      'https://93e4086671404bb294dcd5fc41c3e2a1@o584497.ingest.sentry.io/5737234',
    enableAutoSessionTracking: true
  });
};

export { SentryConfig, Sentry };
