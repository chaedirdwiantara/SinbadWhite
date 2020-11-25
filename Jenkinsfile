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
            name: 'CI_IS_CODEPUSH',
            choices: ['No', 'Yes'],
            description: 'Deployment With Code Push?'
        )
        string(
            name: 'CI_CODEPUSH_MESSAGE',
            defaultValue: '',
            description: 'Code Push Message'
        )
    }

    environment {
        SINBAD_REPO = 'mobile-sinbad-white'
        AWS_CREDENTIAL = 'automation_aws'
        SINBAD_ENV = "${env.JOB_BASE_NAME}"
        WOKRSPACE = "${env.WORKSPACE}"
        SINBAD_URI_DOWNLOAD = "http://app-download.sinbad.web.id"

        // Andorid Lib
        SDK_URL = "https://dl.google.com/android/repository/commandlinetools-linux-6609375_latest.zip"
        ANDROID_HOME = "${WORKSPACE}/android-sdk"
        ANDROID_VERSION = "29"
        ANDROID_BUILD_TOOLS_VERSION = "29.0.2"
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
                withAWS(credentials: "${AWS_CREDENTIAL}") {
                    s3Download(file: 'index.js', bucket: 'sinbad-env', path: "${SINBAD_ENV}/${SINBAD_REPO}/index.js", force: true)
                    s3Download(file: 'src/services/apiHost.js', bucket: 'sinbad-env', path: "${SINBAD_ENV}/${SINBAD_REPO}/apiHost.js", force: true)
                    s3Download(file: 'android/app/google-services.json', bucket: 'sinbad-env', path: "${SINBAD_ENV}/${SINBAD_REPO}/google-services.json", force: true)
                    s3Download(file: 'android/app/mykeystore.keystore', bucket: 'sinbad-env', path: "${SINBAD_ENV}/${SINBAD_REPO}/mykeystore.keystore", force: true)
                    s3Download(file: 'android/app/src/main/res/values/strings.xml', bucket: 'sinbad-env', path: "${SINBAD_ENV}/${SINBAD_REPO}/strings.xml", force: true)
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
                            curl -sL -o maven.zip https://www-us.apache.org/dist/maven/maven-3/$MAVEN_VERSION/binaries/apache-maven-$MAVEN_VERSION-bin.zip && \
                            unzip -d $MAVEN_HOME maven.zip && rm maven.zip
                        '''
                    }
                }
                stage('Install Yarn & React') {
                    steps {
                        sh "yarn global add react-native-cli create-react-native-app expo-cli"
                    }
                }
                stage('Change Environment') {
                    steps {
                        script {
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
                                        done
                                    '''
                                } else if(SINBAD_ENV == 'demo') {
                                    sh '''
                                        find android/ -type f |
                                        while read file
                                        do
                                            sed -i 's/agentdevelopment/agentdemo/g' $file
                                        done
                                    '''
                                } else if(SINBAD_ENV == 'production') {
                                    sh '''
                                        find android/ -type f |
                                        while read file
                                        do
                                            sed -i 's/agentdevelopment/agent/g' $file
                                        done
                                    '''
                                }
                                sh "find android -type f -name '.!*!*' -delete"
                            }
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
        stage('Build') {
            steps {
                sh "npm install"
                sh "npx jetify"
                sh '''
                    cd android && \
                    chmod +x gradlew ; rm -rf ./.gradle ; ./gradlew clean ; ./gradlew cleanBuildCache ; ./gradlew app:assembleRelease
                '''
            }
        }
        stage('Upload to S3') {
            steps {
                script {
                    sh "tar czf ${WORKSPACE}/${SINBAD_REPO}-${env.GIT_TAG}-${env.GIT_COMMIT_SHORT}.tar.gz -C ${WORKSPACE}/android/app/build/outputs/apk/release/ ."
                    withAWS(credentials: "${AWS_CREDENTIAL}") {
                        s3Upload(file: "${WORKSPACE}/${SINBAD_REPO}-${env.GIT_TAG}-${env.GIT_COMMIT_SHORT}.tar.gz", bucket: 'app-download.sinbad.web.id', path: "${SINBAD_ENV}/${SINBAD_REPO}-${env.GIT_TAG}-${env.GIT_COMMIT_SHORT}.tar.gz")
                        s3Upload(file: "${WORKSPACE}/${SINBAD_REPO}-${env.GIT_TAG}-${env.GIT_COMMIT_SHORT}.tar.gz", bucket: 'app-download.sinbad.web.id', path: "${SINBAD_ENV}/${SINBAD_REPO}-latest.tar.gz")
                    }
                    sh "rm ${SINBAD_REPO}*"
                }
            }
        }
        stage('Upload to Play Store') {
            steps {
                script {
                    if(SINBAD_ENV == 'sandbox') {
                        androidApkUpload googleCredentialsId: 'Sinbad', apkFilesPattern: '**/*-release.apk', trackName: 'alpha'
                    }else if(SINBAD_ENV == 'production') {
                        androidApkUpload googleCredentialsId: 'Sinbad', apkFilesPattern: '**/*-release.apk', trackName: 'beta'
                    }
                }
            }
        }
        stage('Code Push Deployment') {
            steps {
                script {
                    withCredentials([usernamePassword(credentialsId: 'appcenter', usernameVariable: 'USERID', passwordVariable: 'USERTOKEN')]){
                        if(params.CI_IS_CODEPUSH == "Yes"){
                            sh "appcenter login --token ${USERTOKEN}"
                            if(SINBAD_ENV == 'demo') {
                                sh "appcenter codepush release-react -a sinbad-app/Agent --description '${params.CI_CODEPUSH_MESSAGE}' -m -d Staging"
                            }else if(SINBAD_ENV == 'production') {
                                sh "appcenter codepush release-react -a sinbad-app/Agent --description '${params.CI_CODEPUSH_MESSAGE}' -m -d Production"
                            }
                        }
                    }
                }
            }
        }
    }

    post {
        always {
            // junit '**/target/*.xml'
            slackSend color: '#8cff00', message: "${SINBAD_REPO} (${SINBAD_ENV}) -> ${env.GIT_MESSAGE} by <${env.GIT_AUTHOR}>", channel: "#jenkins"
            slackSend color: '#ffffff', channel: "#apk", message: """
Hi Sailors
We have new APK Version

Application: ${SINBAD_REPO}
Environment: ${SINBAD_ENV}
Commit ID: ${env.GIT_COMMIT}
Changes Message: ${env.GIT_MESSAGE}

You can download this application in here
${SINBAD_URI_DOWNLOAD}/${SINBAD_ENV}/${SINBAD_REPO}-${env.GIT_TAG}-${env.GIT_COMMIT_SHORT}.tar.gz

Or latest application for environment ${SINBAD_ENV} in here
${SINBAD_URI_DOWNLOAD}/${SINBAD_ENV}/${SINBAD_REPO}-latest.tar.gz
            """
        }
        failure {
            slackSend color: '#ff0000', message: "(FAILED) ${SINBAD_REPO} (${SINBAD_ENV}) -> ${env.GIT_MESSAGE} by <${env.GIT_AUTHOR}>", channel: "#jenkins"
        }
    }
}