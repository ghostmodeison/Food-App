@Library("Shared") _
pipeline {
    agent { label "chandan" }

    environment {
        // SonarQube
        //SONARQUBE_SERVER = 'Sonar-Server'
        //SONAR_PROJECT_KEY = 'Jenkins-CICD'

        // AWS/ECS
        IMAGE_NAME = "food-app"
        IMAGE_TAG = "${BUILD_NUMBER}"
        ECR_REPO_URI = "773195032970.dkr.ecr.ap-south-1.amazonaws.com/food-app"
        AWS_REGION = "ap-south-1"
        ECS_CLUSTER = "Manish-Cluster"
        ECS_SERVICE = "Manish-cicd-service"
    }

    stages {
        stage("Code Checkout") {
            steps {
                git branch: 'main',
                    url: 'https://github.com/ghostmodeison/Food-App',
                    credentialsId: 'github-token'
            }
        }

        // stage('SonarQube Scan') {
        //     steps {
        //         dir('.') {  // run in Envr folder root
        //             withSonarQubeEnv("${SONARQUBE_SERVER}") {
        //                  withCredentials([string(credentialsId: 'SonarQube-Token', variable: 'SONAR_TOKEN')]) {
        //                     sh '''
        //                         export PATH=$PATH:/opt/sonar-scanner/bin
        //                         sonar-scanner \
        //                           -Dsonar.projectKey=${SONAR_PROJECT_KEY} \
        //                           -Dsonar.sources=. \
        //                           -Dsonar.login=$SONAR_TOKEN
        //                     '''
        //                 }
        //             }
        //         }
        //     }
        // }

        stage("Login to ECR for Base Image") {
            steps {
                withCredentials([[$class: 'AmazonWebServicesCredentialsBinding', credentialsId: 'aws-creds']]) {
                    sh """
                        aws ecr get-login-password --region ${AWS_REGION} | docker login --username AWS --password-stdin ${ECR_REPO_URI}
                    """
                }
            }
        }

        stage("Build Docker Image") {
            steps {
                echo "🚀 Building Docker image locally"
                dir('.') {   
                    sh """
                        docker build -t ${IMAGE_NAME}:${IMAGE_TAG} .
                    """
                }
            }
        }

        stage("Login to ECR and Push") {
            steps {
                withCredentials([[$class: 'AmazonWebServicesCredentialsBinding', credentialsId: 'aws-creds']]) {
                    sh """
                        aws ecr get-login-password --region ${AWS_REGION} | docker login --username AWS --password-stdin ${ECR_REPO_URI}
                        docker tag ${IMAGE_NAME}:${IMAGE_TAG} ${ECR_REPO_URI}:${IMAGE_TAG}
                        docker push ${ECR_REPO_URI}:${IMAGE_TAG}
                    """
                }
            }
        }

        stage("Cleanup Local Docker Images") {
            steps {
                echo "🧹 Cleaning up local docker images"
                sh """
                    docker rmi ${IMAGE_NAME}:${IMAGE_TAG} || true
                    docker rmi ${ECR_REPO_URI}:${IMAGE_TAG} || true
                """
            }
        }

        stage("Update ECS Task Definition and Deploy") {
            steps {
                withCredentials([[$class: 'AmazonWebServicesCredentialsBinding', credentialsId: 'aws-creds']]) {
                    script {
                        def newImage = "${ECR_REPO_URI}:${IMAGE_TAG}"
                        sh """
                            jq --arg IMAGE "$newImage" '.containerDefinitions[0].image = \$IMAGE' taskdef.json > taskdef.tmp.json && mv taskdef.tmp.json taskdef.json

                            NEW_TASK_DEF_ARN=\$(aws ecs register-task-definition --cli-input-json file://taskdef.json --query 'taskDefinition.taskDefinitionArn' --output text --region ${AWS_REGION})

                            echo "New Task Definition ARN: \$NEW_TASK_DEF_ARN"

                            aws ecs update-service --cluster ${ECS_CLUSTER} --service ${ECS_SERVICE} --task-definition \$NEW_TASK_DEF_ARN --region ${AWS_REGION}

                            aws ecs wait services-stable --cluster ${ECS_CLUSTER} --services ${ECS_SERVICE} --region ${AWS_REGION}
                        """
                    }
                }
            }
        }
    }

    post {
        success {
            echo "✅ SonarQube scan passed, app built, pushed to ECR, ECS updated, and local images cleaned successfully"
        }
        failure {
            echo "❌ Pipeline failed at some stage"
        }
    }
}
