# Gestión de Publicaciones y Productos

Este es el repositorio central donde estoy desarrollando el sistema de gestión de publicaciones y productos. El objetivo es montar una arquitectura sólida con NestJS que me sirva de base para futuros proyectos, aplicando buenas prácticas y asegurando que sea escalable.

## 🚀 Lo que he montado hasta ahora

1.  **Base del Proyecto:** Ya tengo el boilerplate de NestJS listo y limpio.
2.  **Infraestructura con Docker:** He configurado un contenedor de PostgreSQL (v15) para no ensuciar mi instalación local. Solo necesito correr `docker-compose up -d` y ya tengo la base de datos lista.
3.  **Control de Versiones:** Repositorio inicializado, ignorando lo que no debe subirse (como `node_modules` y `.env`) para mantener la seguridad y el orden.

## 🛠️ Tecnologías que estoy usando

*   **Framework:** NestJS (TypeScript).
*   **Base de Datos:** PostgreSQL corriendo en Docker.
*   **ORM:** TypeORM (próximamente configurado).
*   **Seguridad:** JWT y Bcrypt para la parte de usuarios.
*   **Documentación:** Swagger para tener los endpoints bien mapeados.

## 🏃 Cómo ponerlo a andar

Si acabas de clonar el repo, esto es lo que tienes que hacer:

1.  **Instalar dependencias:**
    ```bash
    npm install
    ```
2.  **Configurar el entorno:**
    Crea tu archivo `.env` basado en las credenciales que definí en el `docker-compose.yaml`.
3.  **Levantar la base de datos:**
    ```bash
    docker-compose up -d
    ```
4.  **Correr en desarrollo:**
    ```bash
    npm run start:dev
    ```

---
*Voy a ir actualizando este README según vaya cerrando los módulos de la aplicación.*
