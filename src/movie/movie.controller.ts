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
import { MovieService } from './movie.service';
import { CreateMovieDto } from './dto/create-movie.dto';
import { UpdateMovieDto } from './dto/update-movie.dto';

@Controller('movies')
export class MovieController {
  constructor(private readonly movieService: MovieService) {}

  @Post()
  create(@Body(ValidationPipe) createMovieDto: CreateMovieDto) {
    return this.movieService.create(createMovieDto);
  }

  @Get('genre/:genre')
  findByGenre(@Param('genre') genre: string) {
    return this.movieService.findByGenre(genre);
  }

  @Get('search/:query')
  search(@Param('query') query: string) {
    return this.movieService.search(query);
  }

  @Get()
  findAll(@Query('genre') genre?: string, @Query('search') search?: string) {
    if (genre) {
      return this.movieService.findByGenre(genre);
    }
    if (search) {
      return this.movieService.search(search);
    }
    return this.movieService.findAll();
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.movieService.findOne(id);
  }

  @Patch(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body(ValidationPipe) updateMovieDto: UpdateMovieDto,
  ) {
    return this.movieService.update(id, updateMovieDto);
  }

  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.movieService.remove(id);
  }
}
