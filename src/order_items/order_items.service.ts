import { Injectable } from '@nestjs/common';
import { CreateOrderItemDto } from './dto/create-order_item.dto';
import { UpdateOrderItemDto } from './dto/update-order_item.dto';
import { InjectModel } from '@nestjs/sequelize';
import { OrderItems } from './models/order_item.model';
import { PaginationDto } from '../product/dto/pagination.dto';
import { Order } from '../order/models/order.model';
import { Product } from '../product/models/product.model';

@Injectable()
export class OrderItemsService {
  constructor(
    @InjectModel(OrderItems)
    private readonly orderItemsModel: typeof OrderItems,
  ) {}

  create(createOrderItemDto: CreateOrderItemDto) {
    return this.orderItemsModel.create(createOrderItemDto);
  }

  async findAll(paginationDto: PaginationDto) {
    const { limit, page } = paginationDto;
    const offset = (page - 1) * limit;

    const { count: total, rows: orderDetail } =
      await this.orderItemsModel.findAndCountAll({
        include: [
          { model: Order, as: 'order' },
          { model: Product, as: 'product' },
        ],
        limit,
        offset,
      });

    return {
      orderDetail,
      total,
      limit,
      page,
    };
  }

  findOne(id: number) {
    return this.orderItemsModel.findByPk(id);
  }

  async update(id: number, updateOrderItemDto: UpdateOrderItemDto) {
    const updated_orderItems = await this.orderItemsModel.update(
      updateOrderItemDto,
      {
        where: { id },
        returning: true,
      },
    );
    return updated_orderItems[1][0];
  }

  remove(id: number) {
    return this.orderItemsModel.destroy({ where: { id } });
  }
}
