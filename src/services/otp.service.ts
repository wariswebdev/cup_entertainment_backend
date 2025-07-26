import { PrismaService } from '../prisma/prisma.service';
import { EmailService } from './email.service';
import { createError } from '../middleware/error.middleware';

export interface OTPData {
  email: string;
  type: 'signup' | 'password_reset';
}

export interface VerifyOTPData {
  email: string;
  otp: string;
  type: 'signup' | 'password_reset';
}

export class OTPService {
  private emailService: EmailService;

  constructor(private prisma: PrismaService) {
    this.emailService = new EmailService();
  }

  private generateOTP(): string {
    return Math.floor(100000 + Math.random() * 900000).toString();
  }

  async sendOTP(otpData: OTPData) {
    const { email, type } = otpData;

    // Check if user already exists for signup
    if (type === 'signup') {
      const existingUser = await this.prisma.user.findUnique({
        where: { email },
      });

      if (existingUser) {
        throw createError('User with this email already exists', 409);
      }
    }

    // Clean up any existing OTPs for this email and type
    await this.prisma.oTP.deleteMany({
      where: {
        email,
        type,
      },
    });

    // Generate new OTP
    const otp = this.generateOTP();
    const expiresAt = new Date(Date.now() + 10 * 60 * 1000); // 10 minutes from now

    // Save OTP to database
    await this.prisma.oTP.create({
      data: {
        email,
        otp,
        type,
        expiresAt,
      },
    });

    // Development mode - if email is not configured properly, log OTP to console
    const isDevelopment = process.env.NODE_ENV === 'development';
    const smtpUser = process.env.SMTP_USER;
    const smtpPass = process.env.SMTP_PASS;
    const isEmailConfigured =
      smtpUser &&
      smtpPass &&
      smtpUser !== 'your-email@gmail.com' &&
      smtpPass !== 'your-16-character-app-password';

    if (isDevelopment && !isEmailConfigured) {
      console.log('🚀 DEVELOPMENT MODE - Email not configured');
      console.log('📧 OTP for', email, ':', otp);
      console.log('⏰ Expires at:', expiresAt);
      console.log(
        '💡 To enable real emails, configure SMTP settings in .env file',
      );

      return {
        success: true,
        message: `Development mode: OTP generated for ${email}. Check server console for the OTP code.`,
        expiresIn: '10 minutes',
        developmentOTP: otp, // Include OTP in response for development
      };
    }

    // Send OTP via email
    try {
      await this.emailService.sendOTP(email, otp, type);
    } catch (error) {
      // Clean up the OTP if email sending fails
      await this.prisma.oTP.deleteMany({
        where: { email, otp, type },
      });
      throw error;
    }

    return {
      success: true,
      message: `OTP sent to ${email}. Please check your email and enter the 6-digit code.`,
      expiresIn: '10 minutes',
    };
  }

  async verifyOTP(verifyData: VerifyOTPData) {
    const { email, otp, type } = verifyData;

    // Find the OTP record
    const otpRecord = await this.prisma.oTP.findFirst({
      where: {
        email,
        otp,
        type,
        verified: false,
      },
      orderBy: {
        createdAt: 'desc',
      },
    });

    if (!otpRecord) {
      throw createError('Invalid OTP', 400);
    }

    // Check if OTP has expired
    if (new Date() > otpRecord.expiresAt) {
      throw createError('OTP has expired. Please request a new one.', 400);
    }

    // Mark OTP as verified
    await this.prisma.oTP.update({
      where: { id: otpRecord.id },
      data: { verified: true },
    });

    return {
      success: true,
      message: 'OTP verified successfully',
      otpId: otpRecord.id,
    };
  }

  async resendOTP(email: string, type: 'signup' | 'password_reset') {
    // Check if there's a recent OTP sent (within 1 minute) to prevent spam
    const recentOTP = await this.prisma.oTP.findFirst({
      where: {
        email,
        type,
        createdAt: {
          gte: new Date(Date.now() - 60 * 1000), // 1 minute ago
        },
      },
    });

    if (recentOTP) {
      throw createError(
        'Please wait at least 1 minute before requesting a new OTP',
        429,
      );
    }

    return this.sendOTP({ email, type });
  }

  async cleanupExpiredOTPs() {
    await this.prisma.oTP.deleteMany({
      where: {
        expiresAt: {
          lt: new Date(),
        },
      },
    });
  }
}
