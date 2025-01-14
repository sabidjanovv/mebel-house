import {
  BelongsTo,
  Column,
  DataType,
  ForeignKey,
  HasMany,
  Model,
  Table,
} from 'sequelize-typescript';
import { ApiProperty } from '@nestjs/swagger';
import { ProductDetail } from '../../product_detail/models/product_detail.model';
import { Category } from '../../category/models/category.model';
import { Image } from '../../images/models/image.model';

interface ICreationProductAttr {
  name: string;
  price: number;
  discount: number;
  description: string;
  categoryId: number;
}

@Table({ tableName: 'product' })
export class Product extends Model<Product, ICreationProductAttr> {
  @ApiProperty({
    example: 1,
    description: 'Mahsulot ID raqami',
  })
  @Column({
    type: DataType.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  })
  id: number;

  @ApiProperty({
    description: 'Mahsulotning nomi',
    example: 'Mebel',
  })
  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  name: string;

  @ApiProperty({
    description: 'Mahsulotning narxi',
    example: 500,
  })
  @Column({
    type: DataType.FLOAT,
    allowNull: false,
  })
  price: number;

  @ApiProperty({
    description: 'Chegirma foizda (%), 0 dan 100 gacha',
    example: 10,
    required: false,
  })
  @Column({
    type: DataType.FLOAT,
    allowNull: false,
  })
  discount: number;

  @ApiProperty({
    description: 'Mahsulotning tavsifi',
    example: 'Yotsangiz yumshoqlikni his qilasz',
    required: false,
  })
  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  description: string;

  //
  @HasMany(() => ProductDetail)
  productDetail: ProductDetail;
  //

  //
  @HasMany(() => Image)
  image: Image;
  //

  //
  @ApiProperty({
    example: 1,
    description: 'Category unikal identifikatori',
  })
  @ForeignKey(() => Category)
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  categoryId: number;

  @BelongsTo(() => Category)
  category: Category;
  //
}
