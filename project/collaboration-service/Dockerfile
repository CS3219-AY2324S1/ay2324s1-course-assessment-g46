FROM node:18
WORKDIR /collaborationApp

COPY package*.json ./
RUN npm install

COPY . .
EXPOSE 8081
CMD [ "node", "index.js" ]