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
    await (this.prisma as any).oTP.deleteMany({
      where: {
        email,
        type,
      },
    });

    // Generate new OTP
    const otp = this.generateOTP();
    const expiresAt = new Date(Date.now() + 10 * 60 * 1000); // 10 minutes from now

    // Save OTP to database
    await (this.prisma as any).oTP.create({
      data: {
        email,
        otp,
        type,
        expiresAt,
      },
    });

    // Send OTP via email
    await this.emailService.sendOTP(email, otp, type);

    return {
      success: true,
      message: `OTP sent to ${email}. Please check your email and enter the 6-digit code.`,
      expiresIn: '10 minutes',
    };
  }

  async verifyOTP(verifyData: VerifyOTPData) {
    const { email, otp, type } = verifyData;

    // Find the OTP record
    const otpRecord = await (this.prisma as any).oTP.findFirst({
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
    await (this.prisma as any).oTP.update({
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
    const recentOTP = await (this.prisma as any).oTP.findFirst({
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
    await (this.prisma as any).oTP.deleteMany({
      where: {
        expiresAt: {
          lt: new Date(),
        },
      },
    });
  }
}
