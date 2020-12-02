fastlane documentation
================
# Installation

Make sure you have the latest version of the Xcode command line tools installed:

```
xcode-select --install
```

Install _fastlane_ using
```
[sudo] gem install fastlane -NV
```
or alternatively using `brew install fastlane`

# Available Actions
## Android
### android apk
```
fastlane android apk
```
Generate APK files
### android aab
```
fastlane android aab
```
Generate AAB files
### android internal
```
fastlane android internal
```
Upload AAB Files to Internal Test Play Store
### android staging
```
fastlane android staging
```
Upload AAB Files to Staging Play Store
### android sandbox
```
fastlane android sandbox
```
Upload AAB Files to Sandbox Play Store
### android demo
```
fastlane android demo
```
Upload AAB Files to Demo Play Store
### android alpha
```
fastlane android alpha
```
Upload AAB Files to Alpha Play Store
### android beta
```
fastlane android beta
```
Upload AAB Files to Beta Play Store
### android production
```
fastlane android production
```
Upload AAB Files to Production Play Store

----

This README.md is auto-generated and will be re-generated every time [fastlane](https://fastlane.tools) is run.
More information about fastlane can be found on [fastlane.tools](https://fastlane.tools).
The documentation of fastlane can be found on [docs.fastlane.tools](https://docs.fastlane.tools).
