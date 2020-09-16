#!/bin/bash


if [ ! -z "$1" ]
then

	if [[ $1 != "development" && $1 != "staging" && $1 != "master"  ]];
	then

		echo "usage: build.sh [development | staging | master] "

	else

		echo "simulating for" $1
		rm -rf ./android ; rm -rf ./ios ; rm ./package.json
		mkdir -p android && cp -rf ./environment/$1/android_$1/* ./android/
		mkdir -p ios && cp -rf ./environment/$1/ios_$1/* ./ios/
		cp -f ./environment/$1/index_$1.js ./index.js
		cp -f ./environment/$1/package_$1.json ./package.json
		cp -f ./environment/$1/apiHost_$1.js ./src/services/apiHost.js
	fi

else
	echo "usage: build.sh [development | staging | master] "
fi
