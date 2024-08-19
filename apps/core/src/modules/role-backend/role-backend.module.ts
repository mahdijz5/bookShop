import { Module } from '@nestjs/common';
import { RoleBackendController } from './role-backend.controller';
import { RmqModule } from '@app/common/rmq';
import { AUTH_SERVICE } from '@app/common/constants';

@Module({
    imports: [RmqModule.register([AUTH_SERVICE])],
    controllers: [RoleBackendController],
})
export class RoleBackendModule {}
