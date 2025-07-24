import { CreateTVShowDto } from './create-tvshow.dto';
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

export class UpdateTVShowDto {
  @IsOptional()
  @IsString()
  title?: string;

  @IsOptional()
  @IsString()
  description?: string;

  @IsOptional()
  @IsDateString()
  firstAired?: string;

  @IsOptional()
  @IsInt()
  @Type(() => Number)
  totalSeasons?: number;

  @IsOptional()
  @IsInt()
  @Type(() => Number)
  totalEpisodes?: number;

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
  @IsString()
  status?: string;

  @IsOptional()
  @IsString()
  network?: string;
}
