#!/bin/sh

docker-compose up --renew-anon-volumes web || exit 1
