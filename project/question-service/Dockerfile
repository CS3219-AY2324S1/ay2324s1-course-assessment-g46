FROM node:18
WORKDIR /questionApp

COPY package*.json ./
RUN npm install

COPY . .
EXPOSE 8888
CMD [ "node", "server.js" ]