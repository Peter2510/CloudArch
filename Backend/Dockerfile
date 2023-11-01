FROM node:18.18.0

WORKDIR /cloud_arch_fronted
COPY package.json .
COPY package-lock.json .
RUN npm install

COPY . .
CMD npm start


