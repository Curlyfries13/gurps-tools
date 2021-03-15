/* A pipeline to determine if hugo has any pages to publish
Notes:
only checks the master branch - development branches are not monitored
*/
pipeline {
  agent any
  options {
    timeout(time: 15, unit: "MINUTES")
    disableConcurrentBuilds()
    buildDiscarder(
      logRotator(
        artifactDaysToKeepStr: "",
        artifactNumToKeepStr: "1",
        daysToKeepStr: "",
        numToKeepStr: "10")
    )
  }
  parameters{
    string(name: 'branch', defaultValue: 'master')
    // required params: gitCredentials, firebaseToken
  }
  environment {
    res = false;
  }
  stages {
    stage("request redeploy") {
      steps{
        script {
          build job: 'build-gurps-tools', parameters:[
            string(name: 'branch', value: params.branch),
            string(name: 'gitCredentials', value: params.gitCredentials)
          ]
          build job: 'deploy-gurps-tools', parameters:[
            string(name:'firebaseToken', value: params.firebaseToken)
          ]
        }
      }
    }
  }
}
