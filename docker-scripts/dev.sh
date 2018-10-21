#!/bin/sh

docker-compose build dev || exit 1
docker-compose run --service-ports dev /bin/sh
