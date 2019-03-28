#!/bin/bash

set -e 

PROJECTS="apigee-mock-apimocker apigee-mock-oidc apigee-mock-swagger apigee-node-v1 apigee-proxy"

for PROJECT in $PROJECTS
do
  echo $PROJECT
  npm install --prefix ./$PROJECT
  npm run deploy --prefix ./$PROJECT
  npm test --prefix ./$PROJECT
done

# do something with java

mvn install -Ptest -f ./apigee-proxy-java/pom.xml

# run dev portal in a container
cd ./apigee-dev-portal && ./start.sh
sleep 10 

# check everything is up
curl localhost:8080 -L | grep "Apigee Developer Portal"
