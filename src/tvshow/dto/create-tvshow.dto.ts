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

export class CreateTVShowDto {
  @IsNotEmpty()
  @IsString()
  title: string;

  @IsNotEmpty()
  @IsString()
  description: string;

  @IsDateString()
  firstAired: string;

  @IsInt()
  @Type(() => Number)
  totalSeasons: number;

  @IsInt()
  @Type(() => Number)
  totalEpisodes: number;

  @IsArray()
  @IsString({ each: true })
  genre: string[];

  @IsUrl()
  posterUrl: string;

  @IsOptional()
  @IsUrl()
  trailerUrl?: string;

  @IsNotEmpty()
  @IsString()
  status: string;

  @IsNotEmpty()
  @IsString()
  network: string;
}
