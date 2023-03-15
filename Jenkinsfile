def test = "p123"

pipeline {
    agent any

    stages {
        stage('Installing Package') {
            steps {
                nodejs("node16")
                sh 'npm install'
            }  
        }
    }

    stages {
        stage('Run Test') {
            steps {
                nodejs("node16")
                sh 'npm install'
            }  
        }
    }

    stages {
        stage('Build Image Docker') {
            steps {
                nodejs("node16")
                sh 'npm test'
            }  
        }
    }
}
