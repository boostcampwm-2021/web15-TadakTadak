import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import 'dotenv/config';
import { INestApplication} from '@nestjs/common';

async function getNestApplicationByEnv(): Promise<INestApplication> {
  return await NestFactory.create(AppModule);
}

async function bootstrap() {
  const app = await getNestApplicationByEnv();
  await app.listen(3000);
}

bootstrap();
