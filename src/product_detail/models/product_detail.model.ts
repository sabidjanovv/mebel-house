import {
  BelongsTo,
  Column,
  DataType,
  ForeignKey,
  Model,
  Table,
} from 'sequelize-typescript';
import { ApiProperty } from '@nestjs/swagger';
import { Product } from '../../product/models/product.model';

interface ICreationAttr {
  sales_package: string;
  model_number: string;
  secondary_material: string;
  configuration: string;
  upholstery_material: string;
  filling_material: string;
  finish_type: string;
  adjustable_headrest: string;
  maximum_load_capacity: string;
  origin_of_manufacture: string;
  width: string;
  height: string;
  depth: string;
  weight: string;
  seat_height: string;
  leg_height: string;
  warranty_summary: string;
  warranty_service_type: string;
  covered_in_warranty: string;
  not_covered_in_warranty: string;
  domestic_warranty: string;
  productId: number;
}

@Table({ tableName: 'product_details' })
export class ProductDetail extends Model<ProductDetail, ICreationAttr> {
  @ApiProperty({
    example: 1,
    description: 'Product details ID number',
  })
  @Column({
    type: DataType.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  })
  id: number;

  @ApiProperty({
    example: '1 piece',
    description: 'Sales package composition',
  })
  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  sales_package: string;

  @ApiProperty({
    example: 'XYZ123',
    description: 'Model number',
  })
  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  model_number: string;

  @ApiProperty({
    example: 'Metal',
    description: 'Secondary material',
  })
  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  secondary_material: string;

  @ApiProperty({
    example: 'Modular',
    description: 'Configuration type',
  })
  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  configuration: string;

  @ApiProperty({
    example: 'Leather',
    description: 'Upholstery material',
  })
  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  upholstery_material: string;

  @ApiProperty({
    example: 'Foam',
    description: 'Filling material',
  })
  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  filling_material: string;

  @ApiProperty({
    example: 'Glossy',
    description: 'Finish type',
  })
  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  finish_type: string;

  @ApiProperty({
    example: 'Yes',
    description: 'Is the headrest adjustable?',
  })
  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  adjustable_headrest: string;

  @ApiProperty({
    example: '120 kg',
    description: 'Maximum load capacity',
  })
  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  maximum_load_capacity: string;

  @ApiProperty({
    example: 'India',
    description: 'Country of manufacture',
  })
  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  origin_of_manufacture: string;

  @ApiProperty({
    example: '200 cm',
    description: 'Width',
  })
  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  width: string;

  @ApiProperty({
    example: '100 cm',
    description: 'Height',
  })
  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  height: string;

  @ApiProperty({
    example: '90 cm',
    description: 'Depth',
  })
  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  depth: string;

  @ApiProperty({
    example: '50 kg',
    description: 'Weight',
  })
  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  weight: string;

  @ApiProperty({
    example: '45 cm',
    description: 'Seat height',
  })
  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  seat_height: string;

  @ApiProperty({
    example: '10 cm',
    description: 'Leg height',
  })
  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  leg_height: string;

  @ApiProperty({
    example: '1 year',
    description: 'Warranty summary',
  })
  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  warranty_summary: string;

  @ApiProperty({
    example: 'Contact website',
    description: 'Warranty service type',
  })
  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  warranty_service_type: string;

  @ApiProperty({
    example: 'Manufacturing defects',
    description: 'What is covered by warranty',
  })
  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  covered_in_warranty: string;

  @ApiProperty({
    example: 'Damage caused by user',
    description: 'What is not covered by warranty',
  })
  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  not_covered_in_warranty: string;

  @ApiProperty({
    example: '1 year',
    description: 'Domestic warranty period',
  })
  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  domestic_warranty: string;

  //

  @ApiProperty({
    example: 1,
    description: 'Product unique identifier',
  })
  @ForeignKey(() => Product)
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  productId: number;

  //

  @BelongsTo(() => Product)
  product: Product;

  //
}
