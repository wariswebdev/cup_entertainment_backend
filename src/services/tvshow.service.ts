import { PrismaService } from '../prisma/prisma.service';
import { createError } from '../middleware/error.middleware';

export interface CreateTVShowData {
  title: string;
  description: string;
  firstAired: string;
  totalSeasons: number;
  totalEpisodes: number;
  genre: string[];
  posterUrl: string;
  trailerUrl?: string;
  status: string;
  network: string;
}

export interface UpdateTVShowData {
  title?: string;
  description?: string;
  firstAired?: string;
  totalSeasons?: number;
  totalEpisodes?: number;
  genre?: string[];
  posterUrl?: string;
  trailerUrl?: string;
  status?: string;
  network?: string;
}

export class TVShowService {
  constructor(private prisma: PrismaService) {}

  async create(createTVShowData: CreateTVShowData) {
    const tvShow = await this.prisma.tVShow.create({
      data: {
        title: createTVShowData.title,
        description: createTVShowData.description,
        firstAired: new Date(createTVShowData.firstAired),
        totalSeasons: createTVShowData.totalSeasons,
        totalEpisodes: createTVShowData.totalEpisodes,
        genre: createTVShowData.genre,
        posterUrl: createTVShowData.posterUrl,
        trailerUrl: createTVShowData.trailerUrl,
        status: createTVShowData.status,
        network: createTVShowData.network,
      },
    });

    return {
      success: true,
      message: 'TV Show created successfully',
      tvShow,
    };
  }

  async findAll() {
    const tvShows = await this.prisma.tVShow.findMany({
      orderBy: {
        createdAt: 'desc',
      },
    });

    return {
      success: true,
      message: 'TV Shows retrieved successfully',
      tvShows,
      count: tvShows.length,
    };
  }

  async findOne(id: number) {
    const tvShow = await this.prisma.tVShow.findUnique({
      where: { id },
    });

    if (!tvShow) {
      throw createError(`TV Show with ID ${id} not found`, 404);
    }

    return {
      success: true,
      message: 'TV Show retrieved successfully',
      tvShow,
    };
  }

  async update(id: number, updateTVShowData: UpdateTVShowData) {
    // Check if TV show exists
    const existingTVShow = await this.prisma.tVShow.findUnique({
      where: { id },
    });

    if (!existingTVShow) {
      throw createError(`TV Show with ID ${id} not found`, 404);
    }

    const updateData: any = {};

    if (updateTVShowData.title) updateData.title = updateTVShowData.title;
    if (updateTVShowData.description)
      updateData.description = updateTVShowData.description;
    if (updateTVShowData.firstAired)
      updateData.firstAired = new Date(updateTVShowData.firstAired);
    if (updateTVShowData.totalSeasons)
      updateData.totalSeasons = updateTVShowData.totalSeasons;
    if (updateTVShowData.totalEpisodes)
      updateData.totalEpisodes = updateTVShowData.totalEpisodes;
    if (updateTVShowData.genre) updateData.genre = updateTVShowData.genre;
    if (updateTVShowData.posterUrl)
      updateData.posterUrl = updateTVShowData.posterUrl;
    if (updateTVShowData.trailerUrl !== undefined)
      updateData.trailerUrl = updateTVShowData.trailerUrl;
    if (updateTVShowData.status) updateData.status = updateTVShowData.status;
    if (updateTVShowData.network) updateData.network = updateTVShowData.network;

    const tvShow = await this.prisma.tVShow.update({
      where: { id },
      data: updateData,
    });

    return {
      success: true,
      message: 'TV Show updated successfully',
      tvShow,
    };
  }

  async remove(id: number) {
    // Check if TV show exists
    const existingTVShow = await this.prisma.tVShow.findUnique({
      where: { id },
    });

    if (!existingTVShow) {
      throw createError(`TV Show with ID ${id} not found`, 404);
    }

    await this.prisma.tVShow.delete({
      where: { id },
    });

    return {
      success: true,
      message: 'TV Show deleted successfully',
    };
  }

  async findByGenre(genre: string) {
    const tvShows = await this.prisma.tVShow.findMany({
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
      message: `TV Shows with genre '${genre}' retrieved successfully`,
      tvShows,
      count: tvShows.length,
    };
  }

  async search(query: string) {
    const tvShows = await this.prisma.tVShow.findMany({
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
      tvShows,
      count: tvShows.length,
    };
  }
}
