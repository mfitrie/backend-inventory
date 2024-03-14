/* eslint-disable prettier/prettier */
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
// import * as cookieParser from 'cookie-parser';
import cookieParser from 'cookie-parser';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.enableCors({
    origin: "https://frontend-inventory-snowy.vercel.app",
    // origin: "http://localhost:3000",
    credentials: true,
  });

  app.use(cookieParser());

  await app.listen(4000);
}
bootstrap();
