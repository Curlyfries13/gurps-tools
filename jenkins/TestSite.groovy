/* A jenkins pipeline to test gurps-tools
*/

def getEnvFromBranch(branch) {
  if (branch == "master") {
    return "prod"
  } else {
    return "dev"
  }
}

pipeline {
  agent any
  parameters{
    string(name: 'branch', defaultValue: 'master')
    // required params: gitCredentials
  }

  options {
    timeout(time: 15, unit: "MINUTES")
    disableConcurrentBuilds()
    buildDiscarder(
      logRotator(
        artifactDaysToKeepStr: "",
        artifactNumToKeepStr: "",
        daysToKeepStr: "",
        numToKeepStr: "15")
    )
  }
  environment {
    targetedEnv = getEnvFromBranch(params.branch)
  }
  stages {
    stage("prepare") {
      steps {
        checkout(
          [$class: "GitSCM",
           branches: [[name: 'origin/${branch}']],
           doGenerateSubmoduleConfigurations: false,
           extensions: [
             [$class: "SubmoduleOption",
              disableSubmodules: false,
              parentCredentials: true,
              recursiveSubmodules: true,
              reference: "",
              trackingSubmodules: true]
           ],
           userRemoteConfigs: [
             [credentialsId: params.gitCredentials,
             url: "git@github.com:Curlyfries13/gurps-tools.git"]
           ]]
        )
      }
    }
    stage("test") {
      steps {
        nodejs(nodeJSInstallationName: '15.11.0') {
          sh "npm install"
          sh "npx jest"
        }
      }
    }
  }
}
