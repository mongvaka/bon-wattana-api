import {NestFactory} from '@nestjs/core';
import {AppModule} from './app.module';
import {join} from "path";
import {NestExpressApplication} from "@nestjs/platform-express";
import {init as SentryInit} from '@sentry/node';
import {ValidationPipe} from "@nestjs/common";
import {SwaggerModule, DocumentBuilder} from '@nestjs/swagger';
import { json } from 'body-parser';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  SentryInit({
    dsn: ""
  });
  const version = 'v1';
  const globalPrefix = `/api/${version}`;
  app.setGlobalPrefix(globalPrefix);
  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      transformOptions: {
        enableImplicitConversion: true,
      },
    }),
  );
  app.use(json({ limit: '10mb' }));
  app.useStaticAssets(join(__dirname, '..', 'public'), {prefix: '/public'});
  const options = new DocumentBuilder()
    .setTitle('BRT CONTRACT API')
    .setDescription('BRT Contract API Description')
    .setVersion('1.0')
    .addBearerAuth()
    .build();
  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup(`${globalPrefix}/docs`, app, document);

  app.enableCors();
  const port = process.env.PORT || '3000';
  const server = await app.listen(port);
  server.setTimeout(1800000); // 30 min
}

bootstrap();
