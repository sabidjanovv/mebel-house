import { Injectable } from '@nestjs/common';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { InjectModel } from '@nestjs/sequelize';
import { Order } from './models/order.model';

@Injectable()
export class OrderService {
  constructor(@InjectModel(Order) private readonly orderModel: typeof Order) {}

  async create(createOrderDto: CreateOrderDto) {
    return this.orderModel.create(createOrderDto);
  }

  async findAll() {
    const orders = await this.orderModel.findAll({ include: { all: true } });
    return { data: orders, total: orders.length };
  }

  findOne(id: number) {
    return this.orderModel.findByPk(id);
  }

  async findByClientId(clientId: number) {
    const orders = await this.orderModel.findAll({
      where: { clientId }, // clientId bo'yicha filtr
      include: { all: true }, // Barcha bog‘liq ma’lumotlarni olish uchun
    });
    return { data: orders, total: orders.length };
  }

  async update(id: number, updateOrderDto: UpdateOrderDto) {
    const updated_order = await this.orderModel.update(updateOrderDto, {
      where: { id },
      returning: true,
    });
    return updated_order[1][0];
  }

  remove(id: number) {
    return this.orderModel.destroy({ where: { id } });
  }
}
