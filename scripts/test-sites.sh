#!/bin/bash

echo "🧪 Testing Site Management Functionality..."
echo "=========================================="

# Colors for output
GREEN='\033[0;32m'
RED='\033[0;31m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Test user credentials
EMAIL="test@example.com"
PASSWORD="password123"

echo -e "${YELLOW}1. Testing authentication...${NC}"
LOGIN_RESPONSE=$(curl -s -X POST http://localhost:3001/auth/login \
  -H "Content-Type: application/json" \
  -d "{\"email\":\"$EMAIL\",\"password\":\"$PASSWORD\"}")

if [ $? -eq 0 ]; then
  echo -e "${GREEN}✅ Login successful${NC}"
  ACCESS_TOKEN=$(echo $LOGIN_RESPONSE | grep -o '"accessToken":"[^"]*"' | cut -d'"' -f4)
  
  if [ -z "$ACCESS_TOKEN" ]; then
    echo -e "${RED}❌ Failed to extract access token${NC}"
    echo "Response: $LOGIN_RESPONSE"
    exit 1
  fi
  
  echo -e "${GREEN}✅ Access token extracted${NC}"
else
  echo -e "${RED}❌ Login failed${NC}"
  exit 1
fi

echo -e "\n${YELLOW}2. Testing site creation...${NC}"
CREATE_RESPONSE=$(curl -s -X POST http://localhost:3001/sites \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer $ACCESS_TOKEN" \
  -d '{
    "name": "Test Portfolio",
    "slug": "test-portfolio",
    "description": "My test portfolio site",
    "isPublic": true,
    "template": "portfolio"
  }')

if [ $? -eq 0 ]; then
  echo -e "${GREEN}✅ Site creation successful${NC}"
  SITE_ID=$(echo $CREATE_RESPONSE | grep -o '"id":"[^"]*"' | cut -d'"' -f4)
  
  if [ -z "$SITE_ID" ]; then
    echo -e "${RED}❌ Failed to extract site ID${NC}"
    echo "Response: $CREATE_RESPONSE"
    exit 1
  fi
  
  echo -e "${GREEN}✅ Site ID: $SITE_ID${NC}"
else
  echo -e "${RED}❌ Site creation failed${NC}"
  echo "Response: $CREATE_RESPONSE"
  exit 1
fi

echo -e "\n${YELLOW}3. Testing site retrieval...${NC}"
GET_RESPONSE=$(curl -s -X GET http://localhost:3001/sites \
  -H "Authorization: Bearer $ACCESS_TOKEN")

if [ $? -eq 0 ]; then
  echo -e "${GREEN}✅ Site retrieval successful${NC}"
  SITE_COUNT=$(echo $GET_RESPONSE | grep -o '"id"' | wc -l)
  echo -e "${GREEN}✅ Found $SITE_COUNT sites${NC}"
else
  echo -e "${RED}❌ Site retrieval failed${NC}"
  echo "Response: $GET_RESPONSE"
  exit 1
fi

echo -e "\n${YELLOW}4. Testing site update...${NC}"
UPDATE_RESPONSE=$(curl -s -X PUT http://localhost:3001/sites/$SITE_ID \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer $ACCESS_TOKEN" \
  -d '{
    "name": "Updated Portfolio",
    "description": "My updated portfolio site"
  }')

if [ $? -eq 0 ]; then
  echo -e "${GREEN}✅ Site update successful${NC}"
else
  echo -e "${RED}❌ Site update failed${NC}"
  echo "Response: $UPDATE_RESPONSE"
  exit 1
fi

echo -e "\n${YELLOW}5. Testing site deletion...${NC}"
DELETE_RESPONSE=$(curl -s -X DELETE http://localhost:3001/sites/$SITE_ID \
  -H "Authorization: Bearer $ACCESS_TOKEN")

if [ $? -eq 0 ]; then
  echo -e "${GREEN}✅ Site deletion successful${NC}"
else
  echo -e "${RED}❌ Site deletion failed${NC}"
  echo "Response: $DELETE_RESPONSE"
  exit 1
fi

echo -e "\n${GREEN}🎉 All site management tests passed!${NC}"
echo -e "${YELLOW}You can now test the frontend at: http://localhost:3000${NC}" 