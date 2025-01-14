import { BadRequestException, Injectable } from '@nestjs/common';
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

  async findAll() {
    const products = await this.productModel.findAll({
      include: { all: true },
    });
    return { data: products, total: products.length };
  }

  async findOne(id: number) {
    const product = await this.productModel.findByPk(id);
    if (!product) {
      throw new BadRequestException(`ID:${id} Product does not exists!`);
    }
    return this.productModel.findByPk(+id, { include: { all: true } });
  }

  async update(id: number, updateProductDto: UpdateProductDto) {
    const product = await this.productModel.findByPk(id);
    if (!product) {
      throw new BadRequestException(`ID:${id} Product does not exists!`);
    }
    const update = await this.productModel.update(updateProductDto, {
      where: { id },
      returning: true,
    });
    return update;
  }

  async remove(id: number) {
    const product = await this.productModel.findByPk(id);
    if (!product) {
      throw new BadRequestException(`ID:${id} Product does not exists!`);
    }
    return this.productModel.destroy({ where: { id } });
  }
}
