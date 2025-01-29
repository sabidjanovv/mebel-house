import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateWishlistDto } from './dto/create-wishlist.dto';
import { InjectModel } from '@nestjs/sequelize';
import { Wishlist } from './models/wishlist.model';
import { Client } from '../client/models/client.model';
import { Product } from '../product/models/product.model';
import { Op } from 'sequelize';
@Injectable()
export class WishlistService {
  constructor(
    @InjectModel(Wishlist) private wishlistModel: typeof Wishlist,
    @InjectModel(Client) private clientModel: typeof Client,
    @InjectModel(Product) private productModel: typeof Product,
  ) {}
  async toggle(createWishlistDto: CreateWishlistDto) {
    const client = await this.clientModel.findByPk(createWishlistDto.clientId);
    const product = await this.productModel.findByPk(
      createWishlistDto.productId,
    );
    if (!client) {
      throw new BadRequestException(
        `Client with ID: ${createWishlistDto.clientId} not found.`,
      );
    }
    if (!product) {
      throw new BadRequestException(
        `Product with ID: ${createWishlistDto.productId} not found.`,
      );
    }
    const existingWishlist = await this.wishlistModel.findOne({
      where: {
        clientId: createWishlistDto.clientId,
        productId: createWishlistDto.productId,
      },
    });
    console.log(existingWishlist);

    if (existingWishlist) {
      await this.wishlistModel.destroy({ where: { id: existingWishlist.id } });
      return { message: 'Wishlist deleted successfully' };
    }
    return this.wishlistModel.create(createWishlistDto);
  }

  async saveWishList(clientId: number, wishlist: number[]) {
    // Validate client existence
    const client = await this.clientModel.findOne({ where: { id: clientId } });
    if (!client) {
      throw new NotFoundException(`Client with ID: ${clientId} not found.`);
    }

    // Fetch existing wishlist entries for the given client and product IDs
    const existingLikes = await this.wishlistModel.findAll({
      where: { clientId, productId: { [Op.in]: wishlist } },
    });

    // Identify new product IDs to add
    const existingProductIds = existingLikes.map((like) => like.productId);
    const newProductIds = wishlist.filter(
      (id) => !existingProductIds.includes(id),
    );

    if (!newProductIds.length) {
      return { message: 'No new products to add to the wishlist.' };
    }

    // Add new wishlist entries
    const newLikes = newProductIds.map((productId) =>
      this.wishlistModel.create({ clientId, productId }),
    );

    await Promise.all(newLikes);

    return {
      message: 'Wishlist successfully updated.',
      data: { addedProductIds: newProductIds },
    };
  }

  // async findAll() {
  //   const wishes = await this.wishlistModel.findAll();
  //   return {
  //     data: wishes,
  //     total: wishes.length,
  //   };
  // }

  async findByClientId(
    clientId: number,
  ): Promise<{ message: string; data: Partial<Product>[] }> {
    // Validate client existence
    const client = await this.clientModel.findByPk(clientId);
    if (!client) {
      throw new BadRequestException(`Client with ID: ${clientId} not found.`);
    }

    // Fetch liked products for the client
    const likes = await this.wishlistModel.findAll({
      where: { clientId },
    });

    const likedProductIds = likes.map((like) => like.productId);
    if (likedProductIds.length === 0) {
      return {
        message: 'No liked products found for this client.',
        data: [],
      };
    }

    // Fetch products with discount relation
    console.log(likedProductIds); // [2,5,7]

    let products = [];
    (async function () {
      for await (let id of likedProductIds) {
        const product = this.productModel.findOne({
          where: { id: id },
          include: [{ model: this.productModel }],
        });
        products.push(product);
      }
    })();

    // Add isLike field
    const productsWithLikes = products.map((product) => ({
      ...product.get({ plain: true }), // Sequelize obyektini oddiy obyektga o'tkazish
      isLike: likedProductIds.includes(product.id),
    }));

    return {
      message: 'All liked products retrieved successfully.',
      data: productsWithLikes,
    };
  }

  // findOne(id: number) {
  //   return this.wishlistModel.findByPk(id);
  // }
}
