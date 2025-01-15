import { Injectable } from '@nestjs/common';
import { CreatePaymentDto } from './dto/create-payment.dto';
import { UpdatePaymentDto } from './dto/update-payment.dto';
import { InjectModel } from '@nestjs/sequelize';
import { Payment } from './models/payment.model';

@Injectable()
export class PaymentService {
  constructor(
    @InjectModel(Payment) private readonly paymentModel: typeof Payment,
  ) {}

  create(createPaymentDto: CreatePaymentDto) {
    return this.paymentModel.create(createPaymentDto);
  }

  async findAll() {
    const payments = await this.paymentModel.findAll({
      include: { all: true },
    });
    return { date: payments, total: payments.length };
  }

  findOne(id: number) {
    return this.paymentModel.findOne({ where: { id }, include: { all: true } });
  }

  async update(id: number, updatePaymentDto: UpdatePaymentDto) {
    const updated_payment = await this.paymentModel.update(updatePaymentDto, {
      where: { id },
      returning: true,
    });
    return updated_payment[1][0];
  }

  remove(id: number) {
    return this.paymentModel.destroy({ where: { id } });
  }
}
