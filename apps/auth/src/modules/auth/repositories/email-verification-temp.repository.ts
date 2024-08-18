import { Injectable, Logger } from '@nestjs/common';
import { InjectConnection, InjectModel } from '@nestjs/mongoose';
import { Connection, Model } from 'mongoose';
 import { EmailVerificationTemp } from '../schemas';
import { AbstractRepository } from '@app/common';

@Injectable()
export class EmailVerificationTempRepository extends AbstractRepository<EmailVerificationTemp> {
    protected readonly logger: Logger = new Logger(EmailVerificationTempRepository.name);

    constructor(
        @InjectModel(EmailVerificationTemp.name)
        emailVerificationTempModel: Model<EmailVerificationTemp>,
        @InjectConnection() connection: Connection,
    ) {
        super(emailVerificationTempModel, connection);
    }
}
