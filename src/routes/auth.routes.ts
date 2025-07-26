import { Router } from 'express';
import { PrismaService } from '../prisma/prisma.service';
import { AuthService } from '../services/auth.service';
import { OTPService } from '../services/otp.service';
import {
  validateSignup,
  validateLogin,
  validateSendOTP,
  validateVerifyOTP,
  validateResendOTP,
} from '../middleware/validation.middleware';
import { asyncHandler } from '../middleware/error.middleware';

const router = Router();
const prismaService = new PrismaService();
const authService = new AuthService(prismaService);
const otpService = new OTPService(prismaService);

// Send OTP for signup
router.post(
  '/send-otp',
  validateSendOTP,
  asyncHandler(async (req, res) => {
    const result = await otpService.sendOTP(req.body);
    res.status(200).json(result);
  }),
);

// Verify OTP
router.post(
  '/verify-otp',
  validateVerifyOTP,
  asyncHandler(async (req, res) => {
    const result = await otpService.verifyOTP(req.body);
    res.status(200).json(result);
  }),
);

// Resend OTP
router.post(
  '/resend-otp',
  validateResendOTP,
  asyncHandler(async (req, res) => {
    const { email, type } = req.body;
    const result = await otpService.resendOTP(email, type);
    res.status(200).json(result);
  }),
);

// Signup (requires verified OTP)
router.post(
  '/signup',
  validateSignup,
  asyncHandler(async (req, res) => {
    const result = await authService.signup(req.body);
    res.status(201).json(result);
  }),
);

router.post(
  '/login',
  validateLogin,
  asyncHandler(async (req, res) => {
    const result = await authService.login(req.body);
    res.status(200).json(result);
  }),
);

export { router as authRoutes };
