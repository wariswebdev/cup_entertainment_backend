import { Router } from 'express';
import { PrismaService } from '../prisma/prisma.service';
import { MovieService } from '../services/movie.service';
import {
  validateCreateMovie,
  validateUpdateMovie,
} from '../middleware/validation.middleware';
import { asyncHandler } from '../middleware/error.middleware';

const router = Router();
const prismaService = new PrismaService();
const movieService = new MovieService(prismaService);

router.post(
  '/',
  validateCreateMovie,
  asyncHandler(async (req, res) => {
    const result = await movieService.create(req.body);
    res.status(201).json(result);
  }),
);

router.get(
  '/genre/:genre',
  asyncHandler(async (req, res) => {
    const { genre } = req.params;
    const result = await movieService.findByGenre(genre);
    res.status(200).json(result);
  }),
);

router.get(
  '/search/:query',
  asyncHandler(async (req, res) => {
    const { query } = req.params;
    const result = await movieService.search(query);
    res.status(200).json(result);
  }),
);

router.get(
  '/',
  asyncHandler(async (req, res) => {
    const { genre, search } = req.query;

    if (genre) {
      const result = await movieService.findByGenre(genre as string);
      return res.status(200).json(result);
    }

    if (search) {
      const result = await movieService.search(search as string);
      return res.status(200).json(result);
    }

    const result = await movieService.findAll();
    res.status(200).json(result);
  }),
);

router.get(
  '/:id',
  asyncHandler(async (req, res) => {
    const id = parseInt(req.params.id);
    const result = await movieService.findOne(id);
    res.status(200).json(result);
  }),
);

router.patch(
  '/:id',
  validateUpdateMovie,
  asyncHandler(async (req, res) => {
    const id = parseInt(req.params.id);
    const result = await movieService.update(id, req.body);
    res.status(200).json(result);
  }),
);

router.delete(
  '/:id',
  asyncHandler(async (req, res) => {
    const id = parseInt(req.params.id);
    const result = await movieService.remove(id);
    res.status(200).json(result);
  }),
);

export { router as movieRoutes };
