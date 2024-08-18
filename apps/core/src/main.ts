import { Logger, ValidationPipe, VersioningType } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { FastifyAdapter, NestFastifyApplication } from '@nestjs/platform-fastify';
import fastifyFingerprint from 'fastify-fingerprint';
import compression from '@fastify/compress';
import helmet from '@fastify/helmet';
import { AppModule } from './app.module';
import { AllExceptionFilter } from './common/filters';
import { ResponseInterceptor } from './common/interceptors';
import { exceptionFactory } from './common/utils';
import fastifyMultipart from '@fastify/multipart';
import { setupDocument } from '@app/common';

const configService: ConfigService = new ConfigService();
const logger = new Logger('----- CORE -----');

async function bootstrap() {
  const app = await NestFactory.create<NestFastifyApplication>(
    AppModule,
    new FastifyAdapter({
      logger: false,
      trustProxy: true,
    }),
  );


  await app.register(fastifyFingerprint);
  await app.register(compression);
  await app.register(helmet);

  app.enableCors();
 
  app.setGlobalPrefix(configService.getOrThrow<string>('API_PATH'));
  app.useGlobalFilters(new AllExceptionFilter());
  app.useGlobalInterceptors(new ResponseInterceptor());
  app.enableVersioning({ type: VersioningType.URI });
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      transform: true,
      exceptionFactory,
    }),
  );

  await app.register(fastifyMultipart, {
    limits: { fileSize: 50 * 1024 }
  });

  const swaggerPath = configService.getOrThrow<string>('DOC_PATH');
  setupDocument(app, swaggerPath);

  const port = configService.getOrThrow<number>('HTTP_PORT');
  await app.listen(port, '0.0.0.0');

  logger.verbose('Running ...');
}
bootstrap();
