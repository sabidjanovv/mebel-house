import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateClientDto } from './dto/create-client.dto';
import { UpdateClientDto } from './dto/update-client.dto';
import { InjectModel } from '@nestjs/sequelize';
import { Client } from './models/client.model';

@Injectable()
export class ClientService {
  constructor(@InjectModel(Client) private clientModel: typeof Client) {}
  async findAll() {
    const clients = await this.clientModel.findAll({ include: { all: true } });
    return {
      data: clients,
      total: clients.length,
    };
  }

  async findOne(id: number) {
    const client = await this.clientModel.findByPk(id);

    if (!client) {
      throw new BadRequestException(
        `client with ID: ${id} not found. (ID: ${id} bo'lgan foydalanuvchi topilmadi.)`,
      );
    }

    return this.clientModel.findOne({ where: { id }, include: { all: true } });
  }

  async update(id: number, updateClientDto: UpdateClientDto) {
    const client = await this.clientModel.findByPk(id);
    if (!client) {
      throw new BadRequestException(`ID:${id} client does not exists!`);
    }
    const updatedFields = { ...updateClientDto };
    const updatedClient = await this.clientModel.update(updatedFields, {
      where: { id },
      returning: true,
    });
    return updatedClient[1][0];
  }

  async remove(id: number) {
    const client = await this.clientModel.findByPk(id);

    if (!client) {
      return { message: `ID: ${id} client does not exists!` };
    }
    await this.clientModel.destroy({ where: { id } });
    return {
      message: `client with ID: ${id} successfully deleted.`,
    };
  }
}
