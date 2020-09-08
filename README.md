<!-- ===================================== -->
AGENT APP
core created by hasapu
<!-- ===================================== -->


## Aligning source code between branches (master, staging and development):

- Make sure in ./environment/{environment}/android_{environment}/app/build.gradle, for example both below are set
    - versionCode 66
    - versionName "4.2.5"
- Make sure the package.json in ./environment/{environment}/package_{environment}.json is set accordingly
- Don't update ./android or ./ios, instead update the configuration in ./environment folders

## Running in simulator
```bash
rm -rf $TMPDIR/react-* && rm -rf $TMPDIR/metro-* && rm -rf $TMPDIR/haste-* && watchman watch-del-all && rm -rf node_modules/ && npm install && npm start -- --reset-cache
./sim.sh {environment}
react-native run-android
```

```bash
react-native start
```

## How to build apk in your terminal:

### development

```bash
./build.sh development
```

### staging

```bash
./build.sh staging
```

### master

```bash
cp /your/secret/folder/mykeystore.keystore android/app/mykeystore.keystore
./build.sh master
```

## How to build apk using docker:

```bash 
docker build -t react-native/gradlew:latest -f Dockerfile.onbuild .
docker run --rm -ti react-native/gradlew:latest --volume /your/source/location:/app /bin/bash
./build.sh development
```

