import * as nodemailer from 'nodemailer';
import { createError } from '../middleware/error.middleware';

export class EmailService {
  private transporter: nodemailer.Transporter;

  constructor() {
    // Check if email configuration is provided
    const smtpUser = process.env.SMTP_USER;
    const smtpPass = process.env.SMTP_PASS;

    if (
      !smtpUser ||
      !smtpPass ||
      smtpUser === 'your-email@gmail.com' ||
      smtpPass === 'your-16-character-app-password'
    ) {
      console.warn(
        '⚠️  Email configuration not set up properly. Please configure SMTP settings in .env file.',
      );
      console.warn('📧 See EMAIL_SETUP.md for detailed setup instructions.');
    }

    // You should use environment variables for these settings
    this.transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST || 'smtp.gmail.com',
      port: parseInt(process.env.SMTP_PORT || '587'),
      secure: false, // true for 465, false for other ports
      auth: {
        user: smtpUser || 'your-email@gmail.com',
        pass: smtpPass || 'your-app-password',
      },
    });
  }

  async sendOTP(email: string, otp: string, type: 'signup' | 'password_reset') {
    try {
      // Validate email configuration before attempting to send
      const smtpUser = process.env.SMTP_USER;
      const smtpPass = process.env.SMTP_PASS;

      if (
        !smtpUser ||
        !smtpPass ||
        smtpUser === 'your-email@gmail.com' ||
        smtpPass === 'your-16-character-app-password'
      ) {
        throw new Error(
          'Email configuration not set up. Please configure SMTP_USER and SMTP_PASS in your .env file. See EMAIL_SETUP.md for instructions.',
        );
      }

      const subject =
        type === 'signup'
          ? 'Welcome to Cup Entertainment - Verify Your Email'
          : 'Password Reset OTP';
      const html = this.getOTPEmailTemplate(otp, type);

      const mailOptions = {
        from: `"Cup Entertainment" <${smtpUser}>`,
        to: email,
        subject: subject,
        html: html,
      };

      console.log(`📧 Attempting to send ${type} OTP to: ${email}`);
      const info = await this.transporter.sendMail(mailOptions);
      console.log('✅ Email sent successfully:', info.messageId);
      return true;
    } catch (error) {
      console.error('❌ Error sending email:', error);

      // Provide more specific error messages
      if (error.message.includes('Invalid login')) {
        throw createError(
          'Email authentication failed. Please check your SMTP credentials in .env file.',
          500,
        );
      } else if (error.message.includes('Email configuration not set up')) {
        throw createError(error.message, 500);
      } else if (error.message.includes('ECONNREFUSED')) {
        throw createError(
          'Cannot connect to email server. Please check your SMTP settings.',
          500,
        );
      } else {
        throw createError(`Failed to send email: ${error.message}`, 500);
      }
    }
  }

  private getOTPEmailTemplate(
    otp: string,
    type: 'signup' | 'password_reset',
  ): string {
    const title =
      type === 'signup'
        ? 'Welcome to Cup Entertainment!'
        : 'Password Reset Request';
    const message =
      type === 'signup'
        ? 'Thank you for signing up! Please verify your email address to complete your registration.'
        : 'You have requested to reset your password. Please use the OTP below to proceed.';

    return `
      <!DOCTYPE html>
      <html>
      <head>
        <style>
          .container {
            max-width: 600px;
            margin: 0 auto;
            font-family: Arial, sans-serif;
            background-color: #f8f9fa;
            padding: 20px;
          }
          .header {
            background-color: #007bff;
            color: white;
            padding: 20px;
            text-align: center;
            border-radius: 10px 10px 0 0;
          }
          .content {
            background-color: white;
            padding: 30px;
            border-radius: 0 0 10px 10px;
            box-shadow: 0 2px 10px rgba(0,0,0,0.1);
          }
          .otp-box {
            background-color: #f8f9fa;
            border: 2px dashed #007bff;
            padding: 20px;
            text-align: center;
            margin: 20px 0;
            border-radius: 8px;
          }
          .otp-code {
            font-size: 32px;
            font-weight: bold;
            color: #007bff;
            letter-spacing: 8px;
          }
          .footer {
            text-align: center;
            margin-top: 20px;
            color: #6c757d;
            font-size: 14px;
          }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1>${title}</h1>
          </div>
          <div class="content">
            <p>Hello,</p>
            <p>${message}</p>
            
            <div class="otp-box">
              <p style="margin: 0; font-size: 18px; color: #333;">Your verification code is:</p>
              <div class="otp-code">${otp}</div>
            </div>
            
            <p><strong>Important:</strong></p>
            <ul>
              <li>This code will expire in 10 minutes</li>
              <li>Do not share this code with anyone</li>
              <li>If you didn't request this, please ignore this email</li>
            </ul>
            
            <p>Best regards,<br>Cup Entertainment Team</p>
          </div>
          <div class="footer">
            <p>This is an automated email. Please do not reply to this message.</p>
          </div>
        </div>
      </body>
      </html>
    `;
  }
}
