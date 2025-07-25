import { Router } from 'express';
import { PrismaService } from '../prisma/prisma.service';
import { AuthService } from '../services/auth.service';
import {
  validateSignup,
  validateLogin,
} from '../middleware/validation.middleware';
import { asyncHandler } from '../middleware/error.middleware';

const router = Router();
const prismaService = new PrismaService();
const authService = new AuthService(prismaService);

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
