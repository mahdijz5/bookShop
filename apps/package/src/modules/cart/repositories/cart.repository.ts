import { Injectable, Logger } from '@nestjs/common';
import { InjectConnection, InjectModel } from '@nestjs/mongoose';
import { Connection, Model } from 'mongoose';
 
 import { AbstractRepository } from '@app/common';
import { Cart } from '../schemas/cart.schema';
 
@Injectable()
export class CartRepository extends AbstractRepository<Cart> {
    protected readonly logger: Logger = new Logger(CartRepository.name);

    constructor(
        @InjectModel(Cart.name) bookModel: Model<Cart>,
        @InjectConnection() connection: Connection,
    ) {
        super(bookModel, connection);
    }
}
