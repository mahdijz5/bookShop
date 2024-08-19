import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { Logger } from 'nestjs-pino';
import { ConfigService } from '@nestjs/config';
import * as cookieParser from 'cookie-parser';
import { RmqService } from '@app/common/rmq';
import { AUTH_SERVICE, IPG_SERVICE, PACKAGE_SERVICE } from '@app/common';
import { IpgModule } from './ipg.module';
  
async function bootstrap() {
  const app = await NestFactory.create(IpgModule, {});
  const rmqService = app.get(RmqService)
  const loggerService = app.get(Logger)
  
  
  app.connectMicroservice(rmqService.getOptions(IPG_SERVICE))
  app.use(cookieParser())
  app.useGlobalPipes(new ValidationPipe({ whitelist: true }))
  app.useLogger(loggerService)
  
  loggerService.log("------ Ipg  ------")
  await app.startAllMicroservices()
}
bootstrap();
