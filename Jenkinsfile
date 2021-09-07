pipeline {
    agent { docker { image 'node:14-alpine' } }
    stages {
        stage('build') {
            steps {
                sh 'cd api'
                sh 'npm --version'
            }
        }
    }
}