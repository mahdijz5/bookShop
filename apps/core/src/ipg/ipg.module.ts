import { Module } from '@nestjs/common';
 import { IpgController } from './ipg.controller';
import { RmqModule } from '@app/common/rmq';
import { IPG_SERVICE } from '@app/common';

@Module({
  imports : [ RmqModule.register([IPG_SERVICE])],
  providers: [ ],
  controllers: [IpgController]
})
export class IpgModule {}
