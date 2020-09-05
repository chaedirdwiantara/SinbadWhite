<!-- ===================================== -->
AGENT APP
core created by hasapu
<!-- ===================================== -->


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

