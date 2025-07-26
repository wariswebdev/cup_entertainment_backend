#!/bin/bash

# Cup Entertainment API Test Script
# This script demonstrates the two-step signup process

API_BASE="http://localhost:3000"
EMAIL="test@example.com"
FULL_NAME="John Doe"
PASSWORD="securepassword123"

echo "🚀 Cup Entertainment API - Two-Step Signup Test"
echo "================================================"

# Step 1: Send OTP
echo ""
echo "📧 Step 1: Sending OTP to $EMAIL..."
SEND_OTP_RESPONSE=$(curl -s -X POST "$API_BASE/auth/send-otp" \
  -H "Content-Type: application/json" \
  -d "{
    \"email\": \"$EMAIL\",
    \"type\": \"signup\"
  }")

echo "Response: $SEND_OTP_RESPONSE"

if echo "$SEND_OTP_RESPONSE" | grep -q '"success":true'; then
  echo "✅ OTP sent successfully!"
  echo ""
  echo "🔐 Step 2: Please check your email for the 6-digit OTP code"
  echo "Enter the OTP code: "
  read -r OTP_CODE
  
  # Step 2: Verify OTP
  echo ""
  echo "🔍 Step 2: Verifying OTP..."
  VERIFY_OTP_RESPONSE=$(curl -s -X POST "$API_BASE/auth/verify-otp" \
    -H "Content-Type: application/json" \
    -d "{
      \"email\": \"$EMAIL\",
      \"otp\": \"$OTP_CODE\",
      \"type\": \"signup\"
    }")

  echo "Response: $VERIFY_OTP_RESPONSE"

  if echo "$VERIFY_OTP_RESPONSE" | grep -q '"success":true'; then
    echo "✅ OTP verified successfully!"
    
    # Step 3: Complete Signup
    echo ""
    echo "👤 Step 3: Completing signup..."
    SIGNUP_RESPONSE=$(curl -s -X POST "$API_BASE/auth/signup" \
      -H "Content-Type: application/json" \
      -d "{
        \"fullName\": \"$FULL_NAME\",
        \"email\": \"$EMAIL\",
        \"password\": \"$PASSWORD\",
        \"otp\": \"$OTP_CODE\"
      }")

    echo "Response: $SIGNUP_RESPONSE"

    if echo "$SIGNUP_RESPONSE" | grep -q '"success":true'; then
      echo "🎉 Account created successfully!"
      
      # Extract token for future requests
      TOKEN=$(echo "$SIGNUP_RESPONSE" | grep -o '"token":"[^"]*"' | cut -d'"' -f4)
      echo "🔑 JWT Token: $TOKEN"
      
      # Test Login
      echo ""
      echo "🔐 Testing login with new account..."
      LOGIN_RESPONSE=$(curl -s -X POST "$API_BASE/auth/login" \
        -H "Content-Type: application/json" \
        -d "{
          \"email\": \"$EMAIL\",
          \"password\": \"$PASSWORD\"
        }")

      echo "Response: $LOGIN_RESPONSE"

      if echo "$LOGIN_RESPONSE" | grep -q '"success":true'; then
        echo "✅ Login successful!"
        echo ""
        echo "🎯 Two-step signup process completed successfully!"
        echo "================================================"
        echo "Summary:"
        echo "1. ✅ OTP sent to email"
        echo "2. ✅ OTP verified"
        echo "3. ✅ Account created"
        echo "4. ✅ Login working"
      else
        echo "❌ Login failed!"
      fi
    else
      echo "❌ Signup failed!"
    fi
  else
    echo "❌ OTP verification failed!"
  fi
else
  echo "❌ Failed to send OTP!"
fi

echo ""
echo "📚 For detailed API documentation, see: API_DOCUMENTATION.md"
