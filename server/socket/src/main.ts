import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import 'dotenv/config';
import { INestApplication } from '@nestjs/common';
import { RedisIoAdapter } from './redis.adapter';
import { CorsConfig } from './config/cors.config';

async function getNestApplicationByEnv(): Promise<INestApplication> {
  return await NestFactory.create(AppModule);
}

async function bootstrap() {
  const app = await getNestApplicationByEnv();
  const redis = new RedisIoAdapter(app);
  app.useWebSocketAdapter(redis);
  app.enableCors(CorsConfig);
  await app.listen(process.env.NODE_PORT ?? 3000);
}

bootstrap();
