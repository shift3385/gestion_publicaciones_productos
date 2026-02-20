# Bitácora de Comandos - Proyecto Gestión de Publicaciones

En este archivo se registran todos los comandos ejecutados durante el desarrollo del proyecto, organizados por sesión o fase.

## Fase 1: Inicialización y Entorno
- `nest new . --package-manager npm --skip-git`: Inicialización del boilerplate.
- `git init`: Inicialización del repositorio local.
- `git remote add origin https://github.com/shift3385/gestion_publicaciones_productos.git`: Vinculación con GitHub.
- `docker-compose up -d`: Levantar infraestructura.
- `docker-compose down -v`: Limpieza total de contenedores y volúmenes.
- `netstat -ano | findstr :5432`: Verificación de puertos ocupados en Windows.

## Fase 2: Configuración de Base de Datos y Recursos
- `npm install @nestjs/typeorm typeorm pg @nestjs/config class-validator class-transformer @nestjs/passport passport passport-jwt @nestjs/jwt bcrypt @nestjs/swagger swagger-ui-express`: Instalación de dependencias core.
- `npm run build`: Compilación del proyecto.
- `npx nest generate resource users --no-spec`: Generación del recurso CRUD de usuarios (REST API).

## Fase 3: Seguridad y Autenticación (JWT)
- `npm install bcrypt && npm install -D @types/bcrypt`: Instalación de Bcrypt para encriptación.
- `npx nest generate module auth`: Creación del módulo de autenticación.
- `npx nest generate controller auth --no-spec`: Controlador para login.
- `npx nest generate service auth --no-spec`: Lógica de autenticación y JWT.
- `node seed-users.js`: Script personalizado para insertar los 5 usuarios de prueba.
- `node test-login.js`: Script personalizado para verificar el flujo de login y generación de Token JWT.

## Fase 4: Gestión de Productos
- `npx nest generate resource products --no-spec`: Generación del recurso CRUD de productos.
- Implementación de Slugs automáticos (BeforeInsert/BeforeUpdate) y relación ManyToOne con Usuarios.
- `node seed-products.js`: Script de siembra con 3 productos iniciales (Silla, Monitor, Teclado).

## Fase 5: Protección de Rutas (JWT Auth Guards)
- Implementación de `JwtStrategy` para validar tokens en los headers (Bearer Token).
- Configuración de `AuthGuard` global en el controlador de productos.
- Creación del decorador personalizado `@GetUser()` para extraer datos del usuario del JWT.
- Verificación de seguridad: Bloqueo de peticiones no autorizadas (401 Unauthorized).

## Fase 6: Gestión de Publicaciones (Módulo Core)
- `npx nest generate resource publications --no-spec`: Generación del recurso de publicaciones.
- Implementación de entidad `Publication` con Enums para estados (DRAFT, ACTIVE, CLOSED).
- Relaciones ManyToOne con `User` y `Product`.
- Validación de lógica de negocio: Fechas de inicio y fin, y existencia de productos.
- `node test-publication.js`: Script de prueba de integración (Login -> Get Product -> Create Publication).
- Corregidas rutas de importación relativas para asegurar la compilación exitosa.

---
*Última actualización: 20 de febrero de 2026*
