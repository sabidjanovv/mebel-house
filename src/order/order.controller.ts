import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { OrderService } from './order.service';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Order } from './models/order.model';

@ApiTags('Orders')
@Controller('order')
export class OrderController {
  constructor(private readonly orderService: OrderService) {}

  @ApiOperation({ summary: 'Add new order' })
  @ApiResponse({
    status: 201,
    description: 'Added new order',
    type: Order,
  })
  @Post()
  create(@Body() createOrderDto: CreateOrderDto) {
    return this.orderService.create(createOrderDto);
  }

  @ApiOperation({ summary: 'Get all orders' })
  @ApiResponse({
    status: 200,
    description: 'All orders',
    type: [Order],
  })
  @Get()
  findAll() {
    return this.orderService.findAll();
  }

  @ApiOperation({ summary: 'Get orders by ID' })
  @ApiResponse({
    status: 200,
    description: 'All orders by ID',
    type: Order,
  })
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.orderService.findOne(+id);
  }

  @ApiOperation({ summary: 'Get orders by Clietn ID' })
  @ApiResponse({
    status: 200,
    description: 'All orders by Client ID',
    type: [Order],
  })
  @Get(':id')
  findByClientId(@Query('clientId') clientId: string) {
    // Query parameterdan olingan `clientId`ni service'ga yuboramiz
    return this.orderService.findByClientId(+clientId);
  }

  @ApiOperation({ summary: 'Update order by ID' })
  @ApiResponse({
    status: 200,
    description: 'Updated order',
    type: Order,
  })
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateOrderDto: UpdateOrderDto) {
    return this.orderService.update(+id, updateOrderDto);
  }

  @ApiOperation({ summary: 'Delete order by ID' })
  @ApiResponse({
    status: 200,
    description: 'Deleted order',
    type: Number,
  })
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.orderService.remove(+id);
  }
}
