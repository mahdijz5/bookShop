import { IPG_SERVICE, LoggerModule } from '@app/common';
import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { IpgModule } from './ipg/ipg.module';
import * as Joi from 'joi';
 

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
    IpgModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule { }
