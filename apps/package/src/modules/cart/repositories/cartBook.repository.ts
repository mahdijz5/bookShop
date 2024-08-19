import { Injectable, Logger } from '@nestjs/common';
import { InjectConnection, InjectModel } from '@nestjs/mongoose';
import { Connection, Model } from 'mongoose';
import { AbstractRepository } from '@app/common';
import { CartBook } from '../schemas/cartBook.schema';

@Injectable()
export class CartBookRepository extends AbstractRepository<CartBook> {
    protected readonly logger: Logger = new Logger(CartBookRepository.name);

    constructor(
        @InjectModel(CartBook.name) bookModel: Model<CartBook>,
        @InjectConnection() connection: Connection,
    ) {
        super(bookModel, connection);
    }
}
