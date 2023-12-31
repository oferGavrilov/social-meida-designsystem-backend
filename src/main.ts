/* eslint-disable prettier/prettier */

import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors({
      origin: 'http://localhost:4200',
      methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
      // preflightContinue: false,
      // optionsSuccessStatus: 204,
      credentials: true,
      allowedHeaders: 'Content-Type, Accept',
  })
  await app.listen(3000);
}
bootstrap();
