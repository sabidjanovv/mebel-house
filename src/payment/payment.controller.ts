import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { PaymentService } from './payment.service';
import { CreatePaymentDto } from './dto/create-payment.dto';
import { UpdatePaymentDto } from './dto/update-payment.dto';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Payment } from './models/payment.model';

@ApiTags('Payments')
@Controller('payment')
export class PaymentController {
  constructor(private readonly paymentService: PaymentService) {}

  @ApiOperation({ summary: 'Add new payment' })
  @ApiResponse({
    status: 201,
    description: 'Added new payment',
    type: Payment,
  })
  @Post()
  create(@Body() createPaymentDto: CreatePaymentDto) {
    return this.paymentService.create(createPaymentDto);
  }

  @ApiOperation({ summary: 'Get all payments' })
  @ApiResponse({
    status: 200,
    description: 'All payments',
    type: [Payment],
  })
  @Get()
  findAll() {
    return this.paymentService.findAll();
  }

  @ApiOperation({ summary: 'Get payment by ID' })
  @ApiResponse({
    status: 200,
    description: 'Payment by ID',
    type: Payment,
  })
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.paymentService.findOne(+id);
  }

  @ApiOperation({ summary: 'Update payment by ID' })
  @ApiResponse({
    status: 200,
    description: 'Updated payment',
    type: Payment,
  })
  @Patch(':id')
  update(@Param('id') id: string, @Body() updatePaymentDto: UpdatePaymentDto) {
    return this.paymentService.update(+id, updatePaymentDto);
  }

  @ApiOperation({ summary: 'Delete payment by ID' })
  @ApiResponse({
    status: 200,
    description: 'Deleted payment',
    type: Number,
  })
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.paymentService.remove(+id);
  }
}
