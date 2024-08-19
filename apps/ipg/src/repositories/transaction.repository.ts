

import { Injectable, Logger } from '@nestjs/common';
import { InjectConnection, InjectModel } from '@nestjs/mongoose';
import { Connection, Model } from 'mongoose';

import { AbstractRepository } from '@app/common';
import { Transaction } from '../models';

@Injectable()
export class TransactionRepository extends AbstractRepository<Transaction> {
    protected readonly logger: Logger = new Logger(TransactionRepository.name);

    constructor(
        @InjectModel(Transaction.name) TransactionModel: Model<Transaction>,
        @InjectConnection() connection: Connection,
    ) {
        super(TransactionModel, connection);
    }
}
