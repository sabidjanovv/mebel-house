import {
  BelongsTo,
  Column,
  DataType,
  ForeignKey,
  HasMany,
  HasOne,
  Model,
  Table,
} from 'sequelize-typescript';
import { ApiProperty } from '@nestjs/swagger';
import { ProductDetail } from '../../product_detail/models/product_detail.model';
import { Category } from '../../category/models/category.model';
import { OrderItems } from '../../order_items/models/order_item.model';
import { CartItems } from '../../cart_items/models/cart_item.model';
import { Review } from '../../reviews/models/review.model';
import { Wishlist } from '../../wishlist/models/wishlist.model';

interface ICreationProductAttr {
  name: string;
  price: number;
  discount: number;
  description: string;
  categoryId: number;
  stock: number;
  avg_rating: number;
  images: string[];
  tags: string[];
  colors: string[];
}

@Table({ tableName: 'product' })
export class Product extends Model<Product, ICreationProductAttr> {
  @ApiProperty({
    example: 1,
    description: 'Unique identifier of the product',
  })
  @Column({
    type: DataType.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  })
  id: number;

  @ApiProperty({
    example: 1,
    description: 'Unique identifier of the category',
  })
  @ForeignKey(() => Category)
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  categoryId: number;

  @BelongsTo(() => Category)
  category: Category;

  @ApiProperty({
    description: 'Name of the product',
    example: 'Furniture',
  })
  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  name: string;

  @ApiProperty({
    description: 'Price of the product',
    example: 500,
  })
  @Column({
    type: DataType.FLOAT,
    allowNull: false,
  })
  price: number;

  @ApiProperty({
    description: 'Discount percentage (0 to 100)',
    example: 10,
    required: false,
  })
  @Column({
    type: DataType.FLOAT,
    allowNull: false,
  })
  discount: number;

  @ApiProperty({
    description: 'Description of the product',
    example: 'Feel the softness when you lie down',
    required: false,
  })
  @Column({
    type: DataType.STRING,
  })
  description: string;

  @ApiProperty({
    description: 'Number of items in stock',
    example: 10,
    required: false,
  })
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  stock: number;

  @ApiProperty({
    description: 'Average rating of the product',
    example: 4.5,
    required: false,
  })
  @Column({
    type: DataType.FLOAT,
    defaultValue: 0,
  })
  avg_rating?: number;

  @ApiProperty({
    description: 'Images of the product',
    example: ['image1.jpg', 'image2.jpg'],
    required: false,
  })
  @Column({
    type: DataType.ARRAY(DataType.STRING),
    allowNull: false,
  })
  images: string[];

  @ApiProperty({
    description: 'Tags associated with the product',
    example: ['furniture', 'sofa'],
    required: false,
  })
  @Column({
    type: DataType.ARRAY(DataType.STRING),
    allowNull: false,
  })
  tags: string[];

  @ApiProperty({
    description: 'Available colors of the product',
    example: ['blue', 'red'],
    required: false,
  })
  @Column({
    type: DataType.ARRAY(DataType.STRING),
    allowNull: false,
  })
  colors: string[];

  @HasOne(() => ProductDetail)
  productDetail: ProductDetail;

  @HasMany(() => OrderItems)
  orderItems: OrderItems[];

  @HasMany(() => CartItems)
  cartItems: CartItems[];

  @HasMany(() => Review)
  reviews: Review[];

  @HasMany(() => Wishlist)
  wishlists: Wishlist[];
}
