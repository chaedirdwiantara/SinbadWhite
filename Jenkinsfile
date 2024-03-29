def getSlackChannel(env) {
    if (env == 'production') {
        return '#download-apps-production'
    } else if (env == 'demo') {
        return '#download-apps-demo'
    } else if(env == 'sandbox') {
        return '#download-apps-sandbox'
    } else if(env == 'staging') {
        return '#download-apps-staging'
    } else {
        return '#download-apps-development'
    }
}

pipeline {
    agent {
        node {
            label 'worker'
        }
    }

    options {
        timestamps()
    }

    parameters {
        choice(
            name: 'CI_GIT_TYPE',
            choices: ['', 'branch', 'commit', 'tag'],
            description: 'Which Environment?'
        )
        string(
            name: 'CI_GIT_SOURCE',
            defaultValue: '',
            description: 'Which git source?'
        )
        choice(
            name: 'CI_IS_PLAYSTORE',
            choices: ['No', 'Yes'],
            description: 'Deployment To Google Play Store?'
        )
        choice(
            name: 'CI_IS_CODEPUSH',
            choices: ['No', 'Yes'],
            description: 'Deployment With Code Push?'
        )
        string(
            name: 'CI_CODEPUSH_MESSAGE',
            defaultValue: '',
            description: 'Code Push Message'
        )
        string(
            name: 'GIT_TAG',
            defaultValue: '',
            description: 'TAG number'
        )
        string(
            name: 'GIT_TAG_TITLE',
            defaultValue: '',
            description: 'Release TAG Title'
        )
        string(
            name: 'GIT_TAG_MESSAGE',
            defaultValue: '',
            description: 'Release TAG Messages'
        )
    }

    environment {
        SINBAD_REPO = 'mobile-sinbad-white'
        AWS_CREDENTIAL = 'automation_aws'
        SINBAD_ENV = "${env.JOB_BASE_NAME}"
        WOKRSPACE = "${env.WORKSPACE}"
        SINBAD_URI_DOWNLOAD = "http://app-download.sinbad.web.id"
        SLACK_CHANNEL = getSlackChannel(SINBAD_ENV)

        // Andorid Lib
        SDK_URL = "https://dl.google.com/android/repository/commandlinetools-linux-6609375_latest.zip"
        ANDROID_HOME = "${WORKSPACE}/android-sdk"
        ANDROID_VERSION = "30"
        ANDROID_BUILD_TOOLS_VERSION = "30.0.2"
        GRADLE_HOME = "${WORKSPACE}/android-gradle"
        GRADLE_VERSION = "6.6.1"
        MAVEN_HOME = "${WORKSPACE}/android-maven"
        MAVEN_VERSION = "3.6.3"
    }
    stages {
        stage('Checkout') {
            steps {
                script {
                    if(params.CI_GIT_TYPE != '' || params.CI_GIT_SOURCE != '') {
                        if(params.CI_GIT_TYPE == 'branch' || params.CI_GIT_TYPE == ''){
                            checkout([
                                $class: 'GitSCM',
                                branches: [[name: "refs/remotes/origin/${params.CI_GIT_SOURCE}"]],
                                doGenerateSubmoduleConfigurations: scm.doGenerateSubmoduleConfigurations,
                                extensions: scm.extensions,
                                userRemoteConfigs: scm.userRemoteConfigs
                            ])
                        } else if(params.CI_GIT_TYPE == 'commit') {
                            checkout([
                                $class: 'GitSCM',
                                branches: [[name: "${params.CI_GIT_SOURCE}"]],
                                doGenerateSubmoduleConfigurations: scm.doGenerateSubmoduleConfigurations,
                                extensions: scm.extensions,
                                userRemoteConfigs: scm.userRemoteConfigs
                            ])
                        } else if(params.CI_GIT_TYPE == 'tag') {
                            checkout([
                                $class: 'GitSCM',
                                branches: [[name: "refs/tags/${params.CI_GIT_SOURCE}"]],
                                doGenerateSubmoduleConfigurations: scm.doGenerateSubmoduleConfigurations,
                                extensions: scm.extensions,
                                userRemoteConfigs: scm.userRemoteConfigs
                            ])
                        }
                    }

                    env.GIT_MESSAGE = sh(returnStdout: true, script: 'git log -1 --pretty=%B').trim()
                    env.GIT_COMMIT = sh(returnStdout: true, script: 'git rev-parse HEAD').trim()
                    env.GIT_COMMIT_SHORT = sh(returnStdout: true, script: "git rev-parse --short=8 ${env.GIT_COMMIT}").trim()
                    env.GIT_AUTHOR = sh(returnStdout: true, script: "git --no-pager show -s --format='%an' ${env.GIT_COMMIT}").trim()
                    env.GIT_TAG = sh(returnStdout: true, script: "git tag --sort version:refname | tail -1").trim()
                }
            }
        }
        stage('Download ENV') {
            steps {
                script {
                    withAWS(credentials: "${AWS_CREDENTIAL}") {
                        s3Download(file: 'index.js', bucket: 'sinbad-env', path: "${SINBAD_ENV}/${SINBAD_REPO}/index.js", force: true)
                        s3Download(file: 'src/services/apiHost.js', bucket: 'sinbad-env', path: "${SINBAD_ENV}/${SINBAD_REPO}/apiHost.js", force: true)
                        s3Download(file: 'android/app/google-services.json', bucket: 'sinbad-env', path: "${SINBAD_ENV}/${SINBAD_REPO}/google-services.json", force: true)
                        s3Download(file: 'android/app/mykeystore.keystore', bucket: 'sinbad-env', path: "${SINBAD_ENV}/${SINBAD_REPO}/mykeystore.keystore", force: true)
                        s3Download(file: 'android/app/src/main/res/values/strings.xml', bucket: 'sinbad-env', path: "${SINBAD_ENV}/${SINBAD_REPO}/strings.xml", force: true)
                        s3Download(file: '.env', bucket: 'sinbad-env', path: "${SINBAD_ENV}/${SINBAD_REPO}/.env", force: true)
                        if(SINBAD_ENV == 'production') {
                            s3Download(file: 'android/app/newrelic.properties', bucket: 'sinbad-env', path: "${SINBAD_ENV}/${SINBAD_REPO}/newrelic.properties", force: true)
                        }
                    }
                }
            }
        }
        stage('Install Dependency') {
            parallel {
                stage('Install Android SDK') {
                    steps {
                        sh "if [ -d ${ANDROID_HOME} ]; then rm -rf ${ANDROID_HOME}; fi && mkdir ${ANDROID_HOME}"
                        sh '''
                            cd $ANDROID_HOME && \
                            curl -sL -o android.zip $SDK_URL && unzip android.zip && rm android.zip && \
                            mkdir -p cmdline-tools ; mv tools cmdline-tools && \
                            yes | $ANDROID_HOME/cmdline-tools/tools/bin/sdkmanager --licenses
                        '''
                        sh '''
                            $ANDROID_HOME/cmdline-tools/tools/bin/sdkmanager "build-tools;$ANDROID_BUILD_TOOLS_VERSION" \
                            "platforms;android-$ANDROID_VERSION" \
                            "platform-tools"
                        '''
                    }
                }
                stage('Install Gradle & Maven') {
                    steps {
                        sh "if [ -d ${GRADLE_HOME} ]; then rm -rf ${GRADLE_HOME}; fi && mkdir ${GRADLE_HOME}"
                        sh '''
                            cd $GRADLE_HOME && \
                            curl -sL -o gradle.zip https://services.gradle.org/distributions/gradle-$GRADLE_VERSION-bin.zip && \
                            unzip -d $GRADLE_HOME gradle.zip && rm gradle.zip
                        '''

                        sh "if [ -d ${MAVEN_HOME} ]; then rm -rf ${MAVEN_HOME}; fi && mkdir ${MAVEN_HOME}"
                        sh '''
                            cd $MAVEN_HOME && \
                            curl -sL -o maven.zip https://archive.apache.org/dist/maven/maven-3/$MAVEN_VERSION/binaries/apache-maven-$MAVEN_VERSION-bin.zip && \
                            unzip -d $MAVEN_HOME maven.zip && rm maven.zip
                        '''
                    }
                }
                stage('Install Yarn & React') {
                    steps {
                        sshagent(credentials : ['ssh-sinbad']) {
                            sh "yarn global add react-native-cli create-react-native-app expo-cli"
                            sh "npm ci"
                            sh "npx jetify"
                        }
                    }
                }
                stage('Change Environment') {
                    steps {
                        script {
                            if(params.CI_IS_PLAYSTORE == "Yes"){
                                sh '''
                                    find android/ -type f |
                                    while read file
                                    do
                                        sed -i 's/agentdevelopment/agent/g' $file
                                    done
                                '''
                                if(SINBAD_ENV == 'production') {
                                    sh '''
                                        find android/ -type f |
                                        while read file
                                        do
                                            sed -i 's/ic_launcher_dev/ic_launcher/g' $file
                                            sed -i 's/ic_launcher_round_dev/ic_launcher_round/g' $file
                                        done
                                    '''
                                }
                            }else{
                                if(SINBAD_ENV != 'development') {
                                    if(SINBAD_ENV == 'staging') {
                                        sh '''
                                            find android/ -type f |
                                            while read file
                                            do
                                                sed -i 's/agentdevelopment/agentstaging/g' $file
                                            done
                                        '''
                                    } else if(SINBAD_ENV == 'sandbox') {
                                        sh '''
                                            find android/ -type f |
                                            while read file
                                            do
                                                sed -i 's/agentdevelopment/agentsandbox/g' $file
                                                sed -i 's/ic_launcher_dev/ic_launcher_stg/g' $file
                                                sed -i 's/ic_launcher_round_dev/ic_launcher_round_stg/g' $file
                                            done
                                        '''
                                    } else if(SINBAD_ENV == 'demo') {
                                        sh '''
                                            find android/ -type f |
                                            while read file
                                            do
                                                sed -i 's/agentdevelopment/agentdemo/g' $file
                                                sed -i 's/ic_launcher_dev/ic_launcher_stg/g' $file
                                                sed -i 's/ic_launcher_round_dev/ic_launcher_round_stg/g' $file
                                            done
                                        '''
                                    } else if(SINBAD_ENV == 'production') {
                                        sh '''
                                            find android/ -type f |
                                            while read file
                                            do
                                                sed -i 's/agentdevelopment/agent/g' $file
                                                sed -i 's/ic_launcher_dev/ic_launcher/g' $file
                                                sed -i 's/ic_launcher_round_dev/ic_launcher_round/g' $file
                                            done
                                        '''
                                    }
                                    
                                }
                            }
                            sh "find android -type f -name '.!*!*' -delete"
                        }
                    }
                }
            }

        }
        stage('Export Path') {
            steps {
                sh "export PATH=$PATH:${ANDROID_HOME}/emulator"
                sh "export PATH=$PATH:${ANDROID_HOME}/tools"
                sh "export PATH=$PATH:${ANDROID_HOME}/tools/bin"
                sh "export PATH=$PATH:${GRADLE_HOME}/gradle-${GRADLE_VERSION}/bin"
                sh "export PATH=$PATH:${MAVEN_HOME}/apache-maven-${MAVEN_VERSION}/bin"
                sh "echo PATH=$PATH:${ANDROID_HOME}/platform-tools>>/home/ubuntu/bash.bashrc"
            }
        }
        stage('Source Map') {
            when { expression { SINBAD_ENV != 'development' && SINBAD_ENV != 'staging' } }
            steps {
                script{
                    // Get Version Name
                    dir("android") {
                        sh "rm -f -- gradleInfo.txt"
                        sh "./gradlew -q printVersionName > gradleInfo.txt"
                        env.APP_VERSION_NAME = sh(returnStdout: true, script: 'tail -n 1 gradleInfo.txt').trim()
                    }

                    // Get Version Code
                    dir("android") {
                        sh "rm -f -- gradleInfo.txt"
                        sh "./gradlew -q printVersionCode > gradleInfo.txt"
                        env.APP_VERSION_CODE = sh(returnStdout: true, script: 'tail -n 1 gradleInfo.txt').trim()
                    }

                    // Get APPLICATION
                    dir("android") {
                        sh "rm -f -- gradleInfo.txt"
                        sh "./gradlew -q printApplicationId > gradleInfo.txt"
                        env.APP_ID = sh(returnStdout: true, script: 'tail -n 1 gradleInfo.txt').trim()
                    }

                    sh "if [ -d ${WORKSPACE}/source_maps ]; then rm -Rf ${WORKSPACE}/source_maps; fi"
                    sh "mkdir ${WORKSPACE}/source_maps"
                    sh "react-native bundle --dev false --platform android --entry-file index.js --bundle-output source_maps/index.android.bundle  --sourcemap-output source_maps/index.android.bundle.packager.map"
                    sh "node_modules/hermes-engine/linux64-bin/hermesc -emit-binary -out source_maps/index.android.bundle.compiler.hbc source_maps/index.android.bundle -output-source-map"
                    sh "node_modules/react-native/scripts/compose-source-maps.js source_maps/index.android.bundle.packager.map source_maps/index.android.bundle.compiler.hbc.map -o source_maps/index.android.bundle.map"
                    withCredentials([string(credentialsId: 'sentry-sinbad', variable: 'SENTRYTOKEN')]) {
                        sh "node_modules/@sentry/cli/sentry-cli --auth-token ${SENTRYTOKEN} releases --org sinbad-id --project sinbad-white-${SINBAD_ENV} files ${env.APP_ID}@${env.APP_VERSION_NAME}+${env.APP_VERSION_CODE} upload-sourcemaps --dist ${env.APP_VERSION_CODE} --strip-prefix . --rewrite source_maps/index.android.bundle source_maps/index.android.bundle.map"
                    }
                }
            }
        }
        stage('Deployment') {
            parallel {
                stage("Upload to S3") {
                    when { expression { params.CI_IS_PLAYSTORE == "No" && params.CI_IS_CODEPUSH == "No" } }
                    steps {
                        sh '''
                            cd android && \
                            fastlane apk
                        '''
                        sh "tar czf ${WORKSPACE}/${SINBAD_REPO}-${env.GIT_TAG}-${env.GIT_COMMIT_SHORT}.tar.gz -C ${WORKSPACE}/android/app/build/outputs/apk/release/ ."
                        withAWS(credentials: "${AWS_CREDENTIAL}") {
                            s3Upload(file: "${WORKSPACE}/${SINBAD_REPO}-${env.GIT_TAG}-${env.GIT_COMMIT_SHORT}.tar.gz", bucket: 'app-download.sinbad.web.id', path: "${SINBAD_ENV}/${SINBAD_REPO}-${env.GIT_TAG}-${env.GIT_COMMIT_SHORT}-${currentBuild.number}.tar.gz")
                            s3Upload(file: "${WORKSPACE}/${SINBAD_REPO}-${env.GIT_TAG}-${env.GIT_COMMIT_SHORT}.tar.gz", bucket: 'app-download.sinbad.web.id', path: "${SINBAD_ENV}/${SINBAD_REPO}-latest.tar.gz")
                        }
                        slackSend color: '#FFFFFF', channel: "${SLACK_CHANNEL}", message: """
Hi Sailors
We have new APK Version
Application: ${SINBAD_REPO}
Environment: ${SINBAD_ENV}
Commit ID: ${env.GIT_COMMIT}
Changes Message: ${env.GIT_MESSAGE}
You can download this application in here
${SINBAD_URI_DOWNLOAD}/${SINBAD_ENV}/${SINBAD_REPO}-${env.GIT_TAG}-${env.GIT_COMMIT_SHORT}-${currentBuild.number}.tar.gz
Or latest application for environment ${SINBAD_ENV} in here
${SINBAD_URI_DOWNLOAD}/${SINBAD_ENV}/${SINBAD_REPO}-latest.tar.gz
            """
                        sh "rm ${SINBAD_REPO}*"
                    }
                }
                stage("Play Store") {
                    when { expression { params.CI_IS_PLAYSTORE == "Yes" } }
                    steps {
                        script {
                            withAWS(credentials: "${AWS_CREDENTIAL}") {
                                s3Download(file: 'android/fastlane/config/sinbad.json', bucket: 'sinbad-env', path: "${SINBAD_ENV}/${SINBAD_REPO}/sinbad.json", force: true)
                            }
                            sh '''
                                cd android && \
                                fastlane aab
                            '''
                            if(SINBAD_ENV == 'development') {
                                sh '''
                                    cd android && \
                                    fastlane internal
                                '''
                            }else if(SINBAD_ENV == 'staging') {
                                sh '''
                                    cd android && \
                                    fastlane staging
                                '''
                            }else if(SINBAD_ENV == 'sandbox') {
                                sh '''
                                    cd android && \
                                    fastlane sandbox
                                '''
                            }else if(SINBAD_ENV == 'demo') {
                                sh '''
                                    cd android && \
                                    fastlane demo
                                '''
                            }else if(SINBAD_ENV == 'production') {
                                sh '''
                                    cd android && \
                                    fastlane production
                                '''
                            }
                        }
                    }
                }
                stage("CodePush") {
                    when { expression { params.CI_IS_CODEPUSH == "Yes" } }
                    steps {
                        script {
                            withCredentials([usernamePassword(credentialsId: 'appcenter', usernameVariable: 'USERID', passwordVariable: 'USERTOKEN')]){
                                sh "appcenter login --token ${USERTOKEN}"
                                if(SINBAD_ENV == 'demo') {
                                    sh "appcenter codepush release-react -a sinbad-app/Sinbad --description '${params.CI_CODEPUSH_MESSAGE}' -m -d Staging"
                                }else if(SINBAD_ENV == 'production') {
                                    sh "appcenter codepush release-react -a sinbad-app/Sinbad --description '${params.CI_CODEPUSH_MESSAGE}' -m -d Production"
                                }
                            }
                        }
                    }
                }
            }
        }
        stage('Tagging PRODUCTION') {
               when { expression {SINBAD_ENV == "production" } }
                  steps {
              script {
                sh "gh release create ${params.GIT_TAG} --notes '${params.GIT_TAG_MESSAGE}' --title '${params.GIT_TAG_TITLE}'"
				}	
			}
		}
        stage('Code Analysis') {
            when { expression { SINBAD_ENV != "production" && SINBAD_ENV != "demo" } }
            steps{
                script{
                    catchError(buildResult: 'SUCCESS', stageResult: 'FAILURE'){
                        try{
                            def scannerHome = tool 'SonarQubeScanner';
                            withSonarQubeEnv('sonarqube-sinbad') {
                                sh "${scannerHome}/bin/sonar-scanner"
                            }
                        }catch (Exception e) {
                            echo 'Exception occurred: ' + e.toString()
                            sh "exit 1"
                        }
                    }
                }
            }
        }
    }

    post {
        success {
            script{
                slackSend color: '#8cff00', message:  """
Status : Deployment Success! :jkndance:
Application : ${SINBAD_REPO}
Version : ${env.GIT_TAG}
Commit ID : ${env.GIT_COMMIT}
Changes Message : ${env.GIT_MESSAGE}""", channel: "${SLACK_CHANNEL}"
                }
        }
        failure {
            script{
                if(SINBAD_ENV == 'sandbox') {
                    slackSend color: '#ff0000', message:  """
Status : Deployment Failed!!! :alertsirene:
Application : ${SINBAD_REPO}
Version : ${env.GIT_TAG}
Commit ID : ${env.GIT_COMMIT}
Changes Message : ${env.GIT_MESSAGE}""", channel: "${SLACK_CHANNEL}"
					}
				}
			}
		}
	}
