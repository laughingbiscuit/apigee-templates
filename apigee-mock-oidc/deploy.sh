#!/bin/bash
set -x
set -e
apigeetool deployhostedtarget -u $APIGEE_USER -p $APIGEE_PASS -o $APIGEE_ORG -e $APIGEE_ENV -n 'oidc-provider-mock' -b / -V
