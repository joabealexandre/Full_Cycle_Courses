FROM node:18.20.4

WORKDIR /usr/src/app

COPY package.json .

RUN npm install --quiet

COPY . .

EXPOSE 3000