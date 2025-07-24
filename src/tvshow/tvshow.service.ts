import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateTVShowDto } from './dto/create-tvshow.dto';
import { UpdateTVShowDto } from './dto/update-tvshow.dto';

@Injectable()
export class TVShowService {
  constructor(private prisma: PrismaService) {}

  async create(createTVShowDto: CreateTVShowDto) {
    const tvShow = await this.prisma.tVShow.create({
      data: {
        title: createTVShowDto.title,
        description: createTVShowDto.description,
        firstAired: new Date(createTVShowDto.firstAired),
        totalSeasons: createTVShowDto.totalSeasons,
        totalEpisodes: createTVShowDto.totalEpisodes,
        genre: createTVShowDto.genre,
        posterUrl: createTVShowDto.posterUrl,
        trailerUrl: createTVShowDto.trailerUrl,
        status: createTVShowDto.status,
        network: createTVShowDto.network,
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
      throw new NotFoundException(`TV Show with ID ${id} not found`);
    }

    return {
      success: true,
      message: 'TV Show retrieved successfully',
      tvShow,
    };
  }

  async update(id: number, updateTVShowDto: UpdateTVShowDto) {
    // Check if TV show exists
    const existingTVShow = await this.prisma.tVShow.findUnique({
      where: { id },
    });

    if (!existingTVShow) {
      throw new NotFoundException(`TV Show with ID ${id} not found`);
    }

    const updateData: any = {};

    if (updateTVShowDto.title) updateData.title = updateTVShowDto.title;
    if (updateTVShowDto.description)
      updateData.description = updateTVShowDto.description;
    if (updateTVShowDto.firstAired)
      updateData.firstAired = new Date(updateTVShowDto.firstAired);
    if (updateTVShowDto.totalSeasons)
      updateData.totalSeasons = updateTVShowDto.totalSeasons;
    if (updateTVShowDto.totalEpisodes)
      updateData.totalEpisodes = updateTVShowDto.totalEpisodes;
    if (updateTVShowDto.genre) updateData.genre = updateTVShowDto.genre;
    if (updateTVShowDto.posterUrl)
      updateData.posterUrl = updateTVShowDto.posterUrl;
    if (updateTVShowDto.trailerUrl !== undefined)
      updateData.trailerUrl = updateTVShowDto.trailerUrl;
    if (updateTVShowDto.status) updateData.status = updateTVShowDto.status;
    if (updateTVShowDto.network) updateData.network = updateTVShowDto.network;

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
      throw new NotFoundException(`TV Show with ID ${id} not found`);
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
