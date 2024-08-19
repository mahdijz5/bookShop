import { Module } from '@nestjs/common';

import { AUTH_SERVICE, PACKAGE_SERVICE } from '@app/common/constants';
import { RmqModule } from '@app/common/rmq';
import { OrderController } from './order.controller';
  
@Module({
    imports: [RmqModule.register([PACKAGE_SERVICE])],
    controllers: [ OrderController],
})
export class OrderModule {}
