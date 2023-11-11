# CloudArch

CloudArch es un sistema de gestión de archivos en la nube. La nube es utilizada para enviar información entre los propios empleados de la empresa.

# Tecnologías utilizadas

 - [NodeJS](https://nodejs.org/en)
 - [Angular](https://angular.io/guide/setup-local)
 - [MongoDB](https://www.mongodb.com/docs/manual/tutorial/install-mongodb-on-ubuntu/)
 - [Docker](https://docs.docker.com/engine/install/ubuntu/)
 

# Ejecutar

## Modo desarrollador

### Base de datos
Ejecutar  en MongoDB Shell el script que se encuentra en el directorio 
>  **/Backend/src/database**

### Backend
En el directorio Backend ejecutar el siguiente comando:

> **npm run dev**

### Frontend
En el directorio Frontend ejecutar el siguiente comando:

> **npm run start**

## Dockerizado

### Comando para ejecutar
En el directorio raíz ejecutar el siguiente comando:

> **docker compose up --build**

### Comando para detener
En el directorio raíz ejecutar el siguiente comando:
> **docker compose down**

