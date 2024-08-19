import { Injectable, Logger } from '@nestjs/common';
import { InjectConnection, InjectModel } from '@nestjs/mongoose';
import { Connection, Model } from 'mongoose';
 
 import { AbstractRepository } from '@app/common';
import { BookVersion } from '../schemas/bookVersion.schema';
 
@Injectable()
export class BookVersionRepository extends AbstractRepository<BookVersion> {
    protected readonly logger: Logger = new Logger(BookVersionRepository.name);

    constructor(
        @InjectModel(BookVersion.name) bookVersionModel: Model<BookVersion>,
        @InjectConnection() connection: Connection,
    ) {
        super(bookVersionModel, connection);
    }
}
