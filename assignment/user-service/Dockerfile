FROM node:18
WORKDIR /userApp

COPY package*.json ./
RUN npm install

COPY . .
EXPOSE 5000
CMD [ "node", "index.js" ]