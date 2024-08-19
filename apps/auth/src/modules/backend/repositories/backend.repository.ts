import { Injectable, Logger } from '@nestjs/common';
import { InjectConnection, InjectModel } from '@nestjs/mongoose';
import { Connection, Model } from 'mongoose';
import { AbstractRepository } from '@app/common';
import { Backend } from '../schemas';

@Injectable()
export class BackendRepository extends AbstractRepository<Backend> {
    protected readonly logger: Logger = new Logger(BackendRepository.name);

    constructor(
        @InjectModel(Backend.name) backendModel: Model<Backend>,
        @InjectConnection() connection: Connection,
    ) {
        super(backendModel, connection);
    }
}
