import { Module } from '@nestjs/common';
import { PackageController } from './package.controller';
import { PackageService } from './package.service';
import { BookModule } from './modules/book/book.module';
import { BookVersionModule } from './modules/bookVersion/bookVersion.module';
import { RmqModule } from '@app/common/rmq';
import { ConfigModule } from '@nestjs/config';
import * as Joi from 'joi';
import { CartModule } from './modules/cart/cart.module';
import { OrderModule } from './modules/order/order.module';
import { LoggerModule } from '@app/common';

@Module({
  imports: [
    LoggerModule,
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: "apps/package/.env",
      validationSchema: Joi.object({
        MONGO_URI: Joi.string().required(),
      })
    }),
    RmqModule, 
    BookModule,
    BookVersionModule,
    CartModule,
    OrderModule,
  ],
  controllers: [PackageController],
  providers: [PackageService],
})
export class PackageModule { }
