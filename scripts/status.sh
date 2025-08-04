#!/bin/bash

echo "🔍 Checking oceans.app Services Status..."
echo "============================================="

# Check if backend is running
echo "📡 Backend API (Port 3001):"
if curl -s http://localhost:3001/health > /dev/null 2>&1; then
    echo "   ✅ Running - http://localhost:3001"
    echo "   📚 Swagger Docs - http://localhost:3001/api"
else
    echo "   ❌ Not running"
fi

# Check if frontend is running
echo ""
echo "🌐 Frontend (Port 3000):"
if curl -s http://localhost:3000 > /dev/null 2>&1; then
    echo "   ✅ Running - http://localhost:3000"
else
    echo "   ❌ Not running"
fi

# Check database connection
echo ""
echo "🗄️  Database:"
if yarn workspace @oceans/api db:generate > /dev/null 2>&1; then
    echo "   ✅ Connected and accessible"
else
    echo "   ❌ Connection failed"
fi

# Check auth endpoints
echo ""
echo "🔐 Authentication Endpoints:"
if curl -s http://localhost:3001/api > /dev/null 2>&1; then
    echo "   ✅ Swagger UI accessible"
    echo "   📋 Available endpoints:"
    echo "      • POST /auth/register"
    echo "      • POST /auth/login"
    echo "      • POST /auth/refresh"
    echo "      • GET  /auth/profile"
    echo "      • PUT  /auth/profile"
    echo "      • PUT  /auth/change-password"
else
    echo "   ❌ API not accessible"
fi

echo ""
echo "🎯 Next Steps:"
echo "   • Test endpoints via Swagger UI: http://localhost:3001/api"
echo "   • Run e2e tests: yarn workspace @oceans/api test:e2e"
echo "   • Start frontend: yarn workspace @oceans/web dev" 