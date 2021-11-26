import { INestApplication } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

export function SwaggerConfig(app: INestApplication): void {
  const URL = 'api-docs';
  const option = new DocumentBuilder()
    .setTitle('타닥타닥 API 문서')
    .setDescription('타닥타닥의 API 문서입니다.')
    .setContact('타닥타닥 개발팀', 'https://tadaktadak.com', '')
    .setVersion('1.0.0')
    .build();
  const document = SwaggerModule.createDocument(app, option);
  SwaggerModule.setup(URL, app, document);
}
