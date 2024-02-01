import { AppModule } from './app.module';
import { NestFactory } from '@nestjs/core';
import { useContainer } from 'class-validator';
import { ValidationPipe } from '@nestjs/common';
import { UniqueFieldException } from 'src/filters/unique-field-exception.filter';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const uniqueFieldExceptionFilter = app.get(UniqueFieldException);
  app.enableCors({
    origin: true,
    methods: 'GET, PUT, PATCH, DELETE, POST',
    allowedHeaders: 'Content-Type, Accept',
  });
  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      whitelist: true,
      forbidNonWhitelisted: true,
    }),
  );
  app.useGlobalFilters(uniqueFieldExceptionFilter);
  useContainer(app.select(AppModule), { fallbackOnErrors: true });
  await app.listen(4040);
}
bootstrap();
