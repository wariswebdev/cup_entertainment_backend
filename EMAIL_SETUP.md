# Email Configuration Guide for OTP Service

## Gmail Setup (Recommended)

To enable OTP email delivery, you'll need to configure SMTP settings. Here's how to set up Gmail:

### 1. Enable 2-Factor Authentication

1. Go to [Google Account Settings](https://myaccount.google.com)
2. Navigate to "Security"
3. Enable "2-Step Verification"

### 2. Generate App Password

1. In Google Account Settings > Security
2. Click on "App passwords"
3. Select "Mail" and generate a new password
4. Copy the 16-character password (spaces don't matter)

### 3. Update Environment Variables

Create or update your `.env` file:

```bash
# Email Configuration
SMTP_HOST="smtp.gmail.com"
SMTP_PORT=587
SMTP_USER="your-email@gmail.com"
SMTP_PASS="your-16-character-app-password"
```

## Other Email Providers

### Outlook/Hotmail

```bash
SMTP_HOST="smtp-mail.outlook.com"
SMTP_PORT=587
SMTP_USER="your-email@outlook.com"
SMTP_PASS="your-password"
```

### Yahoo

```bash
SMTP_HOST="smtp.mail.yahoo.com"
SMTP_PORT=587
SMTP_USER="your-email@yahoo.com"
SMTP_PASS="your-app-password"
```

### Custom SMTP Server

```bash
SMTP_HOST="your-smtp-server.com"
SMTP_PORT=587  # or 465 for SSL
SMTP_USER="your-username"
SMTP_PASS="your-password"
```

## Testing Email Configuration

1. Start your development server:

   ```bash
   npm run start:dev
   ```

2. Test OTP sending:

   ```bash
   curl -X POST http://localhost:3000/auth/send-otp \
     -H "Content-Type: application/json" \
     -d '{
       "email": "your-test-email@example.com",
       "type": "signup"
     }'
   ```

3. Check your email for the OTP code

## Troubleshooting

### Common Issues:

1. **"Invalid login" error**
   - Make sure you're using an App Password, not your regular password
   - Enable 2-Factor Authentication first

2. **"Connection timeout" error**
   - Check your firewall settings
   - Verify SMTP_HOST and SMTP_PORT are correct
   - Try using port 465 with SSL

3. **"Authentication failed" error**
   - Double-check your email and app password
   - Make sure the email account exists and is active

4. **Emails going to spam**
   - Add your sending email to contacts
   - Check spam folder
   - Consider using a proper email service like SendGrid for production

## Production Email Services

For production applications, consider using dedicated email services:

- **SendGrid**: Professional email API
- **AWS SES**: Amazon's email service
- **Mailgun**: Developer-friendly email API
- **Nodemailer with OAuth2**: More secure Gmail integration

## Security Notes

- Never commit `.env` files to version control
- Use app passwords instead of regular passwords
- Consider rate limiting for OTP requests
- Implement proper error handling for email failures
- Use HTTPS in production to protect email credentials

## Email Template Customization

The OTP email template can be customized in:
`src/services/email.service.ts`

You can modify:

- Email styling (CSS)
- Company branding
- Message content
- Email layout

The template supports both signup and password reset OTPs with different messaging.
