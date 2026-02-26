## 📝 *Título:* Gestión de Publicaciones y Productos.

### *Descripción:* Desarrollar una applicación de ejemplo basándose en la documentación 
del framework [NestJS](https://docs.nestjs.com), donde se utilicen diferentes elementos
fundamentales del desarrollo orientado a objeto como: relaciones entre clases,
utilización de patrones, inyección de dependencias, manejo de responsabilidades etc.

### *Requisitos de codificación:*
1. Nombre de la aplicación intuitivo, en minúsculas y separado por quión bajo.  
2. Nombre de clases usando notación Camelcase empezando con mayúsculas.  
3. Nombre de métodos usando notación Camelcase empezando con minúsculas.  
4. Nombre de variables usando notación Camelcase empezando con minúsculas.  
5. Usar nest-cli para instalaciones y generar schemas, clases, recursos, estructuras, etc ...  
6. Utilizar el fichero README.md para plasmar de forma descriptiva, los pasos usados para el desarrollo.  
7. Usar buenas prácticas como: variables de entorno, archivos de configuración, decoradores etc..  

### *Requisitos de negocio:*
1. CRUD de Publicaciones.  
2. CRUD de Usuarios incluye gestión de Perfil de usuario.  
3. CRUD de Productos.  
4. Autenticación de usuario, usando Passport (estrategia JWT).  
5. Usar databases como: PostgresQL - MySQL - MongoDB.  
6. Usar patrón repository e incorporar ORM (TypeORM).  
7. Usar Swagger para visualizar los endpoints de las APIs.  
7.1. Configurar y documentar cada API siguiendo en lo posible estándar OpenAI.  
8. Aplicar validaciones a los datos de entrada del servicio.  
9. Hashing contraseñas u otros datos necesario a su consideración para almacenarlos en database.  


---

# Observaciones de Revisión







Este archivo registra los requerimientos del proyecto y las correcciones solicitadas tras la revisión técnica.

## 📝 Observaciones por Atender

1.  **Documentación del Repo:** Agregar descripción de la tarea en un fichero dentro del repositorio (`TASK_DESCRIPTION.md`).
2.  **Relación Many-to-Many:** Cambiar la relación entre `Publication` y `Product`. Actualmente es Many-to-One, pero debe permitir que:
    - Una Publicación tenga **muchos** productos.
    - Un Producto pueda estar en **muchas** publicaciones.
3.  **Separación de Perfil de Usuario:** Separar la información adicional del usuario (`User`) en una clase independiente `Profile` con relación **One-to-One**. Esto mantiene la entidad `User` enfocada exclusivamente en la autenticación.
4.  **Relaciones Bidireccionales:** Implementar la regla `ManyToOne` - `OneToMany` para optimizar consultas. Ejemplo: 
    - Un `User` debe tener una lista de `Publicaciones` (`OneToMany`) para evitar búsquedas ineficientes filtrando en toda la base de datos.
