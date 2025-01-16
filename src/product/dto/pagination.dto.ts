import { IsOptional, IsNumber, IsString } from 'class-validator';
import { Type } from 'class-transformer';

export class PaginationDto {
  @IsOptional()
  @IsString()
  filter?: string;

  @IsOptional()
  @IsString()
  order?: 'asc' | 'desc';
  
  @IsOptional()
  price?: 'asc' | 'desc';

  @IsOptional()
  @Type(() => Number) // Convert to number
  @IsNumber()
  page?: number;

  @IsOptional()
  @Type(() => Number) // Convert to number
  @IsNumber()
  limit?: number;
}
