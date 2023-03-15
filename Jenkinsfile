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
}
