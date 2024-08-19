import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';
import * as Joi from 'joi';
import { LoggerModule } from '@app/common/logger';
import { RmqModule } from '@app/common/rmq';
import { JWTStrategy } from './strategies';
import { AuthModule } from './modules/auth/auth.module';
import { DatabaseModule } from '@app/common';
import { Auth, AuthSchema } from './modules/auth/schemas';
import { AuthRepository } from './modules/auth/repositories';
import { CacheModule } from '@app/common/cache';
import { RoleBackendModule } from './modules/role-backend/role-backend.module';
import { RoleModule } from './modules/role/role.module';
import { BackendModule } from './modules/backend/backend.module';

@Module({
  imports: [
    LoggerModule,
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: "apps/auth/.env",
      validationSchema: Joi.object ({
        MONGO_URI: Joi.string().required(),
        JWT_SECRET: Joi.string().required(),
        JWT_EXPIRATION: Joi.string().required(),
      })
    }),
    RmqModule,
    AuthModule, 
    RoleBackendModule,
    RoleModule,
    BackendModule,
    DatabaseModule,
    DatabaseModule.forFeature([{
      name: Auth.name,
      schema : AuthSchema
    }]),
    CacheModule.register(),
  ],
  controllers: [],
  providers: [JWTStrategy,AuthRepository],
})
export class AppModule { }
