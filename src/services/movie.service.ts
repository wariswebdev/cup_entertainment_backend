import { PrismaService } from '../prisma/prisma.service';
import { createError } from '../middleware/error.middleware';

export interface CreateMovieData {
  title: string;
  description: string;
  releaseDate: string;
  duration: number;
  genre: string[];
  posterUrl: string;
  trailerUrl?: string;
  videoUrl: string;
}

export interface UpdateMovieData {
  title?: string;
  description?: string;
  releaseDate?: string;
  duration?: number;
  genre?: string[];
  posterUrl?: string;
  trailerUrl?: string;
  videoUrl?: string;
}

export class MovieService {
  constructor(private prisma: PrismaService) {}

  async create(createMovieData: CreateMovieData) {
    const movie = await this.prisma.movie.create({
      data: {
        title: createMovieData.title,
        description: createMovieData.description,
        releaseDate: new Date(createMovieData.releaseDate),
        duration: createMovieData.duration,
        genre: createMovieData.genre,
        posterUrl: createMovieData.posterUrl,
        trailerUrl: createMovieData.trailerUrl,
        videoUrl: createMovieData.videoUrl,
      },
    });

    return {
      success: true,
      message: 'Movie created successfully',
      movie,
    };
  }

  async findAll() {
    const movies = await this.prisma.movie.findMany({
      orderBy: {
        createdAt: 'desc',
      },
    });

    return {
      success: true,
      message: 'Movies retrieved successfully',
      movies,
      count: movies.length,
    };
  }

  async findOne(id: number) {
    const movie = await this.prisma.movie.findUnique({
      where: { id },
    });

    if (!movie) {
      throw createError(`Movie with ID ${id} not found`, 404);
    }

    return {
      success: true,
      message: 'Movie retrieved successfully',
      movie,
    };
  }

  async update(id: number, updateMovieData: UpdateMovieData) {
    // Check if movie exists
    const existingMovie = await this.prisma.movie.findUnique({
      where: { id },
    });

    if (!existingMovie) {
      throw createError(`Movie with ID ${id} not found`, 404);
    }

    const updateData: any = {};

    if (updateMovieData.title) updateData.title = updateMovieData.title;
    if (updateMovieData.description)
      updateData.description = updateMovieData.description;
    if (updateMovieData.releaseDate)
      updateData.releaseDate = new Date(updateMovieData.releaseDate);
    if (updateMovieData.duration)
      updateData.duration = updateMovieData.duration;
    if (updateMovieData.genre) updateData.genre = updateMovieData.genre;
    if (updateMovieData.posterUrl)
      updateData.posterUrl = updateMovieData.posterUrl;
    if (updateMovieData.trailerUrl !== undefined)
      updateData.trailerUrl = updateMovieData.trailerUrl;
    if (updateMovieData.videoUrl)
      updateData.videoUrl = updateMovieData.videoUrl;

    const movie = await this.prisma.movie.update({
      where: { id },
      data: updateData,
    });

    return {
      success: true,
      message: 'Movie updated successfully',
      movie,
    };
  }

  async remove(id: number) {
    // Check if movie exists
    const existingMovie = await this.prisma.movie.findUnique({
      where: { id },
    });

    if (!existingMovie) {
      throw createError(`Movie with ID ${id} not found`, 404);
    }

    await this.prisma.movie.delete({
      where: { id },
    });

    return {
      success: true,
      message: 'Movie deleted successfully',
    };
  }

  async findByGenre(genre: string) {
    const movies = await this.prisma.movie.findMany({
      where: {
        genre: {
          has: genre,
        },
      },
      orderBy: {
        createdAt: 'desc',
      },
    });

    return {
      success: true,
      message: `Movies with genre '${genre}' retrieved successfully`,
      movies,
      count: movies.length,
    };
  }

  async search(query: string) {
    const movies = await this.prisma.movie.findMany({
      where: {
        OR: [
          {
            title: {
              contains: query,
              mode: 'insensitive',
            },
          },
          {
            description: {
              contains: query,
              mode: 'insensitive',
            },
          },
        ],
      },
      orderBy: {
        createdAt: 'desc',
      },
    });

    return {
      success: true,
      message: `Search results for '${query}'`,
      movies,
      count: movies.length,
    };
  }
}
