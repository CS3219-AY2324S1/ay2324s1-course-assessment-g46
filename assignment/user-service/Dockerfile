FROM node:18
WORKDIR /userApp

COPY package*.json ./
RUN npm install

COPY . .
EXPOSE 5100
CMD [ "node", "index.js" ]