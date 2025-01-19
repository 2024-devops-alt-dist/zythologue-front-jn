#!/bin/bash

# Set the base directory for the projects
BASE_DIR=$(pwd)

# Clone and set up the database project
echo "Cloning the database project..."
git clone https://github.com/2024-devops-alt-dist/zythologue-jn.git
cd zythologue-jn || exit
echo "Starting Docker containers for the database project..."
docker-compose up -d
cd "$BASE_DIR" || exit
rm -rf zythologue-jn

# Clone and set up the API project
echo "Cloning the API project..."
git clone https://github.com/2024-devops-alt-dist/zythologue-api-jn.git
cd zythologue-api-jn || exit
echo "Building and running the API project..."
docker rm -f zythologue-api-jn
docker build -t zythologue-api-jn .
docker run -d --name zythologue-api-jn --network=zythologue-jn_simplon-local --env-file .env -p 3000:3000 zythologue-api-jn
cd "$BASE_DIR" || exit
rm -rf zythologue-api-jn

# Set up the front-end project
echo "Installing dependencies for the front-end project..."
npm install
echo "Starting the front-end project in detached mode..."
nohup npm run dev > frontend.log 2>&1 &
# Final message
cat << "EOF"
░▒▓████████▓▒░▒▓█▓▒░░▒▓█▓▒░▒▓████████▓▒░▒▓█▓▒░░▒▓█▓▒░░▒▓██████▓▒░░▒▓█▓▒░      ░▒▓██████▓▒░ ░▒▓██████▓▒░░▒▓█▓▒░░▒▓█▓▒░▒▓████████▓▒░
       ░▒▓█▓▒░▒▓█▓▒░░▒▓█▓▒░  ░▒▓█▓▒░   ░▒▓█▓▒░░▒▓█▓▒░▒▓█▓▒░░▒▓█▓▒░▒▓█▓▒░     ░▒▓█▓▒░░▒▓█▓▒░▒▓█▓▒░░▒▓█▓▒░▒▓█▓▒░░▒▓█▓▒░▒▓█▓▒░
     ░▒▓██▓▒░░▒▓█▓▒░░▒▓█▓▒░  ░▒▓█▓▒░   ░▒▓█▓▒░░▒▓█▓▒░▒▓█▓▒░░▒▓█▓▒░▒▓█▓▒░     ░▒▓█▓▒░░▒▓█▓▒░▒▓█▓▒░      ░▒▓█▓▒░░▒▓█▓▒░▒▓█▓▒░
   ░▒▓██▓▒░   ░▒▓██████▓▒░   ░▒▓█▓▒░   ░▒▓████████▓▒░▒▓█▓▒░░▒▓█▓▒░▒▓█▓▒░     ░▒▓█▓▒░░▒▓█▓▒░▒▓█▓▒▒▓███▓▒░▒▓█▓▒░░▒▓█▓▒░▒▓██████▓▒░
 ░▒▓██▓▒░       ░▒▓█▓▒░      ░▒▓█▓▒░   ░▒▓█▓▒░░▒▓█▓▒░▒▓█▓▒░░▒▓█▓▒░▒▓█▓▒░     ░▒▓█▓▒░░▒▓█▓▒░▒▓█▓▒░░▒▓█▓▒░▒▓█▓▒░░▒▓█▓▒░▒▓█▓▒░
░▒▓█▓▒░         ░▒▓█▓▒░      ░▒▓█▓▒░   ░▒▓█▓▒░░▒▓█▓▒░▒▓█▓▒░░▒▓█▓▒░▒▓█▓▒░     ░▒▓█▓▒░░▒▓█▓▒░▒▓█▓▒░░▒▓█▓▒░▒▓█▓▒░░▒▓█▓▒░▒▓█▓▒░
░▒▓████████▓▒░  ░▒▓█▓▒░      ░▒▓█▓▒░   ░▒▓█▓▒░░▒▓█▓▒░░▒▓██████▓▒░░▒▓████████▓▒░▒▓██████▓▒░ ░▒▓██████▓▒░ ░▒▓██████▓▒░░▒▓████████▓▒░
EOF
echo "All projects are set up. Open your browser and go to http://localhost:5173/"