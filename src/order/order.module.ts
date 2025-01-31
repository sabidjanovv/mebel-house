import { Module } from '@nestjs/common';
import { OrderService } from './order.service';
import { OrderController } from './order.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { Order } from './models/order.model';
import { JwtModule } from '@nestjs/jwt';
import { Product } from '../product/models/product.model';
import { Client } from '../client/models/client.model';
import { OrderItemsModule } from '../order_items/order_items.module';
import { AddressesModule } from '../addresses/addresses.module';

@Module({
  imports: [
    SequelizeModule.forFeature([Order, Product, Client]),
    JwtModule.register({}),
    AddressesModule,
    OrderItemsModule,
  ],
  controllers: [OrderController],
  providers: [OrderService],
})
export class OrderModule {}
