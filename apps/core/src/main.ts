import { NestFactory } from '@nestjs/core';
 import { ValidationPipe } from '@nestjs/common';
import { Logger } from 'nestjs-pino';
import { ConfigService } from '@nestjs/config';
import { setupDocument } from '@app/common/utils';
import { Transport } from '@nestjs/microservices';
import * as cookieParser from 'cookie-parser';
import { RmqService } from '@app/common/rmq';
 import { AppModule } from './app.module';
import { AllExceptionFilter } from './common/filters';
import { ResponseInterceptor } from './common/interceptors';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {})
  const configService = app.get(ConfigService)
  app.useGlobalPipes(new ValidationPipe({ whitelist: true }))
  app.useLogger(app.get(Logger))
  app.useGlobalFilters(new AllExceptionFilter()); 
  app.useGlobalInterceptors(new ResponseInterceptor());

  app.setGlobalPrefix(await configService.get("API_PATH"));
  setupDocument(app, await configService.get("DOC_PATH"));
  app.use(cookieParser())
  await app.listen(await configService.get("HTTP_PORT"));

}
bootstrap();