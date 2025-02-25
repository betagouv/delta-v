#!/bin/bash
set -e

echo "Installing dependencies..."
yarn install --ignore-scripts --production=false

echo "Running migrations..."
yarn migration:run

echo "Building application..."
yarn build

echo "Installing production dependencies..."
yarn install --ignore-scripts --production=true

echo "Verifying build..."
if [ ! -f "./dist/index.js" ]; then
    echo "Build failed: dist/index.js not found"
    exit 1
fi