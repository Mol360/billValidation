FROM node:16.3.0-alpine
WORKDIR /usr/app
COPY package.json .
RUN npm install -g nodemon && npm install
COPY . .