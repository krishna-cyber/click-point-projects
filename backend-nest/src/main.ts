import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import cookieParser from 'cookie-parser';
import { ValidationPipe } from '@nestjs/common';
import morgan from 'morgan';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { snapshot: true });
  app.useGlobalPipes(new ValidationPipe());
  await app.listen(process.env.PORT ?? 3000);
  app.use(morgan('dev'));
  app.use(cookieParser());
  console.log(`Application is running on: ${await app.getUrl()}`);
}
bootstrap();
