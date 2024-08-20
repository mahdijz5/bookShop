import { NestFactory } from '@nestjs/core';
import { RmqOptions } from '@nestjs/microservices';
import { FastifyAdapter, NestFastifyApplication } from '@nestjs/platform-fastify';
import { RmqService } from '@app/common/rmq';
import { MAIL_SERVICE } from '@app/common/constants';
import { AppModule } from './app.module';
import { Logger } from '@nestjs/common';

const logger = new Logger('----- MAIL -----');

async function bootstrap() {
    const app = await NestFactory.create<NestFastifyApplication>(
        AppModule,
        new FastifyAdapter({ logger: true }),
    );

    const rmqService = app.get<RmqService>(RmqService);
    app.connectMicroservice<RmqOptions>(rmqService.getOptions(MAIL_SERVICE));
    await app.startAllMicroservices();

    logger.verbose('Running ...');
}
bootstrap();
