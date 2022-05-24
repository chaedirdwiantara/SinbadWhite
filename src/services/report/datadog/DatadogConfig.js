import {
  DdSdkReactNative,
  DdSdkReactNativeConfiguration
} from '@datadog/mobile-react-native';

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
config.sessionSamplingRate = 100;
console.log('HAI THERE');
await DdSdkReactNative.initialize(config);

// Once SDK is initialized you need to setup view tracking to be able to see data in the RUM Dashboard.
