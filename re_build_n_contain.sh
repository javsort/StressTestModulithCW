#!/bin/bash

set -e

docker-compose down

./mvnw clean install

docker build -t t2project/modulith:main .

# Open a new terminal and run the frontend development server
gnome-terminal -- bash -c "cd src/main/tea-store-frontend && npm install && export VITE_PORT=5173 && npm run dev; exec bash"

docker-compose up
