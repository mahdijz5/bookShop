import { Module } from '@nestjs/common';

import { AUTH_SERVICE, PACKAGE_SERVICE } from '@app/common/constants';
import { RmqModule } from '@app/common/rmq';
import { BookController } from './book.controller';

@Module({
    imports: [RmqModule.register([PACKAGE_SERVICE])],
    controllers: [BookController],
})
export class BookModule {}
