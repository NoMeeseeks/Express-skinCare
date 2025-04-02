# Express-skinCare

Express-skinCare es un proyecto basado en Node.js con Express y Sequelize como ORM para manejar una base de datos PostgreSQL.

## Paso 1: Instalación de Dependencias

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

## Paso 2: Configuración de la Base de Datos

1. Edita el archivo `config/config.json` y asegúrate de que la configuración de la base de datos sea correcta.
2. Crea la base de datos utilizando el siguiente comando:
   ```sh
   npx sequelize db:create
   ```

## Paso 3: Crear un Modelo

Para crear un modelo llamado `foto`, ejecuta:
```sh
npx sequelize model:generate --name foto --attributes titulo:string,descripcion:string,calificacion:float,ruta:string
```

## Paso 4: Ejecutar Migraciones

1. Para ejecutar todas las migraciones y sincronizar la base de datos:
   ```sh
   npx sequelize db:migrate
   ```

2. Para revertir todas las migraciones:
   ```sh
   npx sequelize db:migrate:undo
   ```

3. Para revertir una migración específica, usa el nombre de la migración:
   ```sh
   npx sequelize db:migrate:undo --to XXXXXXXXXXXXXX-create-TABLE.js
   ```

## Paso 5: Crear Datos de Prueba con Seeders

1. Genera un seeder para insertar datos en la base de datos:
   ```sh
   npx sequelize seed:generate --name fotos
   ```

2. Para ejecutar un seeder específico:
   ```sh
   npx sequelize db:seed --seed YYYYMMDDHHMMSS-fotos
   ```

3. Para ejecutar todos los seeders:
   ```sh
   npx sequelize db:seed:all
   ```

4. Para deshacer todos los seeders:
   ```sh
   npx sequelize db:seed:undo:all
   ```
## Paso 6: Ejecutar la base de datos

Para iniciar la base, ejecuta:
```sh
docker-compose up -d
```
## Paso 7: Ejecutar el Servidor Express

Para iniciar el servidor, ejecuta:
```sh
npm start
```

Este proyecto está diseñado para facilitar la gestión de una base de datos PostgreSQL con Sequelize en un entorno Express.

