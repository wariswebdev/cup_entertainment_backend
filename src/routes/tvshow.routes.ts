import { Router } from 'express';
import { PrismaService } from '../prisma/prisma.service';
import { TVShowService } from '../services/tvshow.service';
import {
  validateCreateTVShow,
  validateUpdateTVShow,
} from '../middleware/validation.middleware';
import { asyncHandler } from '../middleware/error.middleware';

const router = Router();
const prismaService = new PrismaService();
const tvShowService = new TVShowService(prismaService);

router.post(
  '/',
  validateCreateTVShow,
  asyncHandler(async (req, res) => {
    const result = await tvShowService.create(req.body);
    res.status(201).json(result);
  }),
);

router.get(
  '/genre/:genre',
  asyncHandler(async (req, res) => {
    const { genre } = req.params;
    const result = await tvShowService.findByGenre(genre);
    res.status(200).json(result);
  }),
);

router.get(
  '/search/:query',
  asyncHandler(async (req, res) => {
    const { query } = req.params;
    const result = await tvShowService.search(query);
    res.status(200).json(result);
  }),
);

router.get(
  '/',
  asyncHandler(async (req, res) => {
    const { genre, search } = req.query;

    if (genre) {
      const result = await tvShowService.findByGenre(genre as string);
      return res.status(200).json(result);
    }

    if (search) {
      const result = await tvShowService.search(search as string);
      return res.status(200).json(result);
    }

    const result = await tvShowService.findAll();
    res.status(200).json(result);
  }),
);

router.get(
  '/:id',
  asyncHandler(async (req, res) => {
    const id = parseInt(req.params.id);
    const result = await tvShowService.findOne(id);
    res.status(200).json(result);
  }),
);

router.patch(
  '/:id',
  validateUpdateTVShow,
  asyncHandler(async (req, res) => {
    const id = parseInt(req.params.id);
    const result = await tvShowService.update(id, req.body);
    res.status(200).json(result);
  }),
);

router.delete(
  '/:id',
  asyncHandler(async (req, res) => {
    const id = parseInt(req.params.id);
    const result = await tvShowService.remove(id);
    res.status(200).json(result);
  }),
);

export { router as tvShowRoutes };
