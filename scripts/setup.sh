#!/bin/bash

echo "🚀 Setting up oceans.app monorepo..."

# Check if Node.js is installed
if ! command -v node &> /dev/null; then
    echo "❌ Node.js is not installed. Please install Node.js 18+ first."
    exit 1
fi

# Check Node.js version
NODE_VERSION=$(node -v | cut -d'v' -f2 | cut -d'.' -f1)
if [ "$NODE_VERSION" -lt 18 ]; then
    echo "❌ Node.js version 18+ is required. Current version: $(node -v)"
    exit 1
fi

echo "✅ Node.js version: $(node -v)"

# Install Yarn 4 if not already installed
if ! command -v yarn &> /dev/null; then
    echo "📦 Installing Yarn 4..."
    corepack enable
    corepack prepare yarn@4.0.2 --activate
fi

echo "✅ Yarn version: $(yarn --version)"

# Install dependencies
echo "📦 Installing dependencies..."
yarn install

# Copy environment files
echo "📝 Setting up environment files..."
if [ ! -f "apps/api/.env" ]; then
    cp apps/api/env.example apps/api/.env
    echo "✅ Created apps/api/.env (please update with your database URL)"
fi

if [ ! -f "apps/web/.env" ]; then
    cp apps/web/env.example apps/web/.env
    echo "✅ Created apps/web/.env"
fi

# Generate Prisma client
echo "🗄️  Setting up database..."
cd apps/api
yarn db:generate
cd ../..

echo ""
echo "🎉 Setup complete!"
echo ""
echo "Next steps:"
echo "1. Update apps/api/.env with your database URL"
echo "2. Run 'yarn db:push' to create database tables"
echo "3. Run 'yarn dev' to start development servers"
echo ""
echo "📚 Documentation: README.md"
echo "🌐 Frontend: http://localhost:3000"
echo "🔧 Backend: http://localhost:3001"
echo "📖 API Docs: http://localhost:3001/api" 