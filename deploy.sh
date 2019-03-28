#!/bin/bash
PROJECTS="apigee-mock-apimocker apigee-mock-oidc apigee-mock-swagger apigee-node-v1 apigee-proxy apigee-proxy-java/proxy-v1"

for PROJECT in $PROJECTS
do
  echo $PROJECT
  npm install --prefix ./$PROJECT
  npm run deploy --prefix ./$PROJECT
  npm test --prefix ./$PROJECT
done

# do something with dev portal
