import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import 'dotenv/config';
import { HttpsOptionsConfig } from './config/https-options.config';
import { INestApplication, Logger } from '@nestjs/common';

async function getNestApplicationByEnv(): Promise<INestApplication> {
  if (process.env.NODE_ENV === 'prod') {
    Logger.log('Current Env is Production');
    return await NestFactory.create(AppModule, { httpsOptions: HttpsOptionsConfig });
  }
  Logger.log('Current Env is Development');
  return await NestFactory.create(AppModule);
}

async function bootstrap() {
  const app = await getNestApplicationByEnv();
  await app.listen(3000);
}

bootstrap();
