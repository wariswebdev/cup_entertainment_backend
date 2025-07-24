import {
  IsString,
  IsNotEmpty,
  IsDateString,
  IsInt,
  IsArray,
  IsUrl,
  IsOptional,
} from 'class-validator';
import { Type } from 'class-transformer';

export class CreateMovieDto {
  @IsNotEmpty()
  @IsString()
  title: string;

  @IsNotEmpty()
  @IsString()
  description: string;

  @IsDateString()
  releaseDate: string;

  @IsInt()
  @Type(() => Number)
  duration: number;

  @IsArray()
  @IsString({ each: true })
  genre: string[];

  @IsUrl()
  posterUrl: string;

  @IsOptional()
  @IsUrl()
  trailerUrl?: string;

  @IsUrl()
  videoUrl: string;
}
