import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import dotenv from 'dotenv';

import { authRoutes } from './routes/auth.routes';
import { movieRoutes } from './routes/movie.routes';
import { tvShowRoutes } from './routes/tvshow.routes';
import { errorHandler } from './middleware/error.middleware';

// Load environment variables
dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(morgan('combined'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.get('/', (req, res) => {
  res.json({ message: 'Hello World!' });
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
});

export default app;
