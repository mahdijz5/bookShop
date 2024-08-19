

import { Injectable, Logger } from '@nestjs/common';
import { InjectConnection, InjectModel } from '@nestjs/mongoose';
import { Connection, Model } from 'mongoose';

import { AbstractRepository } from '@app/common';
import { Ipg } from '../models/ipg.schema';

@Injectable()
export class IpgRepository extends AbstractRepository<Ipg> {
    protected readonly logger: Logger = new Logger(IpgRepository.name);

    constructor(
        @InjectModel(Ipg.name) ipgModel: Model<Ipg>,
        @InjectConnection() connection: Connection,
    ) {
        super(ipgModel, connection);
    }
}
