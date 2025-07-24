import {
  IsString,
  IsOptional,
  IsDateString,
  IsInt,
  IsArray,
  IsUrl,
} from 'class-validator';
import { Type } from 'class-transformer';

export class UpdateMovieDto {
  @IsOptional()
  @IsString()
  title?: string;

  @IsOptional()
  @IsString()
  description?: string;

  @IsOptional()
  @IsDateString()
  releaseDate?: string;

  @IsOptional()
  @IsInt()
  @Type(() => Number)
  duration?: number;

  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  genre?: string[];

  @IsOptional()
  @IsUrl()
  posterUrl?: string;

  @IsOptional()
  @IsUrl()
  trailerUrl?: string;

  @IsOptional()
  @IsUrl()
  videoUrl?: string;
}
