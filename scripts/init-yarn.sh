#!/bin/bash

echo "🧶 Initializing Yarn 4 for oceans.app..."

# Enable corepack (Node.js 16.10+)
echo "📦 Enabling corepack..."
corepack enable

# Prepare Yarn 4
echo "📦 Preparing Yarn 4..."
corepack prepare yarn@4.0.2 --activate

# Set Yarn version
echo "📦 Setting Yarn version..."
yarn set version 4.0.2

# Install workspace tools plugin
echo "🔧 Installing workspace tools plugin..."
yarn plugin import workspace-tools

echo ""
echo "✅ Yarn 4 initialization complete!"
echo "📦 Yarn version: $(yarn --version)"
echo ""
echo "Next steps:"
echo "1. Run 'yarn install' to install dependencies"
echo "2. Run './scripts/setup.sh' for full project setup" 