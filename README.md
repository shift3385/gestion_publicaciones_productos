# Gestión de Publicaciones y Productos (NestJS)

Aplicación de ejemplo desarrollada para la investigación y dominio del Framework NestJS, aplicando principios de arquitectura limpia, patrones de diseño y estándares de la industria.

## 🛠️ Herramientas y Tecnologías Utilizadas

### Entorno de Desarrollo (Pre-instalado)
- **Node.js**: v24.11.0 (Entorno de ejecución).
- **NPM**: 11.6.4 (Gestor de paquetes).
- **Docker Desktop**: Utilizado para la orquestación de servicios de infraestructura (PostgreSQL).

### Herramientas Instaladas Globalmente
Se instaló el CLI oficial de NestJS para la generación de esquemas y recursos:
```bash
npm install -g @nestjs/cli
```

### Dependencias del Proyecto (Locales)
Se instalaron los siguientes paquetes para dar soporte a los requisitos de negocio:
- **Core ORM**: `@nestjs/typeorm`, `typeorm`, `pg` (Driver para PostgreSQL).
- **Configuración**: `@nestjs/config` (Manejo de variables de entorno `.env`).
- **Seguridad y Auth**: `@nestjs/passport`, `passport`, `passport-jwt`, `@nestjs/jwt`, `bcrypt`.
- **Validación**: `class-validator`, `class-transformer`.
- **Documentación**: `@nestjs/swagger`, `swagger-ui-express`.

*Comando de instalación masiva:*
```bash
npm install @nestjs/typeorm typeorm pg @nestjs/config class-validator class-transformer @nestjs/passport passport passport-jwt @nestjs/jwt bcrypt @nestjs/swagger swagger-ui-express
```

## 🏗️ Pasos de Implementación Realizados

### 1. Preparación de la Infraestructura (Docker)
Para mantener el sistema limpio y cumplir con el requisito de base de datos **PostgreSQL**, se optó por un contenedor Docker. Se creó el archivo `docker-compose.yaml` y se ejecutó:
```bash
docker-compose up -d
```
*Este comando descarga la imagen oficial de Postgres 15-alpine y levanta el servicio en el puerto 5432.*

### 2. Inicialización del Proyecto NestJS
Se utilizó el CLI para generar la estructura base del proyecto:
```bash
nest new . --package-manager npm --skip-git
```

### 3. Configuración de Variables de Entorno
Se creó un archivo `.env` en la raíz para centralizar las credenciales de acceso a la DB y secretos de JWT, asegurando que el código no contenga datos sensibles hardcodeados.

---
*Este documento se actualiza dinámicamente según avance el desarrollo.*
