import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiParam,
  ApiBody,
} from '@nestjs/swagger';
import { CartService } from './cart.service';
import { CreateCartDto } from './dto/create-cart.dto';
import { UpdateCartDto } from './dto/update-cart.dto';
import { Cart } from './models/cart.model';

@ApiTags('Cart')
@Controller('cart')
export class CartController {
  constructor(private readonly cartService: CartService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new cart' })
  @ApiResponse({
    status: 201,
    description: 'Cart created successfully.',
    type: Cart,
  })
  @ApiBody({ type: CreateCartDto })
  create(@Body() createCartDto: CreateCartDto) {
    try {
      return this.cartService.create(createCartDto);
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }

  @Get()
  @ApiOperation({ summary: 'Retrieve all carts' })
  @ApiResponse({ status: 200, description: 'List of all carts.', type: [Cart] })
  findAll() {
    return this.cartService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Retrieve a single cart by ID' })
  @ApiResponse({
    status: 200,
    description: 'Cart retrieved successfully.',
    type: Cart,
  })
  @ApiResponse({ status: 404, description: 'Cart not found.' })
  @ApiParam({
    name: 'id',
    type: 'integer',
    description: 'ID of the cart to retrieve',
  })
  findOne(@Param('id') id: string) {
    try {
      return this.cartService.findOne(+id);
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.NOT_FOUND);
    }
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update an existing cart' })
  @ApiResponse({
    status: 200,
    description: 'Cart updated successfully.',
    type: Cart,
  })
  @ApiResponse({ status: 404, description: 'Cart not found.' })
  @ApiParam({
    name: 'id',
    type: 'integer',
    description: 'ID of the cart to update',
  })
  @ApiBody({ type: UpdateCartDto })
  update(@Param('id') id: string, @Body() updateCartDto: UpdateCartDto) {
    try {
      return this.cartService.update(+id, updateCartDto);
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.NOT_FOUND);
    }
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete a cart by ID' })
  @ApiResponse({ status: 200, description: 'Cart deleted successfully.' })
  @ApiResponse({ status: 404, description: 'Cart not found.' })
  @ApiParam({
    name: 'id',
    type: 'integer',
    description: 'ID of the cart to delete',
  })
  remove(@Param('id') id: string) {
    try {
      return this.cartService.remove(+id);
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.NOT_FOUND);
    }
  }
}
