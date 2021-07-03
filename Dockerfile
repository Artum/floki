FROM node:14.17-alpine

WORKDIR /app

ENV PATH /app/node_moduels/.bin:$PATH

COPY package.json ./
COPY package-lock.json ./
RUN npm install


COPY . ./


CMD ["npm", "start"]