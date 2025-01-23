import { Column, DataType, HasMany, Model, Table } from 'sequelize-typescript';
import { ApiProperty } from '@nestjs/swagger';
import { Product } from '../../product/models/product.model';

interface ICreationCategoryAttr {
  name: string;
  description: string;
}

@Table({ tableName: 'category' })
export class Category extends Model<Category, ICreationCategoryAttr> {
  @ApiProperty({
    example: 1,
    description: 'Category ID number',
  })
  @Column({
    type: DataType.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  })
  id: number;

  @ApiProperty({
    example: 'Devices',
    description: 'Category name',
  })
  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  name: string;

  @ApiProperty({
    example: 'Devices and gadgets',
    description: 'Category description',
  })
  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  description: string;

  @HasMany(() => Product)
  product: Product[];
}
