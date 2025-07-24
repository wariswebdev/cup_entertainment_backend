import { Module } from '@nestjs/common';
import { TVShowService } from './tvshow.service';
import { TVShowController } from './tvshow.controller';
import { PrismaService } from '../prisma/prisma.service';

@Module({
  controllers: [TVShowController],
  providers: [TVShowService, PrismaService],
})
export class TVShowModule {}
