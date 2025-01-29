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
import { Category } from 'src/category/models/category.model';
import { deleteFiles, saveFile } from 'src/common/helpers/saveImage';
import { Wishlist } from '../wishlist/models/wishlist.model';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class ProductService {
  constructor(
    @InjectModel(Product) private productModel: typeof Product,
    @InjectModel(Category) private readonly categoryModel: typeof Category,
    @InjectModel(Wishlist) private readonly wishlistModel: typeof Wishlist,
    private readonly jwtService: JwtService,
  ) {}

  async create(createProductDto: CreateProductDto, images: any[]) {
    const { name, description, categoryId, ...otherFields } = createProductDto;

    const category = await this.categoryModel.findByPk(categoryId);
    if (!category) {
      throw new NotFoundException('Category not found');
    }

    if (!name) {
      throw new BadRequestException('Name is required.');
    }

    const fileNames = await Promise.all(
      images.map((image: any) => saveFile(image)),
    );

    return this.productModel.create({
      ...otherFields,
      name: name.toLowerCase(),
      description: description?.toLowerCase(),
      images: fileNames,
      categoryId,
    });
  }

  async findAll(
    query: PaginationDto,
    token: string,
  ): Promise<{
    data: Product[];
    page: number;
    limit: number;
    total: number;
  }> {
    const {
      filter,
      order,
      page = 1,
      limit = 10,
      minPrice = 0,
      maxPrice = Infinity,
      sortBy = 'createdAt', // Default field for sorting
      price,
    } = query;

    let likedProductIds = [];
    if (token) {
      try {
        const { id } = this.jwtService.decode(token) as { id: string };
        if (id) {
          const likes = await this.wishlistModel.findAll({
            where: { clientId: +id },
          });
          likedProductIds = likes.map((like) => like.productId);
        }
      } catch (error) {}
    }

    const offset = (page - 1) * limit;

    const where: any = {};

    if (minPrice || maxPrice) {
      where.price = { [Op.between]: [minPrice, maxPrice] };
    }

    if (filter) {
      where[Op.or] = [
        { name: { [Op.like]: `%${filter}%` } },
        { description: { [Op.like]: `%${filter}%` } },
      ];
    }

    try {
      const { rows: data, count: total } =
        await this.productModel.findAndCountAll({
          where,
          order: [
            [
              order ? 'createdAt' : 'price',
              (order || price).toUpperCase() === 'ASC' ? 'ASC' : 'DESC',
            ],
            // ['price', price.toUpperCase() === 'ASC' ? 'ASC' : 'DESC'],
          ],
          offset,
          limit,
        });

      const productsWithLikes = data.map((product) => {
        return {
          ...product,
          isLike: likedProductIds.includes(product.id),
        };
      });
      return {
        data: productsWithLikes as Product[],
        page,
        limit,
        total,
      };
    } catch (error) {
      console.error('Error fetching products:', error.message);
      throw error;
    }
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

  async getProductsByCategory(
    categoryId: number,
    page: number,
    limit: number,
  ): Promise<{ data: Product[]; page: number; limit: number; total: number }> {
    const offset = (page - 1) * limit;

    const { rows: data, count: total } =
      await this.productModel.findAndCountAll({
        where: { categoryId },
        offset,
        limit,
        include: { all: true },
      });

    return {
      data,
      page,
      limit,
      total,
    };
  }

  async update(id: number, updateProductDto: UpdateProductDto, images: any[]) {
    // Mahsulotni ID bo‘yicha topish
    console.log(updateProductDto);

    const product = await this.productModel.findByPk(id);

    if (!product) {
      throw new NotFoundException(`Product with ID ${id} not found.`);
    }

    // Yangilanish uchun yangi ma’lumotlarni qo‘shish
    await product.update(updateProductDto);

    // Agar yangi rasmlar mavjud bo‘lsa
    if (images && images.length > 0) {
      // Eski rasmlarni o‘chirish
      if (product.images && product.images.length > 0) {
        deleteFiles(product.images);
      }

      // Yangi rasmlarni saqlash
      const fileNames = await Promise.all(
        images.map((image: any) => saveFile(image)),
      );

      // Yangilangan rasmlarni bazaga saqlash
      product.images = fileNames;
      await product.save();
    }

    // Javob qaytarish
    return {
      statusCode: 200,
      message: 'Product updated successfully',
      data: { product },
    };
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
