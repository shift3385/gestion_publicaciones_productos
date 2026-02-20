import { NestFactory, Reflector } from '@nestjs/core';
import { ValidationPipe, ClassSerializerInterceptor } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Prefijo global para que todas las rutas sean /api/...
  app.setGlobalPrefix('api');

  // Activar validaciones globales
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
    }),
  );

  // Activar el interceptor para excluir campos (como el password)
  app.useGlobalInterceptors(new ClassSerializerInterceptor(app.get(Reflector)));

  // Configuración de Swagger (OpenAPI)
  const config = new DocumentBuilder()
    .setTitle('Gestión de Publicaciones y Productos API')
    .setDescription('Documentación oficial de la API para la gestión de productos, usuarios y publicaciones.')
    .setVersion('1.0')
    .addBearerAuth()
    .build();
  
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api/docs', app, document);

  await app.listen(process.env.PORT ?? 3001);
}
bootstrap();
