import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { InjectModel } from '@nestjs/sequelize';
import { Category } from './models/category.model';

@Injectable()
export class CategoryService {
  constructor(@InjectModel(Category) private categoryModel: typeof Category) {}

  create(createCategoryDto: CreateCategoryDto) {
    return this.categoryModel.create(createCategoryDto);
  }

  async findAll() {
    const categorys = await this.categoryModel.findAll({
      include: { all: true },
    });
    return { data: categorys, total: categorys.length };
  }

  async findOne(id: number) {
    const category = await this.categoryModel.findByPk(id);
    if (!category) {
      throw new BadRequestException(`ID:${id} Category does not exists!`);
    }
    return this.categoryModel.findByPk(+id, { include: { all: true } });
  }

  async update(id: number, updateCategoryDto: UpdateCategoryDto) {
    const category = await this.categoryModel.findByPk(id);
    if (!category) {
      throw new BadRequestException(`ID:${id} Category does not exists!`);
    }
    const update = await this.categoryModel.update(updateCategoryDto, {
      where: { id },
      returning: true,
    });
    return update[1][0];
  }

  async remove(id: number) {
    const category = await this.categoryModel.findByPk(id);
    if (!category) {
      throw new BadRequestException(`ID:${id} Category does not exists!`);
    }
    await this.categoryModel.destroy({where: {id}})
    return {
      id,
      message: `ID: ${id} Category successfully deleted!`,
    }
  }
}
