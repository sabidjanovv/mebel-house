import { Module } from '@nestjs/common';
import { ProductDetailService } from './product_detail.service';
import { ProductDetailController } from './product_detail.controller';

@Module({
  controllers: [ProductDetailController],
  providers: [ProductDetailService],
})
export class ProductDetailModule {}
