import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';
import * as Joi from 'joi';
import { LoggerModule } from '@app/common/logger';
import { RmqModule } from '@app/common/rmq';
import { JWTStrategy } from './strategies';

@Module({
  imports: [
    LoggerModule,
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: "apps/auth/.env",
      validationSchema: Joi.object({
        MONGO_URI: Joi.string().required(),
        JWT_SECRET: Joi.string().required(),
        JWT_EXPIRATION: Joi.string().required(),
        HTTP_PORT: Joi.number().required(),
        TCP_PORT: Joi.number().required(),
      })
    }),
    JwtModule.registerAsync({
      useFactory: (configService: ConfigService) => ({
        secret: "test",
        signOptions: {
          expiresIn: `${configService.get("JWT_EXPIRATION")}`
        }
      }),
      inject: [ConfigService]
    }),
    RmqModule
  ],
  controllers: [],
  providers: [JWTStrategy],
})
export class AuthModule { }
