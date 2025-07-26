import { Request, Response, NextFunction } from 'express';
import { body, validationResult } from 'express-validator';
import { createError } from './error.middleware';

export const handleValidationErrors = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    const errorMessages = errors
      .array()
      .map((error) => error.msg)
      .join(', ');
    throw createError(errorMessages, 400);
  }
  next();
};

// Auth validation rules
export const validateSignup = [
  body('fullName')
    .notEmpty()
    .withMessage('Full name is required')
    .isString()
    .withMessage('Full name must be a string'),
  body('email').isEmail().withMessage('Please provide a valid email'),
  body('password')
    .isLength({ min: 6 })
    .withMessage('Password must be at least 6 characters long'),
  body('otp')
    .isLength({ min: 6, max: 6 })
    .withMessage('OTP must be exactly 6 digits')
    .isNumeric()
    .withMessage('OTP must contain only numbers'),
  handleValidationErrors,
];

export const validateLogin = [
  body('email').isEmail().withMessage('Please provide a valid email'),
  body('password').notEmpty().withMessage('Password is required'),
  handleValidationErrors,
];

export const validateSendOTP = [
  body('email').isEmail().withMessage('Please provide a valid email'),
  body('type')
    .isIn(['signup', 'password_reset'])
    .withMessage('Type must be either signup or password_reset'),
  handleValidationErrors,
];

export const validateVerifyOTP = [
  body('email').isEmail().withMessage('Please provide a valid email'),
  body('otp')
    .isLength({ min: 6, max: 6 })
    .withMessage('OTP must be exactly 6 digits')
    .isNumeric()
    .withMessage('OTP must contain only numbers'),
  body('type')
    .isIn(['signup', 'password_reset'])
    .withMessage('Type must be either signup or password_reset'),
  handleValidationErrors,
];

export const validateResendOTP = [
  body('email').isEmail().withMessage('Please provide a valid email'),
  body('type')
    .isIn(['signup', 'password_reset'])
    .withMessage('Type must be either signup or password_reset'),
  handleValidationErrors,
];

// Movie validation rules
export const validateCreateMovie = [
  body('title').notEmpty().withMessage('Title is required'),
  body('description').notEmpty().withMessage('Description is required'),
  body('releaseDate')
    .isISO8601()
    .withMessage('Release date must be a valid date'),
  body('duration')
    .isInt({ min: 1 })
    .withMessage('Duration must be a positive integer'),
  body('genre')
    .isArray({ min: 1 })
    .withMessage('At least one genre is required'),
  body('posterUrl').isURL().withMessage('Poster URL must be a valid URL'),
  body('videoUrl').isURL().withMessage('Video URL must be a valid URL'),
  body('trailerUrl')
    .optional()
    .isURL()
    .withMessage('Trailer URL must be a valid URL'),
  handleValidationErrors,
];

export const validateUpdateMovie = [
  body('title').optional().notEmpty().withMessage('Title cannot be empty'),
  body('description')
    .optional()
    .notEmpty()
    .withMessage('Description cannot be empty'),
  body('releaseDate')
    .optional()
    .isISO8601()
    .withMessage('Release date must be a valid date'),
  body('duration')
    .optional()
    .isInt({ min: 1 })
    .withMessage('Duration must be a positive integer'),
  body('genre')
    .optional()
    .isArray({ min: 1 })
    .withMessage('At least one genre is required'),
  body('posterUrl')
    .optional()
    .isURL()
    .withMessage('Poster URL must be a valid URL'),
  body('videoUrl')
    .optional()
    .isURL()
    .withMessage('Video URL must be a valid URL'),
  body('trailerUrl')
    .optional()
    .isURL()
    .withMessage('Trailer URL must be a valid URL'),
  handleValidationErrors,
];

// TV Show validation rules
export const validateCreateTVShow = [
  body('title').notEmpty().withMessage('Title is required'),
  body('description').notEmpty().withMessage('Description is required'),
  body('firstAired')
    .isISO8601()
    .withMessage('First aired date must be a valid date'),
  body('totalSeasons')
    .isInt({ min: 1 })
    .withMessage('Total seasons must be a positive integer'),
  body('totalEpisodes')
    .isInt({ min: 1 })
    .withMessage('Total episodes must be a positive integer'),
  body('genre')
    .isArray({ min: 1 })
    .withMessage('At least one genre is required'),
  body('posterUrl').isURL().withMessage('Poster URL must be a valid URL'),
  body('status').notEmpty().withMessage('Status is required'),
  body('network').notEmpty().withMessage('Network is required'),
  body('trailerUrl')
    .optional()
    .isURL()
    .withMessage('Trailer URL must be a valid URL'),
  handleValidationErrors,
];

export const validateUpdateTVShow = [
  body('title').optional().notEmpty().withMessage('Title cannot be empty'),
  body('description')
    .optional()
    .notEmpty()
    .withMessage('Description cannot be empty'),
  body('firstAired')
    .optional()
    .isISO8601()
    .withMessage('First aired date must be a valid date'),
  body('totalSeasons')
    .optional()
    .isInt({ min: 1 })
    .withMessage('Total seasons must be a positive integer'),
  body('totalEpisodes')
    .optional()
    .isInt({ min: 1 })
    .withMessage('Total episodes must be a positive integer'),
  body('genre')
    .optional()
    .isArray({ min: 1 })
    .withMessage('At least one genre is required'),
  body('posterUrl')
    .optional()
    .isURL()
    .withMessage('Poster URL must be a valid URL'),
  body('status').optional().notEmpty().withMessage('Status cannot be empty'),
  body('network').optional().notEmpty().withMessage('Network cannot be empty'),
  body('trailerUrl')
    .optional()
    .isURL()
    .withMessage('Trailer URL must be a valid URL'),
  handleValidationErrors,
];
