#!/bin/bash


if [ ! -z "$1" ]
then

	if [[ $1 != "development" && $1 != "staging" && $1 != "master"  ]];
	then

		echo "usage: build.sh [development | staging | master] "

	else

		echo "building for" $1
		cp -rf ./environment/$1/android_$1 ./android
		cp -rf ./environment/$1/ios_$1 ./ios
		cp -f ./environment/$1/index_$1.js ./index.js
		cp -f ./environment/$1/package_$1.json ./package.json

		rm -rf node_modules
    npm install
#    yarn add react-native-firebase
#    yarn add @react-native-community/toolbar-android
    cd android && chmod +x gradlew && rm -rf ./.gradle && ./gradlew clean && ./gradlew app:assembleRelease

	fi

else
	echo "usage: build.sh [development | staging | master] "
fi
