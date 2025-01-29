import { Module } from '@nestjs/common';
import { ProductService } from './product.service';
import { ProductController } from './product.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { Product } from './models/product.model';
import { JwtModule } from '@nestjs/jwt';
import { Category } from 'src/category/models/category.model';
import { Wishlist } from '../wishlist/models/wishlist.model';

@Module({
  imports: [SequelizeModule.forFeature([Product,Category, Wishlist]), JwtModule.register({})],
  controllers: [ProductController],
  providers: [ProductService],
})
export class ProductModule {}
