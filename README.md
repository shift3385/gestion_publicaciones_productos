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

1.  **Instalar dependencias:** `npm install`
2.  **Levantar DB:** `docker-compose up -d`
3.  **Documentación Interactiva:** 
    Una vez que arranques el servidor, puedes ver y probar todos los endpoints aquí:
    👉 **[http://localhost:3001/api/docs](http://localhost:3001/api/docs)**

## 🧪 Pruebas Automáticas (E2E)

He configurado una suite de pruebas de punta a punta para asegurar que todo funcione como debe:

```bash
npm run test:e2e
```
*Este comando prueba automáticamente el Login, la creación de Productos y las Publicaciones en menos de 5 segundos.*

## 🛠️ Comandos que uso frecuentemente

- **Levantar todo:** `docker-compose up -d`
- **Bajar todo (limpiando datos):** `docker-compose down -v`
- **Crear un nuevo módulo:** `nest generate resource <nombre>`
- **Compilar para ver errores:** `npm run build`

## 👥 Usuarios de Prueba (Solo Desarrollo)

He creado estos 5 usuarios para que podamos probar el sistema desde ya:

| Nombre Completo | Email | Password |
| :--- | :--- | :--- |
| **User#1** | user1@test.com | 123 |
| **User#2** | user2@test.com | 123 |
| **User#3** | user3@test.com | 123 |
| **User#4** | user4@test.com | 123 |
| **User#5** | user5@test.com | 123 |

---
*Nota: Estas credenciales son solo para ambiente local y pruebas iniciales.*
