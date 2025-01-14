import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsString } from 'class-validator';

export class CreateImageDto {
  @ApiProperty({
    example: 'https://example.com/image.jpg',
    description: 'Rasm URL manzili',
  })
  @IsOptional()
  @IsString()
  image: string;
}
