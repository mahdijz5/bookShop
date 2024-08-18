import { Injectable, Logger } from '@nestjs/common';
import { InjectConnection, InjectModel } from '@nestjs/mongoose';
import { Connection, Model } from 'mongoose';
 
import { Auth } from '../schemas';
import { AbstractRepository } from '@app/common';

@Injectable()
export class AuthRepository extends AbstractRepository<Auth> {
    protected readonly logger: Logger = new Logger(AuthRepository.name);

    constructor(
        @InjectModel(Auth.name) authModel: Model<Auth>,
        @InjectConnection() connection: Connection,
    ) {
        super(authModel, connection);
    }
}
