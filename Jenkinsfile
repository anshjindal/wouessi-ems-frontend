pipeline {
    agent any

    // Trigger via polling every 5 minutes
    triggers {
        pollSCM('H/5 * * * *')
    }

    stages {
        stage('Checkout') {
            steps {
                checkout scm
            }
        }
        stage('Install Dependencies') {
            steps {
                sh 'npm install'
            }
        }
        stage('Run Unit Tests') {
            steps {
                sh 'npm test'
            }
        }
    }
    
    post {
        success {
            echo 'Frontend pipeline executed successfully!'
        }
        failure {
            echo 'Frontend pipeline failed.'
        }
    }
}
