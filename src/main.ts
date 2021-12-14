import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const config = new DocumentBuilder()
    .setTitle('Maxxidata API')
    .setDescription('Maxxidata FullStack API desenvolvido por Rafael Cardoso Coelho.')
    .setVersion('1.0')
    .addBearerAuth()
    .build();
  const document = SwaggerModule.createDocument(app, config);

  app.enableCors({ origin: '*' });
  app.useGlobalPipes(new ValidationPipe());

  SwaggerModule.setup('api-doc', app, document);

  await app.listen(process.env.APP_PORT);
}
bootstrap();
