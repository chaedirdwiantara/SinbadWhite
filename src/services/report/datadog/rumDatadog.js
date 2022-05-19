import {
  DdSdkReactNative,
  DdSdkReactNativeConfiguration,
  DdTrace
} from '@datadog/mobile-react-native';

export const startRecordTransaction = transactionModule => {
  const config = new DdSdkReactNativeConfiguration(
    'pubeac8cf838454dd990b8b792d1b15f0ce',
    'SANDBOX',
    '95087185-f9c5-4192-922d-7d7d88e244ee',
    true, // track User interactions (e.g.: Tap on buttons. You can use 'accessibilityLabel' element property to give tap action the name, otherwise element type will be reported)
    true, // track XHR Resources
    true // track Errors
  );
  // Optional: Select your Datadog website (one of "US", "EU" or "GOV")
  config.site = 'US';
  // Optional: enable or disable native crash reports
  config.nativeCrashReportEnabled = true;
  // Optional: sample RUM sessions (here, 80% of session will be sent to Datadog. Default = 100%)
  config.sessionSamplingRate = 80;

  DdSdkReactNative.initialize(config);
  // This will create a new Transaction for you
  const startSpan = DdTrace.startSpan(
    transactionModule,
    { custom: 42 },
    Date.now()
  );
  return { startSpan };
};

export const finishRecordTransaction = startSpan => {
  // This will create a new Transaction for you
  const finishSpan = DdTrace.finishSpan(startSpan, { custom: 21 }, Date.now());
  return { finishSpan };
};

// import { Sentry } from '../SentryConfig';
// /** SENTRY CHECK SHOP CHECKOUT */
// export const recordTransactionS = transactionModule => {
//   // This will create a new Transaction for you
//   const transaction = Sentry.startTransaction({ name: transactionModule });
//   Sentry.getCurrentHub().configureScope(scope => scope.setSpan(transaction));
//   const span = transaction.startChild({
//     op: transactionModule
//   });
//   return { transaction, span };
// };
