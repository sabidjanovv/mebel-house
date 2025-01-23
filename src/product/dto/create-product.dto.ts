import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import {
  IsNotEmpty,
  IsString,
  IsNumber,
  IsOptional,
  Min,
  Max,
  IsPositive,
  IsArray,
} from 'class-validator';

export class CreateProductDto {
  @ApiProperty({
    description: 'Product name',
    example: 'Furniture',
  })
  @IsNotEmpty()
  @IsString()
  name: string;

  @ApiProperty({
    description: 'Product price',
    example: 500,
  })
  @Type(() => Number)
  @IsNotEmpty({ message: 'Price must not be empty' })
  @IsNumber({}, { message: 'Price must be a number' })
  @IsPositive({ message: 'Price must be a positive number' })
  price: number;

  @ApiProperty({
    description: 'Discount percentage (0 to 100)',
    example: 10,
    required: false,
  })
  @IsOptional()
  @Type(() => Number)
  @IsNumber({}, { message: 'Discount must be a number' })
  @Min(0, { message: 'Discount must not be less than 0' })
  @Max(100, { message: 'Discount must not exceed 100' })
  discount: number;

  @ApiProperty({
    description: 'Product description',
    example: 'Experience softness when you lie down',
    required: false,
  })
  @IsOptional()
  @IsString({ message: 'Description must be a string' })
  description: string;

  @ApiProperty({
    example: 1,
    description: 'Category unique identifier',
  })
  @Type(() => Number)
  @IsNumber()
  categoryId: number;

  @ApiProperty({
    example: 1,
    description: 'Stock quantity',
  })
  @Type(() => Number)
  @IsNumber()
  stock: number;

  @IsOptional()
  @Type(() => Number)
  avg_rating?: number;

  @ApiProperty({
    type: 'array',
    description: 'Array of image files (images)',
    items: {
      type: 'string',
      format: 'binary',
    },
  })
  @IsOptional()
  images: any[];

  @ApiProperty({
    type: 'array',
    description: 'Array of tags',
    items: {
      type: 'string',
      example: 'sofa',
      format: 'binary',
    },
    required: true,
  })
  @IsArray()
  @IsOptional()
  tags: any[];

  @ApiProperty({
    type: 'array',
    description: 'Array of colors',
    items: {
      type: 'string',
      example: 'red',
      format: 'binary',
    },
    required: true,
  })
  @IsArray()
  @IsOptional()
  colors: any[];
}
