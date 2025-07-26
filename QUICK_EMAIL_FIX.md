# Quick Fix for Email Error - Cup Entertainment Backend

## The Issue

You're getting a "Failed to send email" error because the email configuration in your `.env` file is not set up with real email credentials.

## Quick Solutions

### Option 1: Development Mode (Immediate Testing)

Your `.env` file is already set to development mode. When you restart the server, the OTP will be printed in the console instead of being emailed.

1. **Restart your server:**

   ```bash
   npm run start:dev
   ```

2. **Test the signup:**
   - Make your frontend request to `/auth/send-otp`
   - Check the **server console** for the OTP code
   - Use that OTP code in your frontend

3. **Look for this in your server console:**
   ```
   🚀 DEVELOPMENT MODE - Email not configured
   📧 OTP for user@example.com : 123456
   ⏰ Expires at: 2025-01-26T...
   💡 To enable real emails, configure SMTP settings in .env file
   ```

### Option 2: Configure Real Email (Gmail - Recommended)

1. **Enable 2-Factor Authentication on Gmail:**
   - Go to [Google Account Settings](https://myaccount.google.com)
   - Navigate to "Security"
   - Enable "2-Step Verification"

2. **Generate App Password:**
   - In Google Account Settings > Security
   - Click on "App passwords"
   - Select "Mail" and generate a new password
   - Copy the 16-character password

3. **Update your `.env` file:**

   ```bash
   SMTP_HOST="smtp.gmail.com"
   SMTP_PORT=587
   SMTP_USER="your-actual-email@gmail.com"
   SMTP_PASS="your-16-character-app-password"
   ```

4. **Restart your server:**
   ```bash
   npm run start:dev
   ```

### Option 3: Use Setup Script (Windows)

Run the email setup script:

```bash
setup-email.bat
```

## Test After Setup

1. **Start your server:**

   ```bash
   npm run start:dev
   ```

2. **Test with curl:**

   ```bash
   curl -X POST http://localhost:3000/auth/send-otp \
     -H "Content-Type: application/json" \
     -d '{
       "email": "test@example.com",
       "type": "signup"
     }'
   ```

3. **Expected responses:**
   - **Development mode:** OTP will be in server console
   - **Email configured:** Real email will be sent

## Current Error Explanation

The error occurs because:

1. Your `.env` file has placeholder values (`your-email@gmail.com`)
2. The email service tries to authenticate with invalid credentials
3. The SMTP server rejects the connection

## Recommended Next Steps

1. **For immediate testing:** Use development mode (Option 1)
2. **For production:** Set up real email credentials (Option 2)
3. **Restart your server** after any `.env` changes

The development mode will allow you to test the complete signup flow without configuring email right away!
