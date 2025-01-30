import { ApiProperty } from "@nestjs/swagger";
import { BelongsTo, Column, DataType, ForeignKey, HasMany, Model, Table } from "sequelize-typescript";
import { Client } from "src/client/models/client.model";
import { Order } from "../../order/models/order.model";


interface IAddressAttr{
    clientId: number;
    region: string
    street: string;
    zipCode: number;
    phone_number: string;
}

@Table({ tableName: 'address' })
export class Address extends Model<Address, IAddressAttr> {
  @ApiProperty({ example: 1, description: 'Address' })
  @Column({
    type: DataType.BIGINT,
    primaryKey: true,
    autoIncrement: true,
  })
  id: number;

  @ApiProperty({ example: 1, description: 'Client' })
  @ForeignKey(() => Client)
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  clientId: number;
  @BelongsTo(() => Client)
  client: Client;

  @ApiProperty({ example: 'Tashkent', description: 'Street' })
  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  region: string;

  @ApiProperty({ example: '123 Main St', description: 'Street' })
  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  street: string;

  @ApiProperty({ example: 'NY', description: 'Zip code' })
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  zipCode: number;

  @ApiProperty({
    example: '+998901234567',
    description: 'Extra phone number',
  })
  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  phone_number: string;

  @HasMany(() => Order)
  orders: Order[];
}
