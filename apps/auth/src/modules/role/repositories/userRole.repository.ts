import { Injectable, Logger } from '@nestjs/common';
import { InjectConnection, InjectModel } from '@nestjs/mongoose';
import { Connection, Model } from 'mongoose';

 import { UserRole } from '../schemas';
import { AbstractRepository } from '@app/common';

@Injectable()
export class UserRoleRepository extends AbstractRepository<UserRole> {
    protected readonly logger: Logger = new Logger(UserRoleRepository.name);

    constructor(
        @InjectModel(UserRole.name) userRoleModel: Model<UserRole>,
        @InjectConnection() connection: Connection,
    ) {
        super(userRoleModel, connection);
    }
}
