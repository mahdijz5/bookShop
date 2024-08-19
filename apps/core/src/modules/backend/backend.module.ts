import { Module } from '@nestjs/common';
 import { AUTH_SERVICE } from '@app/common/constants';
import { RmqModule } from '@app/common/rmq';
import { BackendController } from './backend.controller';

@Module({
    imports: [RmqModule.register([AUTH_SERVICE])],
    controllers: [BackendController],
})
export class BackendModule {}
