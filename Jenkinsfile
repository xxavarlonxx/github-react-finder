pipeline{
    environment {
        registry = "hub.ahochschulte.de/github-react-finder"
        registryCredential = "privatehub"
        dockerImage = ''
        //dockerFile = 'server/prod.dockerfile'
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
                    sh 'ssh dev@81.169.193.248 "cd ~/react/github-react-finder && docker-compose pull app && docker-compose up -d"'
                }
            }
            
        }
    }
}