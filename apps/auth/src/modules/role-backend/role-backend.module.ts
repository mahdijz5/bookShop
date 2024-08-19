import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Role, RoleSchema } from '../role/schemas';
import { RoleRepository } from '../role/repositories';
import { BackendRepository } from '../backend/repositories';
import { Backend, BackendSchema } from '../backend/schemas';
import { RoleBackendController } from './role-backend.controller';
import { RoleBackendService } from './role-backend.service';
import { RoleBackend, RoleBackendSchema } from './schemas';
import { RoleBackendRepository } from './repositories';
 
@Module({
    imports: [
        MongooseModule.forFeature([
            {
                name: RoleBackend.name,
                schema: RoleBackendSchema,
            },
            {
                name: Role.name,
                schema: RoleSchema,
            },
            {
                name: Backend.name,
                schema: BackendSchema,
            },
        ]),
    ],
    controllers: [RoleBackendController],
    providers: [RoleBackendService, RoleBackendRepository,BackendRepository, RoleRepository],
})
export class RoleBackendModule { }
