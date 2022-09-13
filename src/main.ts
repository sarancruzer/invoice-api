import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import { AppModule } from './app.module';
import { join } from 'path';
import * as cookieParser from 'cookie-parser';
import { json, urlencoded } from 'express';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ConfigService } from '@nestjs/config';
import { launchSuperUserSeeder } from './seeders';
import { ValidationPipe } from './shared/pipes/validation.pipe';

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
  console.log('process.env.ENVIRONMENT', config.get('ENVIRONMENT') );

  
  bootstrapSwagger(app, config);
  await launchSuperUserSeeder(app)

  app.useGlobalPipes(new ValidationPipe());
  
  await app.listen(3000);
  console.log(`Application is running on: ${await app.getUrl()}`)

}


bootstrap();


const bootstrapSwagger = (app: NestExpressApplication, config: any) => {

  if (config.get('ENVIRONMENT') === 'development') {
    const configs = new DocumentBuilder()
      .setTitle('Invoice Api')
      .setVersion('1.0')
      .build();
    const document = SwaggerModule.createDocument(app, configs);
    SwaggerModule.setup('api', app, document);
  }
}