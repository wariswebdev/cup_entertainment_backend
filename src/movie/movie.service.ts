import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateMovieDto } from './dto/create-movie.dto';
import { UpdateMovieDto } from './dto/update-movie.dto';

@Injectable()
export class MovieService {
  constructor(private prisma: PrismaService) {}

  async create(createMovieDto: CreateMovieDto) {
    const movie = await this.prisma.movie.create({
      data: {
        title: createMovieDto.title,
        description: createMovieDto.description,
        releaseDate: new Date(createMovieDto.releaseDate),
        duration: createMovieDto.duration,
        genre: createMovieDto.genre,
        posterUrl: createMovieDto.posterUrl,
        trailerUrl: createMovieDto.trailerUrl,
        videoUrl: createMovieDto.videoUrl,
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
      throw new NotFoundException(`Movie with ID ${id} not found`);
    }

    return {
      success: true,
      message: 'Movie retrieved successfully',
      movie,
    };
  }

  async update(id: number, updateMovieDto: UpdateMovieDto) {
    // Check if movie exists
    const existingMovie = await this.prisma.movie.findUnique({
      where: { id },
    });

    if (!existingMovie) {
      throw new NotFoundException(`Movie with ID ${id} not found`);
    }

    const updateData: any = {};

    if (updateMovieDto.title) updateData.title = updateMovieDto.title;
    if (updateMovieDto.description)
      updateData.description = updateMovieDto.description;
    if (updateMovieDto.releaseDate)
      updateData.releaseDate = new Date(updateMovieDto.releaseDate);
    if (updateMovieDto.duration) updateData.duration = updateMovieDto.duration;
    if (updateMovieDto.genre) updateData.genre = updateMovieDto.genre;
    if (updateMovieDto.posterUrl)
      updateData.posterUrl = updateMovieDto.posterUrl;
    if (updateMovieDto.trailerUrl !== undefined)
      updateData.trailerUrl = updateMovieDto.trailerUrl;
    if (updateMovieDto.videoUrl) updateData.videoUrl = updateMovieDto.videoUrl;

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
      throw new NotFoundException(`Movie with ID ${id} not found`);
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
