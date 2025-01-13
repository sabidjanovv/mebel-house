import { Injectable } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { InjectModel } from '@nestjs/sequelize';
import { Product } from './models/product.model';

@Injectable()
export class ProductService {
  constructor(@InjectModel(Product) private productModel: typeof Product) {}

  create(createProductDto: CreateProductDto) {
    return this.productModel.create(createProductDto);
  }

  findAll() {
    return this.productModel.findAll({ include: { all: true } });
  }

  findOne(id: number) {
    return this.productModel.findByPk(+id, { include: { all: true } });
  }

  async update(id: number, updateProductDto: UpdateProductDto) {
    const update = await this.productModel.update(updateProductDto, {
      where: { id },
      returning: true,
    });
    return update;
  }

  remove(id: number) {
    return this.productModel.destroy({ where: { id } });
  }
}
