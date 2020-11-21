import 'dotenv/config';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
    const app = await NestFactory.create(AppModule);
          app.enableCors();

    const options = new DocumentBuilder()
        .setTitle('Interaktiv API')
        .setDescription('Описание API для доступа к базе данных')
        .setVersion('1.0')
        .addTag('interaktiv')
        .build();

    const document = SwaggerModule.createDocument(app, options);

    SwaggerModule.setup('api', app, document);

    await app.listen(8000);
}
bootstrap();