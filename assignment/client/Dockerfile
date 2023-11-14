FROM node:18-alpine

WORKDIR /client

COPY package.json ./
COPY package-lock.json ./
RUN apk add --update python3 make g++\
   && rm -rf /var/cache/apk/*
RUN npm install

COPY . .

CMD ["npm", "start"]