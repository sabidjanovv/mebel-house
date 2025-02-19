import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { SequelizeModule } from '@nestjs/sequelize';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'node:path';
import { AdminModule } from './admin/admin.module';
import { Admin } from './admin/models/admin.model';
import Mail from 'nodemailer/lib/mailer';
import { AuthModule } from './auth/auth.module';
import { MailModule } from './mail/mail.module';
import { ClientModule } from './client/client.module';
import { WishlistModule } from './wishlist/wishlist.module';
import { AddressesModule } from './addresses/addresses.module';
import { CartModule } from './cart/cart.module';
import { OrderModule } from './order/order.module';
import { ReviewsModule } from './reviews/reviews.module';
import { CategoryModule } from './category/category.module';
import { PaymentModule } from './payment/payment.module';
import { ProductModule } from './product/product.module';
import { OrderItemsModule } from './order_items/order_items.module';
import { CartItemsModule } from './cart_items/cart_items.module';
import { ProductDetailModule } from './product_detail/product_detail.module';


@Module({
  imports: [
    ConfigModule.forRoot({ envFilePath: '.env', isGlobal: true }),
    // ServeStaticModule.forRoot({
    //   rootPath: join(__dirname, '..', 'dist', 'static'),
    // }),
    SequelizeModule.forRoot({
      dialect: 'postgres',
      host: process.env.POSTGRES_HOST,
      port: Number(process.env.POSTGRES_PORT),
      username: process.env.POSTGRES_USER,
      password: process.env.POSTGRES_PASSWORD,
      database: process.env.POSTGRES_DB,
      models: [],
      autoLoadModels: true,
      sync: { alter: true },
      logging: false,
    }),
    // ServeStaticModule.forRoot({
    //   rootPath: join(__dirname, '..', 'uploads'),
    // }),
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'uploads'),
    }),
    AdminModule,
    AuthModule,
    MailModule,
    ClientModule,
    WishlistModule,
    AddressesModule,
    CartModule,
    OrderModule,
    ReviewsModule,
    CategoryModule,
    PaymentModule,
    ProductModule,
    OrderItemsModule,
    CartItemsModule,
    ProductDetailModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
