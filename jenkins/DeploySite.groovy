pipeline {
  agent any
  parameters{
    string(name: 'firebase_token')
  }

  options {
    timeout(time: 15, unit: "MINUTES")
    disableConcurrentBuilds()
  }
  stages{
    stage("retrieve") {
      steps {
        copyArtifacts projectName: 'build-gurps-tools', selector: upstream(fallbackToLastSuccessful: true, parameters: 'branch=master')
      }
    }
    stage("deploy") {
      environment {
        FIREBASE_TOKEN = credentials(params.firebase_token)
      }
      steps {
        nodejs(nodeJSInstallationName: '15.11.0') {
          sh 'firebase deploy --token "$FIREBASE_TOKEN"'
        }
      }
    }
  }
}
