FROM node:18-alpine

WORKDIR /client

COPY package.json ./
COPY package-lock.json ./
RUN npm install

copy . .

CMD ["npm", "start"]