#!/bin/bash

echo "🔧 Setting up development environment..."

# Create API .env file
if [ ! -f "apps/api/.env" ]; then
    echo "📝 Creating apps/api/.env..."
    cat > apps/api/.env << EOF
# Database
DATABASE_URL="postgresql://user:password@localhost:5432/oceans"

# Server
PORT=3001
NODE_ENV=development

# Frontend URL for CORS
FRONTEND_URL="http://localhost:3000"

# JWT
JWT_SECRET="dev-secret-key-change-in-production"

# File Upload (for resume uploads)
UPLOAD_DIR="./uploads"
MAX_FILE_SIZE=10485760 # 10MB

# AI Service (optional)
OPENAI_API_KEY="your-openai-api-key"

# Analytics (optional)
GOOGLE_ANALYTICS_ID="your-ga-id"
EOF
    echo "✅ Created apps/api/.env"
fi

# Create Web .env file
if [ ! -f "apps/web/.env" ]; then
    echo "📝 Creating apps/web/.env..."
    cat > apps/web/.env << EOF
# API Configuration
VITE_API_URL="http://localhost:3001"

# App Configuration
VITE_APP_NAME="oceans"
VITE_APP_VERSION="1.0.0"

# Feature Flags
VITE_ENABLE_AI="true"
VITE_ENABLE_ANALYTICS="true"

# External Services (optional)
VITE_GOOGLE_ANALYTICS_ID="your-ga-id"
VITE_SENTRY_DSN="your-sentry-dsn"
EOF
    echo "✅ Created apps/web/.env"
fi

echo ""
echo "🎉 Development environment setup complete!"
echo ""
echo "Next steps:"
echo "1. Update DATABASE_URL in apps/api/.env with your actual database URL"
echo "2. Run 'yarn db:generate' to generate Prisma client"
echo "3. Run 'yarn db:push' to create database tables (if you have a database)"
echo "4. Run 'yarn dev' to start both frontend and backend"
echo ""
echo "🌐 Frontend: http://localhost:3000"
echo "🔧 Backend: http://localhost:3001"
echo "📖 API Docs: http://localhost:3001/api" 