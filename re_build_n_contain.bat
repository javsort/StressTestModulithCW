@echo off

setlocal 

call docker-compose down

call ./mvnw clean install

call docker build -t t2project/modulith:main .

start cmd /k "cd %CD%/src/main/tea-store-frontend && npm install && set VITE_PORT=5173 && npm run dev"

call docker-compose up

