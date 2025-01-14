import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateWishlistDto } from './dto/create-wishlist.dto';
import { UpdateWishlistDto } from './dto/update-wishlist.dto';
import { InjectModel } from '@nestjs/sequelize';
import { Wishlist } from './models/wishlist.model';
import { Client } from '../client/models/client.model';

@Injectable()
export class WishlistService {
  constructor(
    @InjectModel(Wishlist) private wishlistModel: typeof Wishlist,
    @InjectModel(Client) private clientModel: typeof Client,
  ) {}
  create(createWishlistDto: CreateWishlistDto) {
    return this.wishlistModel.create(createWishlistDto);
  }

  async findAll() {
    const wishes = await this.wishlistModel.findAll();
    return {
      data: wishes,
      total: wishes.length,
    };
  }

  async findByClientId(clientId: number) {
    const user = await this.clientModel.findByPk(clientId);

    if (!user) {
      throw new BadRequestException(
        `User with ID: ${clientId} not found. (Id: ${clientId} bo'lgan foydalanuvchi topilmadi.)`,
      );
    }
    const wishes = await this.wishlistModel.findAll({
      where: { clientId: clientId },
    });
    return {
      data: wishes,
      total: wishes.length,
    };
  }

  findOne(id: number) {
    return this.wishlistModel.findByPk(id);
  }

  async remove(id: number) {
    return this.wishlistModel.destroy({ where: { id } });
  }
}
