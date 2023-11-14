const express = require('express');
const { createServer } = require('node:http');
const { Server } = require('socket.io');

const clientUrl =
  process.env.CLIENT_URL || "http://localhost:3000";

const app = express();
const server = createServer(app);
const io = new Server(server, {
  cors: {
    origin: clientUrl,
    methods: ["GET", "POST"]
  }
});

io.on("connection", (socket) => {
  socket.on("joinRoom", (roomName) => {
    socket.join(roomName)
  });

  socket.on("sendCode", (roomName, code) => {
    if (io.sockets.adapter.rooms.get(roomName).size == 1) {
      io.to(roomName).emit("warnDisconnect");
    }
    socket.broadcast.to(roomName).emit("updateCode", code);
  })
});

server.listen(8081, () => {
  console.log('server running at http://localhost:8081');
});