import { Injectable } from '@nestjs/common';
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

  findAll() {
    return this.imageModel.findAll({ include: { all: true } });
  }

  findOne(id: number) {
    return this.imageModel.findByPk(+id, { include: { all: true } });
  }

  async update(id: number, updateImageDto: UpdateImageDto) {
    const update = await this.imageModel.update(updateImageDto, {
      where: { id },
      returning: true,
    });
    return update;
  }

  remove(id: number) {
    return this.imageModel.destroy({ where: { id } });
  }
}
