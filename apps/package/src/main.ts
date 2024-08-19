import { NestFactory } from '@nestjs/core';
import { PackageModule } from './package.module';

async function bootstrap() {
  const app = await NestFactory.create(PackageModule);
  await app.listen(3000);
}
bootstrap();
