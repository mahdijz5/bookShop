import { Module } from '@nestjs/common';
import { BackendService   } from './backend.service';
import { BackendController  } from './backend.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Backend, BackendSchema } from './schemas';
import { BackendRepository } from './repositories';
 
@Module({
    imports: [
        MongooseModule.forFeature([
            {
                name: Backend.name,
                schema: BackendSchema,
            }
        ]),
    ],
    controllers: [BackendController],
    providers: [BackendService ,BackendRepository],
})
export class BackendModule {}
