import { Injectable, Logger } from '@nestjs/common';
import { InjectConnection, InjectModel } from '@nestjs/mongoose';
import { Connection, Model } from 'mongoose';
import { AbstractRepository } from '@app/common';
import { OrderBook } from '../schemas/orderBook.schema';

@Injectable()
export class OrderBookRepository extends AbstractRepository<OrderBook> {
    protected readonly logger: Logger = new Logger(OrderBookRepository.name);

    constructor(
        @InjectModel(OrderBook.name) bookModel: Model<OrderBook>,
        @InjectConnection() connection: Connection,
    ) {
        super(bookModel, connection);
    }
}
