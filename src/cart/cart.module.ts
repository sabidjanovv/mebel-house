import { Module } from '@nestjs/common';
import { CartService } from './cart.service';
import { CartController } from './cart.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { Cart } from './models/cart.model';
import { Client } from '../client/models/client.model';

@Module({
  imports: [SequelizeModule.forFeature([Cart, Client]), ],
  controllers: [CartController],
  providers: [CartService],
  exports:[CartService]
})
export class CartModule {}
