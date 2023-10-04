const express = require('express');
const { createServer } = require('node:http');
const { join } = require('node:path');
const { Server } = require('socket.io');

const app = express();
const server = createServer(app);
const io = new Server(server, {
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST"]
  }
});

let matchingDict = {
  "Easy": null,
  "Medium": null,
  "Hard": null
};

io.on("connection", (socket) => {
  socket.on("findMatch", (match) => {
    complexity = match.complexity;
    if (matchingDict[complexity] == null || matchingDict[complexity].time <= new Date().getTime() - 30000) {
      matchingDict[complexity] = match;
    } else {
      const roomName = Math.random().toString();
      io.to(matchingDict[complexity].socketId).emit("matchFound", roomName);
      io.to(match.socketId).emit("matchFound", roomName);
      matchingDict[complexity] = null;
    }
  });

  socket.on("timeout", (id) => {
    for (let property in matchingDict) {
      if (matchingDict[property]?.socketId == id) {
        matchingDict[property] = null;
      }
    }
  })
});

server.listen(8080, () => {
  console.log('server running at http://localhost:8080');
});