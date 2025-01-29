import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber } from 'class-validator';

export class CreateCartDto {
  @ApiProperty({
    example: 1,
    description: 'Client ID',
  })
  @IsNotEmpty({ message: 'Client ID cannot be empty' })
  @IsNumber({}, { message: 'Client ID must be a number' })
  clientId: number;
}
