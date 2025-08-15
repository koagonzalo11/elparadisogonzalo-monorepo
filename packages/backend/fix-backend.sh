#!/bin/bash

echo "🚀 Starting backend fix script..."

# Step 1: Install node-pre-gyp
echo "📦 Installing missing node-pre-gyp dependency..."
npm install node-pre-gyp@^0.13.0

# Step 2: Clean node_modules and package-lock.json
echo "🧹 Removing node_modules and package-lock.json..."
rm -rf node_modules package-lock.json

# Step 3: Reinstall dependencies
echo "📥 Running npm install..."
npm install

# Step 4: Check and uninstall any 'config' package globally and locally
echo "🔍 Checking for 'config' package..."
npm ls config && npm uninstall config
npm ls -g config && npm uninstall -g config

# Step 5: Start backend
echo "🚦 Starting backend server..."
npm start
