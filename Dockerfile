FROM node

WORKDIR /usr/src/app

COPY package.json ./

RUN npm install

COPY . .

EXPOSE 9000

cmd [ "node", "server.js" ]