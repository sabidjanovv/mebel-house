import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsNotEmpty, IsNumber, IsArray, ValidateNested } from 'class-validator';
import { CreateAddressDto } from '../../addresses/dto/create-address.dto';
import { CreateOrderItemDto } from '../../order_items/dto/create-order_item.dto';

export class OrderDto {
  @ApiProperty({
    description: 'Customer ID who is placing the order',
    example: 1,
  })
  @IsNumber()
  @IsNotEmpty()
  clientId: number;

  @ApiProperty({
    description: 'Address of the customer',
    type: CreateAddressDto,
  })
  @ValidateNested()
  @IsNotEmpty()
  address: CreateAddressDto;

  @ApiProperty({
    description: 'Order details (product, quantity, etc.)',
    type: CreateOrderItemDto,
    isArray: true,
  })
  @IsArray()
  @ValidateNested({ each: true })
  @IsNotEmpty()
  order_items: CreateOrderItemDto[];

  @ApiProperty({
    description: 'Total price of the order',
    example: 150.75,
  })
  @IsNumber()
  @IsNotEmpty()
  total_price: number;
}
