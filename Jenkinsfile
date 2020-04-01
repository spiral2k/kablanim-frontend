def getGitCommitterName() {
    sh 'git --no-pager log -1 --format=%an > committer.txt'
    return readFile('committer.txt').trim()
}

def getGitCommitShortHash() {
    sh "git log --pretty=format:'%h' -n 1 > commitshorthash.txt"
    return readFile('commitshorthash.txt').trim()
}

def getGitCommitSubject() {
    sh 'git --no-pager log -1 --format=%s > commitsubject.txt'
    return readFile('commitsubject.txt').trim()
}

def getbuildTarget() {
    sh "cat package.json | jq -r '.buildTarget' > buildtarget.txt"
    return readFile('buildtarget.txt').trim()
}

def getGitRepositoryName() {
    sh '''
      cat .git/config | grep -m 1 url | awk 'match($0,/.*\\/(.*).git$/,arr) {print arr[1]}' > repositoryname.txt
    '''
    return readFile('repositoryname.txt').trim()
}

def setAwsRegion() {
    sh "echo set Aws Region"
    return 'us-east-1'
}

def setIntegrationCloudFrontDistributionId() {
    sh "echo set Integration CloudFront DistributionId"
    return 'E325VL7Z7YI0OU'
}

def setStagingCloudFrontDistributionId() {
    sh "echo set Staging CloudFront DistributionId"
    return 'ETXXLJ9L8PIH5'
}

def setIntegrationS3FullPath() {
    sh "echo set Staging S3 Full Path"
    return 'daytwo-rnd-cloudfront-web-origins-v2/purchase-funnel/integration/live'
}

def setStagingS3FullPath() {
    sh "echo set Staging S3 Full Path"
    return 'daytwo-rnd-cloudfront-web-origins-v2/purchase-funnel/staging/live'
}

def setProductionS3FullPath() {
    sh "echo set Staging S3 Full Path"
    return 'daytwo-production-cloudfront-web-origins-v2/purchase-funnel/production/release-candidate'
}

def setUnitTestString() {
    sh "echo Set Unit Test Command String"
    return 'npm test'
}

def setLintRunString() {
    sh "echo Set Lint Command String"
    return 'npm run lint'
}

def setBuildString() {
    sh "echo Set Build Command String"
    return 'npm run build'
}

def setDockerImage() {
    sh "echo Set Docker Image for Build"
    return '743242878883.dkr.ecr.us-east-1.amazonaws.com/node-build-images:node-10-15-1-alpine'
}

