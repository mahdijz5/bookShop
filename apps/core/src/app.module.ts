import { AUTH_SERVICE, IPG_SERVICE, LoggerModule } from '@app/common';
import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { ClientsModule, Transport } from '@nestjs/microservices';
import * as Joi from 'joi';
import { IpgModule } from './modules/ipg/ipg.module';
import { AuthModule } from './modules/auth/auth.module';
import { APP_GUARD } from '@nestjs/core';
import { AuthGuard } from './common/guards';
import { RmqModule } from '@app/common/rmq';


@Module({
  imports: [
    LoggerModule,
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: "apps/core/.env",
      validationSchema: Joi.object({
        HTTP_PORT: Joi.number().required(),
      })
    }),
    RmqModule.register([AUTH_SERVICE]),
    IpgModule,
    AuthModule
  ],
  controllers: [],
  providers: [

    {
      provide: APP_GUARD,
      useClass: AuthGuard,
    },
  ],
})
export class AppModule { }
