import { Injectable, Logger } from '@nestjs/common';
import { InjectConnection, InjectModel } from '@nestjs/mongoose';
import { Connection, Model } from 'mongoose';

 import { Role } from '../schemas';
import { AbstractRepository } from '@app/common';

@Injectable()
export class RoleRepository extends AbstractRepository<Role> {
    protected readonly logger: Logger = new Logger(RoleRepository.name);

    constructor(
        @InjectModel(Role.name) roleModel: Model<Role>,
        @InjectConnection() connection: Connection,
    ) {
        super(roleModel, connection);
    }
}
