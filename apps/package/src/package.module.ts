import { Module } from '@nestjs/common';
import { PackageController } from './package.controller';
import { PackageService } from './package.service';
import { BookModule } from './modules/book/book.module';
import { BookVersionModule } from './modules/bookVersion/bookVersion.module';
import { RmqModule } from '@app/common/rmq';
import { ConfigModule } from '@nestjs/config';
import * as Joi from 'joi';
import { CartModule } from './modules/cart/cart.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: "apps/package/.env",
      validationSchema: Joi.object({
        MONGO_URI: Joi.string().required(),
        JWT_SECRET: Joi.string().required(),
        JWT_EXPIRATION: Joi.string().required(),
      })
    }),
    RmqModule,
    BookModule,
    BookVersionModule,
    CartModule,
  ],
  controllers: [PackageController],
  providers: [PackageService],
})
export class PackageModule { }
