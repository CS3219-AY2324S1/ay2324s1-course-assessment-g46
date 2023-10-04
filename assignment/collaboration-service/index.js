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

io.on("connection", (socket) => {
  socket.on("joinRoom", (roomName) => {
    socket.join(roomName)
  });

  socket.on("sendCode", (roomName, code) => {
    io.to(roomName).emit("updateCode", code);
  })
});

server.listen(8081, () => {
  console.log('server running at http://localhost:8081');
});