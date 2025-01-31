import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { InjectModel } from '@nestjs/sequelize';
import { Order } from './models/order.model';
import { PaginationDto } from '../product/dto/pagination.dto';
import { Client } from '../client/models/client.model';
import { OrderDto } from './dto/order.dto';
import { AddressesService } from '../addresses/addresses.service';
import { Product } from '../product/models/product.model';
import { OrderItemsService } from '../order_items/order_items.service';

@Injectable()
export class OrderService {
  constructor(
    @InjectModel(Order) private readonly orderModel: typeof Order,
    @InjectModel(Client) private readonly clientModel: typeof Client,
    @InjectModel(Product) private readonly productModel: typeof Product,
    private readonly addressService: AddressesService,
    private readonly orderItemsService: OrderItemsService,
    // private readonly productModel: productModelsitory,
  ) {}

  // async create(orderDto: OrderDto) {
  //   const { address, clientId, order_items, total_price } = orderDto;

  //   const client = await this.clientModel.findOne({
  //     where: { id: clientId },
  //   });

  //   if (!client) {
  //     throw new NotFoundException(`client with id ${clientId} not found`);
  //   }

  //   const new_address = await this.addressService.create({
  //     ...address,
  //     clientId: clientId,
  //   });

  //   if (!new_address) {
  //     throw new BadRequestException('Error on creating address');
  //   }

  //   for (const order_item of order_items) {
  //     const product = await this.productModel.findOne({
  //       where: { id: order_item.productId },
  //     });

  //     if (!product) {
  //       throw new NotFoundException(
  //         `Product with id ${order_item.productId} not found`,
  //       );
  //     }

  //     if (product.stock < order_item.quantity) {
  //       throw new BadRequestException(
  //         `Not enough stock for product: ${product.name} (Available: ${product.stock}, Requested: ${order_item.quantity})`,
  //       );
  //     }
  //   }

  //   const transaction = await this.sequelize.transaction();
  //   try {
  //     const order = await this.orderModel.create(
  //       {
  //         clientId,
  //         addressId: new_address?.id,
  //         total_price: Number(total_price),
  //       },
  //       { transaction },
  //     );

  //     const new_order_items = await Promise.all(
  //       order_items.map(async (order_item) => {
  //         const product = await this.productModel.findOne({
  //           where: { id: order_item.productId },
  //         });

  //         if (!product) {
  //           throw new NotFoundException(
  //             `Product with id ${order_item.productId} not found`,
  //           );
  //         }

  //         if (product.stock < order_item.quantity) {
  //           throw new BadRequestException(
  //             `Not enough stock for product: ${product.name} (Available: ${product.stock}, Requested: ${order_item.quantity})`,
  //           );
  //         }

  //         await product.update(
  //           { stock: product.stock - order_item.quantity },
  //           { transaction },
  //         );

  //         return await this.orderItemsService.create(
  //           {
  //             ...order_item,
  //             orderId: order.id,
  //           },
  //           transaction,
  //         );
  //       }),
  //     );

  //     await transaction.commit();

  //     return {
  //       order,
  //       new_address,
  //       order_items: new_order_items,
  //     };
  //   } catch (error) {
  //     await transaction.rollback();
  //     throw new BadRequestException('Error on creating order');
  //   }
  // }

  async create(orderDto: OrderDto) {
    const { address, clientId, order_items, total_price } = orderDto;

    const client = await this.clientModel.findOne({
      where: { id: clientId },
    });
    if (!client) {
      throw new NotFoundException(`client with id ${clientId} not found`);
    }

    const new_address = await this.addressService.create({
      ...address,
      clientId,
    });

    if (!new_address) {
      throw new BadRequestException('Error on creating address');
    }

    for (const order_item of order_items) {
      const product = await this.productModel.findOne({
        where: { id: +order_item.productId },
      });

      if (!product) {
        throw new NotFoundException(
          `Product with id ${order_item.productId} not found`,
        );
      }

      if (product.stock < order_item.quantity) {
        throw new BadRequestException(
          `Not enough stock for product: ${product.name} (Available: ${product.stock}, Requested: ${order_item.quantity})`,
        );
      }
    }

    const order = await this.orderModel.create({
      clientId,
      addressId: +new_address?.id,
      total_price: Number(total_price),
    });

    if (!order) {
      throw new BadRequestException('Error on creating order');
    }

    const new_order_items = await Promise.all(
      order_items.map(async (order_item) => {
        const product = await this.productModel.findOne({
          where: { id: +order_item.productId },
        });

        if (!product) {
          throw new NotFoundException(
            `Product with id ${order_item.productId} not found`,
          );
        }

        if (+product.stock < +order_item.quantity) {
          throw new BadRequestException(
            `Not enough stock for product: ${product.name} (Available: ${product.stock}, Requested: ${order_item.quantity})`,
          );
        }

        // Stock kamaytirish
        product.stock -= Number(order_item.quantity);

        // Ma'lumotni yangilash
        await product.update({ stock: product.stock });

        return this.orderItemsService.create({
          ...order_item,
          orderId: +order.id,
        });
      }),
    );


    if (!new_order_items) {
      throw new BadRequestException('Error on creating order details');
    }

    const result = {
      order,
      new_address,
      order_items: new_order_items,
    };

    return result;
  }

  // async create(createOrderDto: CreateOrderDto) {
  //   return this.orderModel.create(createOrderDto);
  // }

  async findAll(query: PaginationDto): Promise<{
    data: Order[];
    page: number;
    limit: number;
    total: number;
  }> {
    const {
      status, // Status bo'yicha qidiruv uchun parametr
      page = 1,
      limit = 10,
    } = query;

    // `page` va `limit` ni tasdiqlash
    const validPage = Math.max(Number(page) || 1, 1);
    const validLimit = Math.max(Number(limit) || 10, 1);

    const offset = (validPage - 1) * validLimit;

    // Dinamik `where` obyektini yaratish
    const where: any = {};
    if (status) {
      where.status = status; // Status bo'yicha filtr
    }

    try {
      // Ma'lumotlarni olish
      const { rows: data, count: total } =
        await this.orderModel.findAndCountAll({
          where, // Status sharti
          offset, // Paginatsiya
          limit: validLimit,
          include: { all: true },
        });

      return {
        data,
        page: validPage,
        limit: validLimit,
        total,
      };
    } catch (error) {
      console.error('Error fetching orders:', error.message);
      throw new Error('Failed to fetch orders. Please try again.');
    }
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
