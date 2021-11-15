import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import * as cookieParser from 'cookie-parser';
import 'dotenv/config';
import { AppModule } from './app.module';
import { SwaggerConfig } from './config/swagger.config';
import { HttpExceptionFilter } from './filter/http-exception.filter';
import { TransformInterceptor } from './filter/transform.interceptor';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix('api');
  app.useGlobalInterceptors(new TransformInterceptor());
  app.useGlobalFilters(new HttpExceptionFilter());
  app.use(cookieParser());
  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
    }),
  );
  SwaggerConfig(app);
  await app.listen(3000);
}

bootstrap();
