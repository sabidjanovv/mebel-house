// Updated product.service.ts
import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { InjectModel } from '@nestjs/sequelize';
import { Product } from './models/product.model';
import { Op } from 'sequelize';
import { PaginationDto } from './dto/pagination.dto';

@Injectable()
export class ProductService {
  constructor(@InjectModel(Product) private productModel: typeof Product) {}

  create(createProductDto: CreateProductDto) {
    return this.productModel.create(createProductDto);
  }

  async findAll(query: PaginationDto) {
    const { filter, order = 'asc', page = 1, limit = 10 } = query;

    const offset = (page - 1) * limit; // Sequelize uses offset instead of skip

    // Build dynamic where clause for filtering
    const where = filter
      ? {
          [Op.or]: [
            { name: { [Op.like]: `%${filter}%` } },
            { description: { [Op.like]: `%${filter}%` } },
          ],
        }
      : {};

    const { rows: data, count: total } =
      await this.productModel.findAndCountAll({
        where,
        order: [['name', order.toUpperCase() === 'ASC' ? 'ASC' : 'DESC']],
        offset,
        limit,
      });

    return {
      data,
      page,
      limit,
      total,
    };
  }

  async findOne(id: number) {
    const product = await this.productModel.findByPk(id, {
      include: { all: true },
    });
    if (!product) {
      throw new NotFoundException(`ID:${id} Product does not exist!`);
    }
    return product;
  }

  async update(id: number, updateProductDto: UpdateProductDto) {
    const product = await this.productModel.findByPk(id);
    if (!product) {
      throw new NotFoundException(`ID:${id} Product does not exist!`);
    }
    await this.productModel.update(updateProductDto, {
      where: { id },
    });
    return this.productModel.findByPk(id); // Return the updated product
  }

  async remove(id: number) {
    const product = await this.productModel.findByPk(id);
    if (!product) {
      throw new NotFoundException(`ID:${id} Product does not exist!`);
    }
    await this.productModel.destroy({ where: { id } });
    return { id, message: `ID: ${id} Product successfully deleted!` };
  }
}
