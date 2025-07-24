import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Enable global validation pipe
  app.useGlobalPipes(new ValidationPipe());

  // Enable CORS for frontend requests
  app.enableCors();

  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
