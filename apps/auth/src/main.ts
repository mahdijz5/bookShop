import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { Logger } from 'nestjs-pino';
import { ConfigService } from '@nestjs/config';
import { setupDocument } from '@app/common/utils';
import * as cookieParser from 'cookie-parser';
import { Transport } from '@nestjs/microservices';
import { RmqService } from '@app/common/rmq';
import { AUTH_SERVICE } from '@app/common';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {});
  const configService = (app.get(ConfigService))
  const rmqService = app.get(RmqService)
  const loggerService = app.get(Logger)

  app.connectMicroservice(rmqService.getOptions(AUTH_SERVICE))
  app.use(cookieParser())
  app.useGlobalPipes(new ValidationPipe({ whitelist: true }))
  app.useLogger(loggerService)
  app.setGlobalPrefix(await configService.get("API_PATH"));


  loggerService.log("------ Auth ------")
  await app.startAllMicroservices()
}
bootstrap();
