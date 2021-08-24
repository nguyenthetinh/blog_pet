import { NestFactory, HttpAdapterHost } from '@nestjs/core';
import { AppModule } from './app.module';
import * as cookieParser from 'cookie-parser';
import { ExceptionsLoggerFilter } from './utils/exceptionsLogger.filter';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const { httpAdapter } = app.get(HttpAdapterHost)
  app.useGlobalFilters(new ExceptionsLoggerFilter(httpAdapter))
  app.useGlobalPipes(new ValidationPipe())
  app.setGlobalPrefix('api')
  app.use(cookieParser());
  await app.listen(3000);
}
bootstrap();
