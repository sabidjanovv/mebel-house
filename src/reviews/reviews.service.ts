import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateReviewDto } from './dto/create-review.dto';
import { UpdateReviewDto } from './dto/update-review.dto';
import { InjectModel } from '@nestjs/sequelize';
import { Review } from './models/review.model';

@Injectable()
export class ReviewsService {
  constructor(
    @InjectModel(Review) private readonly reviewModel: typeof Review,
  ) {}
  async create(createReviewDto: CreateReviewDto) {
    return this.reviewModel.create(createReviewDto);
  }

  async findAll() {
    const review = await this.reviewModel.findAll();
    return {
      data: review,
      total: review.length,
    };
  }

  async findOne(id: number) {
    const review = await this.reviewModel.findByPk(id);
    if (!review) {
      throw new NotFoundException(`Review with id ${id} not found.`);
    }
    return {
      data: review,
    };
  }

  async update(id: number, updateReviewDto: UpdateReviewDto) {
    const review = await this.reviewModel.findByPk(id);
    if (!review) {
      throw new NotFoundException(`Review with id ${id} not found.`);
    }
    const updatedReview = review.update(updateReviewDto);
    return {
      data: updatedReview,
    };
  }

  async remove(id: number) {
    const review = await this.reviewModel.findByPk(id);
    if (!review) {
      throw new NotFoundException(`Review with id ${id} not found.`);
    }
    await review.destroy();
    return {
      message: 'Review has been deleted.',
    };
  }
}
