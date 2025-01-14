import { Injectable } from '@nestjs/common';
import { CreateProductDetailDto } from './dto/create-product_detail.dto';
import { UpdateProductDetailDto } from './dto/update-product_detail.dto';
import { InjectModel } from '@nestjs/sequelize';
import { ProductDetail } from './models/product_detail.model';

@Injectable()
export class ProductDetailService {
  constructor(
    @InjectModel(ProductDetail)
    private ProductDetailModel: typeof ProductDetail,
  ) {}

  create(createProductDetailDto: CreateProductDetailDto) {
    return this.ProductDetailModel.create(createProductDetailDto);
  }

  findAll() {
    return this.ProductDetailModel.findAll({ include: { all: true } });
  }

  findOne(id: number) {
    return this.ProductDetailModel.findByPk(+id, { include: { all: true } });
  }

  async update(id: number, updateProductDetailDto: UpdateProductDetailDto) {
    const update = await this.ProductDetailModel.update(
      updateProductDetailDto,
      {
        where: { id },
        returning: true,
      },
    );
    return update;
  }

  remove(id: number) {
    return this.ProductDetailModel.destroy({ where: { id } });
  }
}
