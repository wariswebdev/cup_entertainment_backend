import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
  ValidationPipe,
  ParseIntPipe,
} from '@nestjs/common';
import { TVShowService } from './tvshow.service';
import { CreateTVShowDto } from './dto/create-tvshow.dto';
import { UpdateTVShowDto } from './dto/update-tvshow.dto';

@Controller('tv-shows')
export class TVShowController {
  constructor(private readonly tvShowService: TVShowService) {}

  @Post()
  create(@Body(ValidationPipe) createTVShowDto: CreateTVShowDto) {
    return this.tvShowService.create(createTVShowDto);
  }

  @Get('genre/:genre')
  findByGenre(@Param('genre') genre: string) {
    return this.tvShowService.findByGenre(genre);
  }

  @Get('search/:query')
  search(@Param('query') query: string) {
    return this.tvShowService.search(query);
  }

  @Get()
  findAll(@Query('genre') genre?: string, @Query('search') search?: string) {
    if (genre) {
      return this.tvShowService.findByGenre(genre);
    }
    if (search) {
      return this.tvShowService.search(search);
    }
    return this.tvShowService.findAll();
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.tvShowService.findOne(id);
  }

  @Patch(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body(ValidationPipe) updateTVShowDto: UpdateTVShowDto,
  ) {
    return this.tvShowService.update(id, updateTVShowDto);
  }

  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.tvShowService.remove(id);
  }
}
