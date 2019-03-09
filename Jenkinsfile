pipeline {
    agent {
        node {
            label 'master'
        }
    }
    
    environment {
        JENKINS_NODE_COOKIE = 'dontkill'
        AWS_ACCESS_KEY = "${AWS_ACCESS_KEY}"
        AWS_SECRET_ACCESS_KEY = "${AWS_SECRET_ACCESS_KEY}"
        MOVIE_API_STAGE = "${MOVIE_API_STAGE}"
        DEMO_APP_URL = "${DEMO_APP_URL}"
        MOVIE_API_REGION = "${MOVIE_API_REGION}"
    }
    
    stages {
        stage('Preparation') { // for display purposes
            steps {
              // clean the workspace
              cleanWs()
              sh 'echo $AWS_ACCESS_KEY'
            }
        }

       stage('Download') {
           steps {
              // Download code from a GitHub repository
              git 'https://github.com/cloud-native-react-blake-may-2018/demos.git'
           }
        }

        stage('NPM Install') {
            steps {
                // go into client-side directory
                dir('week3') {
                    dir('movie-api') {
                        // install node modules
                        sh 'npm install'
                    }
                }
            }
        }
        
        stage('Destroy Old Server') {
            steps {
                script {
                    try {
                        // kill any running instances
                        sh "fuser -k 3001/tcp"
                    } catch (all) {
                        // if it fails that should mean a server wasn't already running
                    }
                }
            }
        }

        stage('Deploy') {
            steps {
                dir('week3') {
                    dir('movie-api') {
                        // Deploy the application
                        sh 'nohup npm run deploy &'
                        // sh 'npm run deploy'
                    }
                }
            }
        }

    }
    
    post {
        always {
            sh "echo 'i always run'"
            
            /* SLACK message example
            
            slackSend channel: '#some-channel',
                color: 'good',
                message: "The Janus server has attempted a build"
                
            */
        }
        
        success {
            sh "echo 'i only run on success'"
        }
        
        unstable {
            sh "echo 'i run when the build is unstable (testing?)'"
        }
        
        failure {
            sh "echo 'i run when things failed'"
        }
        
        changed {
            sh "echo 'i run when there is a successful build after a failed one'"
            sh "echo 'or a failed build after a successful one'"
        }
    }
}
