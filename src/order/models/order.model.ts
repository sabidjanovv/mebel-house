import {
  Column,
  DataType,
  ForeignKey,
  Model,
  Table,
} from 'sequelize-typescript';

export enum OrderStatus {
  PENDING = 'pending',
  PROCESSING = 'processing',
  SHIPPED = 'shipped',
  DELIVERED = 'delivered',
  CANCELLED = 'cancelled',
}

interface IOrderCreationAttr {
  clientId: number;
  status: OrderStatus;
  total_price: number;
  order_date: Date;
  shipping_date: Date;
}

@Table({ tableName: 'order' })
export class Order extends Model<Order, IOrderCreationAttr> {
  @Column({
    primaryKey: true,
    type: DataType.INTEGER,
    allowNull: false,
    autoIncrement: true,
  })
  id: number;

  //   @ForeignKey(() => Client)
  @Column({
    type: DataType.INTEGER,
    allowNull: true,
  })
  clientId: number;
  //   @BelongsTo(() => Client)
  //   client: Client;

  @Column({
    type: DataType.ENUM,
    values: Object.values(OrderStatus), // Enumning qiymatlarini beradi
    allowNull: false,
    defaultValue: OrderStatus.PENDING, // Standart qiymat
  })
  status: OrderStatus;

  @Column({
    type: DataType.INTEGER,
    allowNull: true,
  })
  total_price: number;

  @Column({
    type: DataType.DATEONLY,
    allowNull: true,
  })
  order_date: Date;

  @Column({
    type: DataType.DATEONLY,
    allowNull: true,
  })
  shipping_date: Date;
}
