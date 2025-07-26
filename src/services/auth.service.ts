import * as bcrypt from 'bcryptjs';
import * as jwt from 'jsonwebtoken';
import { PrismaService } from '../prisma/prisma.service';
import { createError } from '../middleware/error.middleware';

export interface SignupData {
  fullName: string;
  email: string;
  password: string;
  otp: string;
}

export interface LoginData {
  email: string;
  password: string;
}

export class AuthService {
  constructor(private prisma: PrismaService) {}

  private generateToken(user: { id: number; email: string }): string {
    const payload = { sub: user.id, email: user.email };
    const secret = process.env.JWT_SECRET || 'your-secret-key';
    return jwt.sign(payload, secret, { expiresIn: '1d' });
  }

  async signup(signupData: SignupData) {
    const { fullName, email, password, otp } = signupData;

    // Check if user already exists
    const existingUser = await this.prisma.user.findUnique({
      where: { email },
    });

    if (existingUser) {
      throw createError('User with this email already exists', 409);
    }

    // Verify OTP
    const otpRecord = await this.prisma.oTP.findFirst({
      where: {
        email,
        otp,
        type: 'signup',
        verified: true,
        expiresAt: {
          gt: new Date(),
        },
      },
      orderBy: {
        createdAt: 'desc',
      },
    });

    if (!otpRecord) {
      throw createError(
        'Invalid or expired OTP. Please verify your email first.',
        400,
      );
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 12);

    // Create user
    const user = await this.prisma.user.create({
      data: {
        fullName,
        email,
        password: hashedPassword,
      },
      select: {
        id: true,
        fullName: true,
        email: true,
        createdAt: true,
      },
    });

    // Clean up the used OTP
    await this.prisma.oTP.delete({
      where: { id: otpRecord.id },
    });

    // Generate JWT token
    const token = this.generateToken({ id: user.id, email: user.email });

    return {
      success: true,
      message: 'User created successfully',
      user,
      token,
    };
  }

  async login(loginData: LoginData) {
    const { email, password } = loginData;

    // Find user by email
    const user = await this.prisma.user.findUnique({
      where: { email },
    });

    if (!user) {
      throw createError('Invalid credentials', 401);
    }

    // Check password
    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      throw createError('Invalid credentials', 401);
    }

    // Generate JWT token
    const token = this.generateToken({ id: user.id, email: user.email });

    return {
      success: true,
      message: 'Login successful',
      user: {
        id: user.id,
        fullName: user.fullName,
        email: user.email,
      },
      token,
    };
  }
}
