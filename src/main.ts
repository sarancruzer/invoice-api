import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import { AppModule } from './app.module';
import { join } from 'path';
import * as cookieParser from 'cookie-parser';
import { json, urlencoded } from 'express';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ConfigService } from '@nestjs/config';

async function bootstrap() {
  const appOptions = {cors: true};
  const app = await NestFactory.create<NestExpressApplication>(AppModule, appOptions);
  const config = new ConfigService();
  app.use(cookieParser());
  app.setGlobalPrefix('api');

  // To enable cors origin
  app.enableCors();

  app.use(json({ limit: '50mb' }));
  app.use(urlencoded({ extended: true, limit: '50mb' }));

  console.log('bootstrap -> __dirname', __dirname);
  app.useStaticAssets(join(__dirname, '..', 'public'));
  app.useStaticAssets(join(__dirname, '..', 'public','cgp'));
  app.useStaticAssets(join(__dirname, '..', 'public','teams'));

  console.log('process.env.ENVIRONMENT', config.get('ENVIRONMENT') );


  if (config.get('ENVIRONMENT') === 'development') {
    const configs = new DocumentBuilder()
      .setTitle('Invoice Api')
      .setVersion('1.0')
      .build();
    const document = SwaggerModule.createDocument(app, configs);
    SwaggerModule.setup('api', app, document);
  }
  await app.listen(3000);
}
bootstrap();
