@Library("Shared") _
pipeline {
    agent { label "chandan" }

    environment {
        // AWS/ECS
        IMAGE_NAME   = "zomato-food"
        IMAGE_TAG    = "${BUILD_NUMBER}"
        ECR_REPO_URI = "058264451049.dkr.ecr.ap-south-1.amazonaws.com/manish-food"
        AWS_REGION   = "ap-south-1"
        ECS_CLUSTER  = "Zomato"
        ECS_SERVICE  = "Manish-Service"
    }

    stages {
        stage("Code Checkout") {
            steps {
                git branch: 'main',
                    url: 'https://github.com/ghostmodeison/Food-App',
                    credentialsId: '607463b7-0dff-424e-bc9d-d57524131327'
            }
        }

        stage("Login to ECR") {
            steps {
                withCredentials([[$class: 'AmazonWebServicesCredentialsBinding', credentialsId: 'aws-credentials']]) {
                    sh """
                        aws ecr get-login-password --region ${AWS_REGION} | \
                        docker login --username AWS --password-stdin ${ECR_REPO_URI}
                    """
                }
            }
        }

        stage("Build Docker Image") {
            steps {
                echo "🚀 Building Docker image locally"
                sh """
                    docker build -t ${IMAGE_NAME}:${IMAGE_TAG} .
                """
            }
        }

        stage("Push Docker Image to ECR") {
            steps {
                withCredentials([[$class: 'AmazonWebServicesCredentialsBinding', credentialsId: 'aws-credentials']]) {
                    sh """
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
                withCredentials([[$class: 'AmazonWebServicesCredentialsBinding', credentialsId: 'aws-credentials']]) {
                    script {
                        def newImage = "${ECR_REPO_URI}:${IMAGE_TAG}"
                        sh """
                            # Clean taskdef.json on the fly (no extra files)
                            jq 'del(.taskDefinitionArn, .revision, .status, .requiresAttributes, .compatibilities, .registeredAt, .registeredBy)
                                | .containerDefinitions[0].image = "${newImage}"' taskdef.json > taskdef.json.tmp

                            mv taskdef.json.tmp taskdef.json

                            # Register new task definition
                            NEW_TASK_DEF_ARN=\$(aws ecs register-task-definition \
                                --cli-input-json file://taskdef.json \
                                --query 'taskDefinition.taskDefinitionArn' \
                                --output text --region ${AWS_REGION})

                            echo "✅ New Task Definition ARN: \$NEW_TASK_DEF_ARN"

                            # Update ECS service to use the new task definition
                            aws ecs update-service \
                                --cluster ${ECS_CLUSTER} \
                                --service ${ECS_SERVICE} \
                                --task-definition \$NEW_TASK_DEF_ARN \
                                --region ${AWS_REGION}

                            # Wait until deployment is stable
                            aws ecs wait services-stable \
                                --cluster ${ECS_CLUSTER} \
                                --services ${ECS_SERVICE} \
                                --region ${AWS_REGION}
                        """
                    }
                }
            }
        }
    }

    post {
        success {
            echo "✅ App built, pushed to ECR, ECS updated, and local images cleaned successfully"
        }
        failure {
            echo "❌ Pipeline failed at some stage"
        }
    }
}
