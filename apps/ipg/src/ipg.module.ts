import { Module } from '@nestjs/common';
import { IpgController } from './controllers/ipg.controller';
 import { HttpModule } from '@nestjs/axios';
import { ConfigModule } from '@nestjs/config';
import * as Joi from 'joi';
import { RmqModule } from '@app/common/rmq';
import { DatabaseModule, IPG_SERVICE, LoggerModule } from '@app/common';
import { Transaction, TransactionSchema } from './models';
import { TransactionRepository } from './repositories/transaction.repository';
import { IpgHandlerService } from './services/handler.service';
import { IpgService } from './services/ipg.service';
import { Ipg, IpgSchema } from './models/ipg.schema';
import { IpgRepository } from './repositories/ipg.repository';
 
@Module({
  imports: [
    HttpModule,
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
    RmqModule.register([IPG_SERVICE]),
    LoggerModule,
    DatabaseModule,
    DatabaseModule.forFeature([
      {
        name: Transaction.name,
        schema: TransactionSchema
      },
      {
        name: Ipg.name,
        schema: IpgSchema
      },
    ])

  ],
  controllers: [IpgController],
  providers: [IpgHandlerService,IpgService,TransactionRepository,IpgRepository],
})
export class IpgModule { }
