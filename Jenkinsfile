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
    }

    environment {
        SINBAD_REPO = 'mobile-sinbad-white'
        AWS_CREDENTIAL = 'automation_aws'
        SINBAD_ENV = "${env.JOB_BASE_NAME}"
        WOKRSPACE = "${env.WORKSPACE}"
        SINBAD_URI_DOWNLOAD = "http://app-download.sinbad.web.id"
        ECR_REGISTRY = '815128449618.dkr.ecr.ap-southeast-1.amazonaws.com'
        SINBAD_IMAGE_ANDROID = "815128449618.dkr.ecr.ap-southeast-1.amazonaws.com/sinbad-react-native/android:latest"
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
        stage('Build APK'){
            when { expression { params.CI_IS_PLAYSTORE == "No" && params.CI_IS_CODEPUSH == "No" } }
            agent {
                docker { 
                    image "${SINBAD_IMAGE_ANDROID}"
                    registryUrl "https://${ECR_REGISTRY}"
                    registryCredentialsId "ecr:ap-southeast-1:automation_aws"
                    args '--entrypoint= '
                }
            }
            steps {
                script{
                    sh '''
                        cd android && \
                        fastlane apk
                    '''
                    sh "tar czf ${WORKSPACE}/${SINBAD_REPO}-${env.GIT_TAG}-${env.GIT_COMMIT_SHORT}.tar.gz -C ${WORKSPACE}/android/app/build/outputs/apk/release/ ."
                    withAWS(credentials: "${AWS_CREDENTIAL}") {
                        s3Upload(file: "${WORKSPACE}/${SINBAD_REPO}-${env.GIT_TAG}-${env.GIT_COMMIT_SHORT}.tar.gz", bucket: 'app-download.sinbad.web.id', path: "${SINBAD_ENV}/${SINBAD_REPO}-${env.GIT_TAG}-${env.GIT_COMMIT_SHORT}.tar.gz")
                        s3Upload(file: "${WORKSPACE}/${SINBAD_REPO}-${env.GIT_TAG}-${env.GIT_COMMIT_SHORT}.tar.gz", bucket: 'app-download.sinbad.web.id', path: "${SINBAD_ENV}/${SINBAD_REPO}-latest.tar.gz")
                    }
                    slackSend color: '#FFFFFF', channel: "#download-apps-production", message: """
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
                    sh "rm ${SINBAD_REPO}*"
                }
            }
        }
        stage('Deployment') {
            parallel {
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
                                    fastlane beta
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
    }

    post {
        always {
            // junit '**/target/*.xml'
            deleteDir()
            slackSend color: '#8cff00', message: "${SINBAD_REPO} (${SINBAD_ENV}) -> ${env.GIT_MESSAGE} by <${env.GIT_AUTHOR}>", channel: "#jenkins"
        }
        failure {
            slackSend color: '#ff0000', message: "(FAILED) ${SINBAD_REPO} (${SINBAD_ENV}) -> ${env.GIT_MESSAGE} by <${env.GIT_AUTHOR}>", channel: "#jenkins"
        }
    }
}