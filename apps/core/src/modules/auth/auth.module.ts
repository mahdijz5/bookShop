import { Module } from '@nestjs/common';
 import { RmqModule } from '@app/common/rmq';
import { AuthController } from './auth.controller';
import { AUTH_SERVICE } from '@app/common';

@Module({
    imports: [RmqModule.register([AUTH_SERVICE])],
    controllers: [AuthController],
})
export class AuthModule {}
