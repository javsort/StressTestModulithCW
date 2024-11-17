@echo off

setlocal

call docker-compose down

call ./mvnw clean install

call docker build -t t2project/modulith:main .

call docker compose up