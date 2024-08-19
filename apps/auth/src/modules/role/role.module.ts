import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { RoleService } from './role.service';
import { RoleController } from './role.controller';
import { Role, RoleSchema, UserRole, UserRoleSchema } from './schemas';
import { RoleRepository, UserRoleRepository } from './repositories';

import { Backend, BackendSchema } from '../backend/schemas';
import { BackendRepository } from '../backend/repositories';
import { RoleBackend, RoleBackendSchema } from '../role-backend/schemas';
import { RoleBackendRepository } from '../role-backend/repositories';
import { CacheModule } from '@app/common/cache';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JWT_EXPIRE } from '@app/common/constants';
import { DatabaseModule } from '@app/common';

@Module({
    imports: [
        DatabaseModule.forFeature([
            { name: Role.name, schema: RoleSchema },
            { name: UserRole.name, schema: UserRoleSchema },
            { name: Backend.name, schema: BackendSchema },
            { name: RoleBackend.name, schema: RoleBackendSchema },

        ]),
        CacheModule.register(),
        JwtModule.registerAsync({
            imports: [ConfigModule],
            useFactory: (configService: ConfigService) => ({
                secret: configService.getOrThrow('JWT_SECRET'),
                signOptions: { expiresIn: JWT_EXPIRE },
            }),
            inject: [ConfigService],
        }),
    ],
    controllers: [RoleController],
    providers: [
        RoleService,
        RoleRepository,
        UserRoleRepository,
        BackendRepository,
        RoleBackendRepository,
    ],
    exports: [RoleService],
})
export class RoleModule { }
