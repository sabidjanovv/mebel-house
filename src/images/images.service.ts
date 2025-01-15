import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateImageDto } from './dto/create-image.dto';
import { UpdateImageDto } from './dto/update-image.dto';
import { InjectModel } from '@nestjs/sequelize';
import { Image } from './models/image.model';
import { FileService } from '../file/file.service';

@Injectable()
export class ImagesService {
  constructor(
    @InjectModel(Image) private imageModel: typeof Image,
    private readonly fileService: FileService,
  ) {}

  async create(createImageDto: CreateImageDto, image: any): Promise<Image> {
    const fileName = await this.fileService.saveFile(image);
    return this.imageModel.create({
      ...createImageDto,
      image: fileName,
    });
  }

  async findAll() {
    const image = await this.imageModel.findAll({ include: { all: true } });
    return { data: image, total: image.length };
  }

  async findOne(id: number) {
    const image = await this.imageModel.findByPk(id);
    if (!image) {
      throw new BadRequestException(`ID:${id} Image does not exists!`);
    }
    return this.imageModel.findByPk(+id, { include: { all: true } });
  }

  async update(id: number, updateImageDto: UpdateImageDto) {
    const image = await this.imageModel.findByPk(id);
    if (!image) {
      throw new BadRequestException(`ID:${id} Image does not exists!`);
    }
    const update = await this.imageModel.update(updateImageDto, {
      where: { id },
      returning: true,
    });
    return update;
  }

  async remove(id: number) {
    const image = await this.imageModel.findByPk(id);
    if (!image) {
      throw new BadRequestException(`ID:${id} Image does not exists!`);
    }
    return this.imageModel.destroy({ where: { id } });
  }
}
