import { Injectable, Logger } from '@nestjs/common';
import { InjectConnection, InjectModel } from '@nestjs/mongoose';
import { Connection, Model } from 'mongoose';
 import { ResetPasswordTemp } from '../schemas';
import { AbstractRepository } from '@app/common';

@Injectable()
export class ResetPasswordTempRepository extends AbstractRepository<ResetPasswordTemp> {
    protected readonly logger: Logger = new Logger(ResetPasswordTempRepository.name);

    constructor(
        @InjectModel(ResetPasswordTemp.name)
        resetPasswordTempModel: Model<ResetPasswordTemp>,
        @InjectConnection() connection: Connection,
    ) {
        super(resetPasswordTempModel, connection);
    }
}
