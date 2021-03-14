/* A jenkins pipeline to unit test and build the gurps-tools
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
    string(name: 'gitCredentials')
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
        nodejs(nodeJSInstallationName: '15.11.0') {
          sh "npm install"
        }
      }
    }
    stage("test") {
      steps {
        nodejs(nodeJSInstallationName: '15.11.0') {
          sh "npx jest"
        }
      }
    }
    stage("build") {
      steps {
          nodejs(nodeJSInstallationName: '15.11.0') {
          // TODO: update this if we ever actually fix the lockfile
          script {
            if (targetedEnv == 'prod') {
              sh "npx webpack --config webpack.config.prod.js"
            } else {
              sh "npx webpack --mode=development --config webpack.config.dev.js"
            }
          }
        }
	      archiveArtifacts artifacts: 'build/**', followSymlinks: false, onlyIfSuccessful: true
      }
    }
  }
}
