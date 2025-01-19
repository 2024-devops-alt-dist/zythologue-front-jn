#!/bin/bash

# Set up the parent directory
PARENT_DIR="zythologue"
echo "Creating the parent directory '$PARENT_DIR'..."
mkdir -p "$PARENT_DIR"
cd "$PARENT_DIR" || exit

# Clone and set up the database project
echo "Cloning the database project..."
git clone git@github.com:2024-devops-alt-dist/zythologue-jn.git
cd zythologue-jn || exit
echo "Starting Docker containers for the database project..."
docker-compose up -d
cd ".." || exit

# Clone and set up the API project
echo "Cloning the API project..."
git clone git@github.com:2024-devops-alt-dist/zythologue-api-jn.git
cd zythologue-api-jn || exit
echo "Building and running the API project..."
docker rm -f zythologue-api-jn 2>/dev/null
docker build -t zythologue-api-jn .
docker run -d --name zythologue-api-jn --network=zythologue-jn_simplon-local --env-file .env -p 3000:3000 zythologue-api-jn
cd ".." || exit

# Clone and set up the front-end project
echo "Starting the front-end project..."
git clone git@github.com:2024-devops-alt-dist/zythologue-front-jn.git
cd zythologue-front-jn || exit
echo "Installing dependencies for the front-end project..."
npm install
echo "Starting the front-end project in development mode..."
npm run dev

# Final message
echo "All projects are set up. Open your browser and go to http://localhost:5173/"