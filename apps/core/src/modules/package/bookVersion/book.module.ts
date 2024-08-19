import { Module } from '@nestjs/common';

import { AUTH_SERVICE, PACKAGE_SERVICE } from '@app/common/constants';
import { RmqModule } from '@app/common/rmq';
import { BookVersionController } from './book.controller';
 
@Module({
    imports: [RmqModule.register([PACKAGE_SERVICE])],
    controllers: [BookVersionController],
})
export class BookVersionModule {}
