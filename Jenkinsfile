pipeline {
    agent { docker { image 'node:14-alpine' } }
    stages {
        stage('build') {
            steps {
                sh 'cd api'
                sh 'npm --version'
                sh 'Building the API'
            }
        }

        stage('test') {
          steps {
            sh 'cd api'
            sh 'npm test'
          }
        }
    }

  post {
    success {
      echo 'Built successfully'
    }
    failure {
      echo 'Failed to run build'
    }
  }
}