import { Module } from '@nestjs/common';
import { WishlistService } from './wishlist.service';
import { WishlistController } from './wishlist.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { Wishlist } from './models/wishlist.model';
import { JwtModule } from '@nestjs/jwt';
import { Client } from '../client/models/client.model';

@Module({
  imports: [
    SequelizeModule.forFeature([Wishlist, Client]),
    JwtModule.register({}),
  ],
  controllers: [WishlistController],
  providers: [WishlistService],
  exports:[WishlistService, SequelizeModule]
})
export class WishlistModule {}
