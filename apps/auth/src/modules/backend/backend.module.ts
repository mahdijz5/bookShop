import { Module } from '@nestjs/common';
import { BackendService } from './backend.service';
import { BackendController } from './backend.controller';
import { Backend, BackendSchema } from './schemas';
import { BackendRepository } from './repositories';
import { DatabaseModule } from '@app/common';

@Module({
    imports: [
        DatabaseModule.forFeature([
            {
                name: Backend.name,
                schema: BackendSchema,
            }
        ]),
    ],
    controllers: [BackendController],
    providers: [BackendService, BackendRepository],
})
export class BackendModule { }
