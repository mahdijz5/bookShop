import { Module } from '@nestjs/common';
import { DatabaseModule, IPG_SERVICE } from '@app/common';
import { OrderController } from './order.controller';
import { OrderService } from './order.service';
import { OrderBookRepository, OrderRepository } from './repositories';
import { Order, OrderBook, OrderBookSchema, OrderSchema } from './schemas';
import { CartModule } from '../cart/cart.module';
import { CartBook, CartBookSchema } from '../cart/schemas';
import { CartBookRepository } from '../cart/repositories';
import { RmqModule } from '@app/common/rmq';

@Module({
  imports: [
 
    DatabaseModule.forFeature([
      {
        name: Order.name,
        schema: OrderSchema,
      },
      {
        name: OrderBook.name,
        schema: OrderBookSchema,
      },
      {
        name: CartBook.name,
        schema: CartBookSchema,
      },
    ]),
    CartModule,
    RmqModule.register([IPG_SERVICE])
  ],
  providers: [OrderService, OrderRepository,OrderBookRepository,CartBookRepository],
  controllers: [OrderController]
})
export class OrderModule { }
