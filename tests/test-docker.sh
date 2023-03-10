#!/usr/bin/env bash

spinal_to_one_word() {
    IFS=- read -ra str <<<"$1"
    printf '%s' "${str[@]^}"
}

service=$1
package=$2
fileToTest=$3
serviceToCamelCase=$(spinal_to_one_word $service)

if [ $2 ]
then
    package=$2/
else
    package=
fi

if [ $3 = "integration" ] || [ $3 = "service" ] || [ $3 = "validator" ] || [ $3= "serializer" ]
then
    fileToTest=$3.test.ts
else
    fileToTest=
fi

### Check if a directory does not exist ###
if [ -d "./../adn-backend-$service-service/tests/api/$serviceToCamelCase" ] 
then
    relativePath=./tests/api/$serviceToCamelCase/
else
    relativePath=./tests/api/
fi

docker-compose run --rm e2e-test-backend-$service.api.dev.adn.local yarn jest $relativePath$package$fileToTest --color

