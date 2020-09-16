#!/bin/bash


if [ ! -z "$1" ]
then

	if [[ $1 != "development" && $1 != "staging" && $1 != "master"  ]];
	then

		echo "usage: build.sh [development | staging | master] "

	else

		echo "building for" $1
		rm -rf ./android ; rm -rf ./ios ; rm ./package.json
		cp -rf ./environment/$1/android_$1 ./android
		cp -rf ./environment/$1/ios_$1 ./ios
		cp -f ./environment/$1/index_$1.js ./index.js
		cp -f ./environment/$1/package_$1.json ./package.json
		cp -f ./environment/$1/apiHost_$1.js ./src/services/apiHost.js

#    cp /home/bondhan/sinbad/keystore/Keystore/Keystore/Agent/mykeystore.keystore /home/bondhan/workspace/mobile/agent-v1.0/android/app/

    rm -rf $TMPDIR/react-* ; rm -rf $TMPDIR/metro-* ; rm -rf $TMPDIR/haste-* ; watchman watch-del-all ; rm -rf node_modules/ ; npm install
    npx jetify
    cd android ; chmod +x gradlew ; rm -rf ./.gradle ; ./gradlew clean ; ./gradlew cleanBuildCache ; ./gradlew app:assembleRelease

	fi

else
	echo "usage: build.sh [development | staging | master] "
fi
