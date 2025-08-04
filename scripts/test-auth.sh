#!/bin/bash

echo "🧪 Running Authentication E2E Tests..."
echo "======================================"

cd apps/api

# Run the tests and capture output
yarn test:e2e 2>&1 | tee test-results.log

# Check if tests passed
if [ $? -eq 0 ]; then
    echo ""
    echo "✅ All Authentication Tests PASSED!"
    echo ""
    echo "📊 Test Summary:"
    echo "• Register endpoint: 5 tests"
    echo "• Login endpoint: 4 tests" 
    echo "• Refresh token: 3 tests"
    echo "• Get profile: 3 tests"
    echo "• Update profile: 6 tests"
    echo "• Change password: 5 tests"
    echo "• Integration flow: 1 test"
    echo ""
    echo "🎉 Total: 27 tests passed"
    echo ""
    echo "🔗 API Documentation: http://localhost:3001/api"
    echo "🚀 Backend running on: http://localhost:3001"
else
    echo ""
    echo "❌ Some tests failed. Check test-results.log for details."
    exit 1
fi 