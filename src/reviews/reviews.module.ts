import { Module } from '@nestjs/common';
import { ReviewsService } from './reviews.service';
import { ReviewsController } from './reviews.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { Review } from './models/review.model';
import { Product } from '../product/models/product.model';

@Module({
  imports:[SequelizeModule.forFeature([Review, Product])],
  controllers: [ReviewsController],
  providers: [ReviewsService],
  exports:[ReviewsService, SequelizeModule]
})
export class ReviewsModule {}
