import { Module } from '@nestjs/common';

import { AUTH_SERVICE } from '@app/common/constants';
import { RmqModule } from '@app/common/rmq';
import { RoleController } from './role.controller';

@Module({
    imports: [RmqModule.register([AUTH_SERVICE])],
    controllers: [RoleController],
})
export class RoleModule {}
