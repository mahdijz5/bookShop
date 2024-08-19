import { Module } from '@nestjs/common';
import { IpgController } from './controllers/ipg.controller';
 import { HttpModule } from '@nestjs/axios';
import { ConfigModule } from '@nestjs/config';
import * as Joi from 'joi';
import { RmqModule } from '@app/common/rmq';
import { DatabaseModule, IPG_SERVICE, LoggerModule, PACKAGE_SERVICE } from '@app/common';
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
      envFilePath: "apps/ipg/.env",
      validationSchema: Joi.object({
        MONGO_URI: Joi.string().required(),
       })
    }), 
    RmqModule.register([IPG_SERVICE,PACKAGE_SERVICE]),
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
