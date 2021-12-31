FROM node:lts-alpine

# Creamos un directorio de trabajo
WORKDIR /usr/src/app

# Instalamos las dependencias que se encuentran en el node_modules
COPY package*.json ./

RUN npm install
RUN apt update && apt install -y iputils-ping
COPY . .

EXPOSE 8080
CMD [ "node", "index.js" ]