pipeline {
    agent { label "Jenkins-CI-CD-Slave" }

    options {
        timestamps()
        buildDiscarder(logRotator(numToKeepStr: '50'))
        disableConcurrentBuilds()
    }

    parameters {
        string(defaultValue: 'web-builds', description: 'Slack Channel', name: 'slackChannel')

    }

    stages {
        stage ('Get Build Information and Set Parameters') {
            steps {
                script {

                    // Common
                    gitCommitterName                = getGitCommitterName()
                    gitCommitShortHash              = getGitCommitShortHash()
                    gitCommitSubject                = getGitCommitSubject()
                    gitRepositoryName               = getGitRepositoryName()
                    awsRegion                       = setAwsRegion()
                    unitTestString                  = setUnitTestString()
                    lintRunString                   = setLintRunString()
                    buildString                     = setBuildString()
                    dockerImage                     = setDockerImage()

                    // Integration env
                    if ( BRANCH_NAME == 'integration' ) {
                        cloudFrontDistributionId    = setIntegrationCloudFrontDistributionId()
                        s3FullPath                  = setIntegrationS3FullPath()
                        envStr                      = 'Integration'
                        nodeEnv                     = 'integration'
                    }

                    // Staging env
                    if ( BRANCH_NAME == 'staging' ){
                        cloudFrontDistributionId    = setStagingCloudFrontDistributionId()
                        s3FullPath                  = setStagingS3FullPath()
                        envStr                      = 'Staging'
                        nodeEnv                     = 'staging'
                    }

                    // Production env
                    if ( BRANCH_NAME == 'master' ) {
                        s3FullPath                  = setProductionS3FullPath()
                        envStr                      = 'Production'
                        nodeEnv                     = 'production'
                    }
                }
            }
        }

        stage('Login to ECR') {
            steps {
                sh "set +x && `aws ecr get-login --no-include-email --region ${awsRegion}` && set -x"
            }
        }

        stage("Test: Run Tests Inside a Container"){
            agent {
                docker {
                    image "${dockerImage}"
                    args '--user=root'
                    reuseNode true
                }
            }

            steps {

                println "Test: Purchase-Funnel Build For Tests"
                    sh """
                    echo "Running lints and tests on Purchase-Funnel for Deployment"
                    [ -d build/ ] && [ `ls -A build/` ] && rm -rf build/*
                    echo "Running NPM Install"
                    npm i
                    echo "Running Lint"
                    ${lintRunString}
                    echo "Running Unit Tests"
                    ${unitTestString}
                """
            }
        }

        stage("Build step") {

            when {
                anyOf {
                    branch 'integration';
                    branch 'staging';
                    branch 'master'
                }
            }

            agent {
                docker {
                    image "${dockerImage}"
                    args '--user=root'
                    reuseNode true
                }
            }

            steps {
                println "${envStr}: Purchase-Funnel Build For ${envStr}"
                sh """
                    echo "Building $envStr Purchase-Funnel for Deployment"
                    [ -d build/ ] && [ `ls -A build/` ] && rm -rf build/*
                    export NODE_ENV=${nodeEnv}
                    echo "Running NPM Install"
                    npm i
                    ${buildString}
                """
            }
        }

        stage("Deploy step") {

            when {
                anyOf {
                    branch 'integration';
                    branch 'staging'
                }
            }

            steps {
                println "${envStr}: Upload Artifacts to S3 (${s3FullPath}) and Invalidate CloudFront Cache"
                sh """
                    echo "On ${BRANCH_NAME} Branch, will update path '${s3FullPath}/*'"
                    aws s3 rm --recursive s3://${s3FullPath}/
                    aws s3 cp --recursive ${env.WORKSPACE}/build/. s3://${s3FullPath}/
                    aws s3 cp ${env.WORKSPACE}/commitshorthash.txt s3://${s3FullPath}/commitshorthash.txt
                    echo "On ${BRANCH_NAME} Branch, Will Invalidate ${envStr} CloudFront Cache"
                    aws cloudfront create-invalidation --distribution-id ${cloudFrontDistributionId} --paths '/*'
                """
            }
        }

        stage("Wait for Invalidation") {

            when {
                anyOf {
                    branch 'integration';
                    branch 'staging'
                }
            }

            steps {
                println "${envStr}: Waiting for Invalidation"
                sh """
                    invalidationId=`aws cloudfront list-invalidations --distribution-id ${cloudFrontDistributionId} --max-items 1 | jq '[.InvalidationList.Items[].Id] | .[]' | tr -d '"'`
                    status=`aws cloudfront  get-invalidation --id \${invalidationId} --distribution-id ${cloudFrontDistributionId} | jq -rc '[.Invalidation.Status] | .[]'`
                    while [ \$status != "Completed" ]; do
                        sleep 2s
                        status=`aws cloudfront  get-invalidation --id \${invalidationId} --distribution-id ${cloudFrontDistributionId} | jq -rc '[.Invalidation.Status] | .[]'`
                    done
                    echo "Invalidation ID: \${invalidationId} Completed"
                """
            }
        }

        // stage("Run Automation Integration Tests in Parallel") {

        //     when { branch 'integration' }


        //     steps {
        //         parallel(
        //             IL:{
        //                 build job: 'Automation-Tests-Integration', parameters: [string(name: 'agentLabel', value: 'Jenkins-CI-CD-Slaves-Automation'), string(name: 'grid', value: 'zalenium'), string(name: 'country', value: 'IL'), string(name: 'env', value: 'integration'), string(name: 'slackChannel', value: 'automation-builds'), string(name: 'test', value: 'PurchaseFunnelTest')], wait: false
        //             },

        //             US:{
        //                 build job: 'Automation-Tests-Integration', parameters: [string(name: 'agentLabel', value: 'Jenkins-CI-CD-Slaves-Automation-2'), string(name: 'grid', value: 'zalenium'), string(name: 'country', value: 'US'), string(name: 'env', value: 'integration'), string(name: 'slackChannel', value: 'automation-builds'), string(name: 'test', value: 'PurchaseFunnelTest')], wait: false
        //             }
        //         )
        //     }
        // }

        // stage("Run Automation Staging Tests in Parallel") {

        //     when { branch 'staging' }

        //     steps {
        //         parallel(
        //             IL:{
        //                 build job: 'Automation-Tests-Staging', parameters: [string(name: 'agentLabel', value: 'Jenkins-CI-CD-Slaves-Automation'), string(name: 'grid', value: 'zalenium'), string(name: 'country', value: 'IL'), string(name: 'env', value: 'staging'), string(name: 'slackChannel', value: 'automation-builds'), string(name: 'test', value: 'PurchaseFunnelTest')], wait: false
        //             },

        //             US:{
        //                 build job: 'Automation-Tests-Staging', parameters: [string(name: 'agentLabel', value: 'Jenkins-CI-CD-Slaves-Automation-2'), string(name: 'grid', value: 'zalenium'), string(name: 'country', value: 'IL'), string(name: 'env', value: 'staging'), string(name: 'slackChannel', value: 'automation-builds'), string(name: 'test', value: 'PurchaseFunnelTest')], wait: false
        //             }
        //         )
        //     }
        // }

        stage("Deploy step for master") {

            when { branch 'master' }

            steps {
                println "${envStr}: Upload Artifacts to S3 (${s3FullPath})"
                sh """
                    echo "On ${BRANCH_NAME} Branch, will update path '${s3FullPath}/*'"
                    aws s3 rm --recursive s3://${s3FullPath}/
                    aws s3 cp --recursive ${env.WORKSPACE}/build/. s3://${s3FullPath}/
                    aws s3 cp ${env.WORKSPACE}/commitshorthash.txt s3://${s3FullPath}/commitshorthash.txt
                """
            }
        }
    }
    post {
//        success {
//            slackSend (channel: "${params.slackChannel}", color: '00FF00', message: "SUCCESS\nJob               |\t${env.JOB_NAME} [${env.BUILD_NUMBER}]\nChanged by |\t${gitCommitterName}\nMessage      |\t${gitCommitSubject}\nCherry         |\t${gitCommitShortHash}\nBranch        |\t${BRANCH_NAME}\nBuild URL   |\t(${env.BUILD_URL})")
//        }
        failure {
            slackSend (channel: "${params.slackChannel}", color: '#FF0000', message: "FAILED\nJob               |\t${env.JOB_NAME} [${env.BUILD_NUMBER}]\nChanged by |\t${gitCommitterName}\nMessage      |\t${gitCommitSubject}\nCherry         |\t${gitCommitShortHash}\nBranch        |\t${BRANCH_NAME}\nBuild URL   |\t(${env.BUILD_URL})")
        }
    }
}
