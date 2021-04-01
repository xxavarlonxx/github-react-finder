pipeline{
    environment {
        registry = "hub.ahochschulte.de/github-finder"
        registryCredential = "privatehub"
        dockerImage = ''
    }

    agent any
    tools {nodejs "node"}
    stages{
        stage('Build image'){
            steps{
                script {
                    dockerImage = docker.build(registry + ":$BUILD_NUMBER")
                }
            }
        }

        stage('Push Image to Registry'){
            steps{
                script{
                    docker.withRegistry('https://hub.ahochschulte.de/v2', registryCredential){
                        dockerImage.push()
                        dockerImage.push('latest')
                    }
                }
            }
        }

        stage('Publish on remote server'){
            steps{
                script{
                    sh 'ssh andre@136.243.169.235 "cd ~/docker/github-finder && docker-compose pull && docker-compose up -d"'
                }
            }
            
        }
    }
}
