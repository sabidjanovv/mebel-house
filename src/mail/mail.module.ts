import { Module } from '@nestjs/common';
import { MailService } from './mail.service';
import { MailerModule } from '@nestjs-modules/mailer';
import { ConfigService } from '@nestjs/config';
import { HandlebarsAdapter } from '@nestjs-modules/mailer/dist/adapters/handlebars.adapter'
import { join } from 'path';
import { Client } from '../client/models/client.model';

@Module({
  imports: [
    MailerModule.forRootAsync({
      useFactory: async (config: ConfigService) => ({
        transport: {
          host: config.get<string>("SMTP_HOST"), // proccess.env.STMP_HOST qilib chaqirib olishimiz shart emas
          secure: false,
          auth: {
            user: config.get<string>("SMTP_USER"),
            pass: config.get<string>("SMTP_PASSWORD"),
          },
        },
        defaults: {
          from: `MebelHouse ${config.get<string>("SMTP_HOST")}`,
        },
        template: {
          dir:join(__dirname, "templates"),
          adapter: new HandlebarsAdapter(),
          template:"confirm",
          options: {
            strict: true,
          },
        },
      }),
      inject: [ConfigService],
    }), Client
  ],
  providers: [MailService],
  exports: [MailService],
})
export class MailModule {}
