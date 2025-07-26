#!/bin/bash

# Quick Email Setup Script for Cup Entertainment Backend
echo "🔧 Cup Entertainment Email Configuration Setup"
echo "=============================================="
echo ""

# Check if .env file exists
if [ ! -f ".env" ]; then
  echo "❌ .env file not found!"
  exit 1
fi

echo "📧 This script will help you configure email settings for OTP delivery."
echo ""
echo "Choose your email provider:"
echo "1) Gmail (Recommended)"
echo "2) Outlook/Hotmail" 
echo "3) Yahoo"
echo "4) Custom SMTP"
echo "5) Skip email setup (for testing without emails)"
echo ""
read -p "Enter your choice (1-5): " choice

case $choice in
  1)
    echo ""
    echo "📧 Gmail Setup Selected"
    echo "Please follow these steps:"
    echo "1. Go to https://myaccount.google.com"
    echo "2. Navigate to Security > 2-Step Verification (enable if not already enabled)"
    echo "3. Go to Security > App passwords"
    echo "4. Select 'Mail' and generate a new password"
    echo "5. Copy the 16-character password"
    echo ""
    read -p "Enter your Gmail address: " gmail_user
    read -p "Enter your 16-character app password: " gmail_pass
    
    # Update .env file
    sed -i "s/SMTP_USER=.*/SMTP_USER=\"$gmail_user\"/" .env
    sed -i "s/SMTP_PASS=.*/SMTP_PASS=\"$gmail_pass\"/" .env
    
    echo "✅ Gmail configuration updated!"
    ;;
  2)
    echo ""
    echo "📧 Outlook/Hotmail Setup Selected"
    read -p "Enter your Outlook email: " outlook_user
    read -p "Enter your password: " outlook_pass
    
    # Update .env file
    sed -i "s/SMTP_HOST=.*/SMTP_HOST=\"smtp-mail.outlook.com\"/" .env
    sed -i "s/SMTP_USER=.*/SMTP_USER=\"$outlook_user\"/" .env
    sed -i "s/SMTP_PASS=.*/SMTP_PASS=\"$outlook_pass\"/" .env
    
    echo "✅ Outlook configuration updated!"
    ;;
  3)
    echo ""
    echo "📧 Yahoo Setup Selected"
    read -p "Enter your Yahoo email: " yahoo_user
    read -p "Enter your app password: " yahoo_pass
    
    # Update .env file
    sed -i "s/SMTP_HOST=.*/SMTP_HOST=\"smtp.mail.yahoo.com\"/" .env
    sed -i "s/SMTP_USER=.*/SMTP_USER=\"$yahoo_user\"/" .env
    sed -i "s/SMTP_PASS=.*/SMTP_PASS=\"$yahoo_pass\"/" .env
    
    echo "✅ Yahoo configuration updated!"
    ;;
  4)
    echo ""
    echo "📧 Custom SMTP Setup Selected"
    read -p "Enter SMTP host: " smtp_host
    read -p "Enter SMTP port (587 or 465): " smtp_port
    read -p "Enter SMTP username: " smtp_user
    read -p "Enter SMTP password: " smtp_pass
    
    # Update .env file
    sed -i "s/SMTP_HOST=.*/SMTP_HOST=\"$smtp_host\"/" .env
    sed -i "s/SMTP_PORT=.*/SMTP_PORT=$smtp_port/" .env
    sed -i "s/SMTP_USER=.*/SMTP_USER=\"$smtp_user\"/" .env
    sed -i "s/SMTP_PASS=.*/SMTP_PASS=\"$smtp_pass\"/" .env
    
    echo "✅ Custom SMTP configuration updated!"
    ;;
  5)
    echo ""
    echo "⚠️  Skipping email setup"
    echo "Note: OTP emails will not be sent until you configure email settings."
    echo "You can run this script again or manually edit the .env file."
    ;;
  *)
    echo "❌ Invalid choice"
    exit 1
    ;;
esac

echo ""
echo "🚀 Configuration complete!"
echo ""
echo "Next steps:"
echo "1. Restart your development server: npm run start:dev"
echo "2. Test the OTP functionality"
echo ""
echo "For detailed setup instructions, see: EMAIL_SETUP.md"
