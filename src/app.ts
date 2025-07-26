import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import dotenv from 'dotenv';

import { authRoutes } from './routes/auth.routes';
import { movieRoutes } from './routes/movie.routes';
import { tvShowRoutes } from './routes/tvshow.routes';
import { errorHandler } from './middleware/error.middleware';
import { CleanupService } from './services/cleanup.service';

// Load environment variables
dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

// Initialize cleanup service
const cleanupService = new CleanupService();
cleanupService.startCleanupJob();

// Middleware
app.use(cors());
app.use(morgan('combined'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.get('/', (req, res) => {
  res.json({
    message: 'Cup Entertainment API',
    version: '1.0.0',
    endpoints: {
      auth: {
        'POST /auth/send-otp': 'Send OTP for email verification',
        'POST /auth/verify-otp': 'Verify OTP',
        'POST /auth/resend-otp': 'Resend OTP',
        'POST /auth/signup': 'Register new user (requires verified OTP)',
        'POST /auth/login': 'Login user',
      },
      movies: 'CRUD operations for movies',
      tvShows: 'CRUD operations for TV shows',
    },
  });
});

app.get('/hello', (req, res) => {
  res.json({ message: 'hello' });
});

app.use('/auth', authRoutes);
app.use('/movies', movieRoutes);
app.use('/tv-shows', tvShowRoutes);

// Error handling middleware
app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
  console.log('OTP cleanup service started');
});

// Graceful shutdown
process.on('SIGINT', () => {
  console.log('Shutting down gracefully...');
  cleanupService.stopCleanupJob();
  process.exit(0);
});

process.on('SIGTERM', () => {
  console.log('Shutting down gracefully...');
  cleanupService.stopCleanupJob();
  process.exit(0);
});

export default app;
