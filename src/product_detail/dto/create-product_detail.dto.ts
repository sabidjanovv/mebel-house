import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreateProductDetailDto {
  @ApiProperty({
    example: '1 piece',
    description: 'Sales package contents',
  })
  @IsString()
  @IsNotEmpty()
  sales_package: string;

  @ApiProperty({
    example: 'XYZ123',
    description: 'Model number',
  })
  @IsString()
  @IsNotEmpty()
  model_number: string;

  @ApiProperty({
    example: 'Metal',
    description: 'Secondary material',
  })
  @IsString()
  @IsNotEmpty()
  secondary_material: string;

  @ApiProperty({
    example: 'Modular',
    description: 'Configuration type',
  })
  @IsString()
  @IsNotEmpty()
  configuration: string;

  @ApiProperty({
    example: 'Leather',
    description: 'Upholstery material',
  })
  @IsString()
  @IsNotEmpty()
  upholstery_material: string;

  @ApiProperty({
    example: 'Foam',
    description: 'Filling material',
  })
  @IsString()
  @IsNotEmpty()
  filling_material: string;

  @ApiProperty({
    example: 'Glossy',
    description: 'Finish type',
  })
  @IsString()
  @IsNotEmpty()
  finish_type: string;

  @ApiProperty({
    example: 'Yes',
    description: 'Is the headrest adjustable',
  })
  @IsString()
  @IsNotEmpty()
  adjustable_headrest: string;

  @ApiProperty({
    example: '120 kg',
    description: 'Maximum load capacity',
  })
  @IsString()
  @IsNotEmpty()
  maximum_load_capacity: string;

  @ApiProperty({
    example: 'India',
    description: 'Country of manufacture',
  })
  @IsString()
  @IsNotEmpty()
  origin_of_manufacture: string;

  @ApiProperty({
    example: '200 cm',
    description: 'Width',
  })
  @IsString()
  @IsNotEmpty()
  width: string;

  @ApiProperty({
    example: '100 cm',
    description: 'Height',
  })
  @IsString()
  @IsNotEmpty()
  height: string;

  @ApiProperty({
    example: '90 cm',
    description: 'Depth',
  })
  @IsString()
  @IsNotEmpty()
  depth: string;

  @ApiProperty({
    example: '50 kg',
    description: 'Weight',
  })
  @IsString()
  @IsNotEmpty()
  weight: string;

  @ApiProperty({
    example: '45 cm',
    description: 'Seat height',
  })
  @IsString()
  @IsNotEmpty()
  seat_height: string;

  @ApiProperty({
    example: '10 cm',
    description: 'Leg height',
  })
  @IsString()
  @IsNotEmpty()
  leg_height: string;

  @ApiProperty({
    example: '1 year',
    description: 'Warranty summary',
  })
  @IsString()
  @IsNotEmpty()
  warranty_summary: string;

  @ApiProperty({
    example: 'Visit the website',
    description: 'Warranty service type',
  })
  @IsString()
  @IsNotEmpty()
  warranty_service_type: string;

  @ApiProperty({
    example: 'Manufacturing defects',
    description: 'Covered under warranty',
  })
  @IsString()
  @IsNotEmpty()
  covered_in_warranty: string;

  @ApiProperty({
    example: 'Damages caused by user',
    description: 'Not covered under warranty',
  })
  @IsString()
  @IsNotEmpty()
  not_covered_in_warranty: string;

  @ApiProperty({
    example: '1 year',
    description: 'Domestic warranty period',
  })
  @IsString()
  @IsNotEmpty()
  domestic_warranty: string;

  @ApiProperty({
    example: 1,
    description: 'Product unique identifier',
  })
  @IsNumber()
  productId: number;
}
