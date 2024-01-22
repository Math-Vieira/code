import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as logger from 'morgan';
import { ValidationPipe } from '@nestjs/common';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    cors: {
      origin: process.env.CORS_ORIGIN || '*'
    }
  });

  //config class-validator
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      forbidUnknownValues: true,
      transform: true
    })
  );

  //add logger to the server
  app.use(logger('dev'));

  //config swagger
  const config = new DocumentBuilder()
    .setTitle('Test API DOCS')
    .setDescription(
      'The test API documentation is in front of you. I hope you enjoy it.'
    )
    .setVersion('1.0')
    .addBearerAuth(
      {
        type: 'http',
        scheme: 'bearer',
        bearerFormat: 'JWT',
        description: 'Example: "Bearer 12345abcdef"'
      },
      'access-token'
    )
    .build();
  const document = SwaggerModule.createDocument(app, config, {});
  SwaggerModule.setup('api', app, document, {
    explorer: true,
    swaggerOptions: { docExpansion: 'none' }
  });

  //start server
  await app.listen(process.env.PORT || 3000);
}
bootstrap();
