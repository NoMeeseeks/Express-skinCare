# Express-skinCare

Express-skinCare es un proyecto basado en Node.js con Express y Sequelize como ORM para manejar una base de datos PostgreSQL.

## Configuración de la Base de Datos (PostgreSQL)

### Instalación de Sequelize y PostgreSQL Driver

Para configurar Sequelize con PostgreSQL, sigue estos pasos:

1. Instala Sequelize como dependencia:
   ```sh
   npm install --save sequelize
   ```

2. Instala el driver para PostgreSQL:
   ```sh
   npm install --save pg pg-hstore
   ```

3. Inicializa Sequelize en tu proyecto:
   ```sh
   npx sequelize init
   ```

Este comando creará la estructura de archivos de Sequelize, incluyendo:
- **config/**: Contiene la configuración de la base de datos.
- **models/**: Contiene los modelos de la base de datos.
- **migrations/**: Archivos para la gestión de cambios en la estructura de la base de datos.
- **seeders/**: Datos de prueba que se pueden insertar en la base de datos.

## Configuración Adicional

1. Edita el archivo `config/config.json` para asegurarte de que la configuración de la base de datos sea correcta.

2. Para ejecutar migraciones y sincronizar la base de datos:
   ```sh
   npx sequelize db:migrate
   ```

3. Para agregar datos de prueba:
   ```sh
   npx sequelize db:seed:all
   ```

## Ejecutando el Servidor

Para iniciar el servidor Express, ejecuta:
```sh
npm start
```

Este proyecto está diseñado para facilitar la gestión de una base de datos PostgreSQL con Sequelize en un entorno Express.

