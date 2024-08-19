import { Module } from '@nestjs/common';
import { CartService } from './cart.service';
import { CartController } from './cart.controller';
import { ConfigModule } from '@nestjs/config';
import { BookVersionModule } from '../bookVersion/bookVersion.module';
import { DatabaseModule } from '@app/common';
import Joi from 'joi';
import { Cart, CartBook, CartBookSchema, CartSchema } from './schemas';
import { CartBookRepository, CartRepository } from './repositories';

@Module({
  imports: [
  
    BookVersionModule,
    DatabaseModule.forFeature([
      {
        name: Cart.name,
        schema: CartSchema,
      },
      {
        name: CartBook.name,
        schema: CartBookSchema,
      }
    ]),

  ],
  providers: [CartService,CartBookRepository,CartRepository],
  controllers: [CartController],
  exports : [CartService]
})
export class CartModule { }
