pipeline {
    agent any

    environment {
        REGISTRY = "aden1ji"  // Docker Hub username (replace with your actual Docker Hub username)
        FRONTEND_IMAGE = "ems-frontend"  // Frontend image name
    }

    stages {
        stage('Checkout') {
            steps {
                // Checkout the frontend repo from GitHub using the correct URL for your username
                git branch: 'main', url: 'https://github.com/Ay-wolf/ems-frontend'  // Use your actual frontend repo URL
            }
        }

        stage('Build Frontend Docker Image') {
            steps {
                script {
                    // Define the frontend image tag based on the branch and commit hash
                    def frontendTag = "${env.BRANCH_NAME}-${env.GIT_COMMIT.take(7)}"

                    // Build the Docker image for the frontend
                    sh "docker build -t ${REGISTRY}/${FRONTEND_IMAGE}:${frontendTag} -f Dockerfile ."
                }
            }
        }

        stage('Push Frontend Docker Image') {
            steps {
                script {
                    // Define the frontend image tag again for pushing
                    def frontendTag = "${env.BRANCH_NAME}-${env.GIT_COMMIT.take(7)}"

                    // Push the built frontend Docker image to Docker Hub
                    sh "docker push ${REGISTRY}/${FRONTEND_IMAGE}:${frontendTag}"
                }
            }
        }
    }

    post {
        always {
            // Clean up the workspace after the pipeline execution
            cleanWs()
        }
    }
}
