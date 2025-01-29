import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber } from 'class-validator';

export class CreateCartItemDto {
  @ApiProperty({
    example: 1,
    description: 'Cart ID',
  })
  @IsNotEmpty({ message: 'Cart ID cannot be empty' })
  @IsNumber({}, { message: 'Cart ID must be a number' })
  cartId: number;

  @ApiProperty({
    example: 1,
    description: 'Product ID',
  })
  @IsNotEmpty({ message: 'Product ID cannot be empty' })
  @IsNumber({}, { message: 'Product ID must be a number' })
  productId: number;

  @ApiProperty({
    example: 1,
    description: 'Quantity',
  })
  @IsNumber({}, { message: 'Quantity must be a number' })
  quantity: number;
}
