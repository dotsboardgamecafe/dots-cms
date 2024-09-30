#!/bin/bash

set -e

VERSION=""

read -p "Enter version : " VERSION

docker buildx build --platform linux/amd64 -f ./Dockerfile --build-arg stage=$STAGE --no-cache -t vereinfras/dots:latest .

docker tag vereinfras/dots:latest vereinfras/dots:cms-prod-$VERSION
docker push vereinfras/dots:cms-prod-$VERSION
