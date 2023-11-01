# Stage 1: Construir la aplicacion Node.js 
FROM node:18.18.0

# Establece el directorio de trabajo dentro del contenedor
WORKDIR /cloud_arch_fronted

# Copiar los archivos del proyecto del cliente de Nodejs al directorio de trabajo del contenedor
COPY package.json .
COPY package-lock.json .

# Instala las dependencias del proyecto
RUN npm ci
# Copia el resto de los archivos del proyecto del cliente de Nodejs al directorio de trabajo del contenedor
COPY . .

# Ejecuta el proyecto del cliente Nodejs
CMD npm start


