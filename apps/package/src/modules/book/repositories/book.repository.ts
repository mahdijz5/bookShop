import { Injectable, Logger } from '@nestjs/common';
import { InjectConnection, InjectModel } from '@nestjs/mongoose';
import { Connection, Model } from 'mongoose';
 
 import { AbstractRepository } from '@app/common';
import { Book } from '../schemas/book.schema';

@Injectable()
export class BookRepository extends AbstractRepository<Book> {
    protected readonly logger: Logger = new Logger(BookRepository.name);

    constructor(
        @InjectModel(Book.name) bookModel: Model<Book>,
        @InjectConnection() connection: Connection,
    ) {
        super(bookModel, connection);
    }
}
