pipeline {
  agent any
  // required param: firebaseToken

  options {
    timeout(time: 15, unit: "MINUTES")
    disableConcurrentBuilds()
  }
  stages{
    stage("retrieve") {
      steps {
        echo "${params.firebaseToken}"
        copyArtifacts projectName: 'build-gurps-tools', selector: upstream(fallbackToLastSuccessful: true, parameters: 'branch=master')
      }
    }
    stage("deploy") {
      environment {
        FIREBASE_TOKEN = credentials("$params.firebaseToken")
      }
      steps {
        nodejs(nodeJSInstallationName: '15.11.0') {
          sh 'firebase deploy --token "$FIREBASE_TOKEN"'
        }
      }
    }
  }
}
