#!/bin/bash
set -x

docker rm -f some-apigee-dev-portal || true
docker build -t apigee/dev-portal .
docker run --name some-apigee-dev-portal -p 8080:80 -d \
	-e APIGEE_EDGE_AUTH_TYPE=basic \
	-e APIGEE_EDGE_ENDPOINT=https://api.enterprise.apigee.com/v1 \
	-e APIGEE_EDGE_ORGANIZATION=$APIGEE_ORG \
	-e APIGEE_EDGE_USERNAME=$APIGEE_USER \
	-e APIGEE_EDGE_PASSWORD=$APIGEE_PASS \
	apigee/dev-portal
