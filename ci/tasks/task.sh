#!/bin/bash

API_ENDPOINT=$CF_API
USERNAME=$CF_USERNAME
PASSWORD=$CF_PASSWORD

cd pcf-service-validation
mvn package -Dhttps.proxyHost=pxq-outboundproxy.onefiserv.net -Dhttps.proxyPort=8080
cf login --skip-ssl-validation -a $API_ENDPOINT -u $USERNAME -p $PASSWORD -o "system" -s "pcf-admins"
cf push
