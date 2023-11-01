# Stage 1: Construir la aplicacion Node.js 
FROM node:18.18.0 AS build

# Establece el directorio de trabajo dentro del contenedor
WORKDIR /app

# Copiar los archivos del proyecto del cliente de Angular al directorio de trabajo del contenedor
COPY package.json package-lock.json ./

# Instala las dependencias del proyecto
RUN npm ci

# Copia el resto de los archivos del proyecto del cliente de Angular al directorio de trabajo del contenedor
COPY . .

# Compila el proyecto del cliente de Angular
RUN npm run build

# STAGE 2: run
FROM nginx
COPY --from=build /app/dist/frontend /usr/share/nginx/html
COPY --from=build /app/nginx.conf /etc/nginx/conf.d/default.conf