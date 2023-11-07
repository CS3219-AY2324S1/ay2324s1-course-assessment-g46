const axios = require('axios').default;
const express = require('express');
const { createServer } = require('node:http');
const { Server } = require('socket.io');
const { getQuestionAttempts, getQuestionIds } = require('./api/userApi');

const clientUrl =
  process.env.CLIENT_URL || "http://34.123.170.74:3000";

const app = express();
const server = createServer(app);
const io = new Server(server, {
  cors: {
    origin: clientUrl,
    methods: ["GET", "POST"]
  }
});

let matchingDict = {
  "Easy": null,
  "Medium": null,
  "Hard": null
};

async function getQuestionId(complexity, user1, user2) {
  const questionIds = await getQuestionIds(complexity)
  const user1Set = await getQuestionAttempts(user1);
  const user2Set = await getQuestionAttempts(user2);
  let availableIds = [];
  for (let index in questionIds) {
    const id = questionIds[index];
    if (user1Set.has(id) || user2Set.has(id)) {
      continue;
    }
    availableIds.push(id);
  }
  if (availableIds.length > 0) {
    return availableIds[Math.floor(Math.random()*availableIds.length)];
  }
  return questionIds[Math.floor(Math.random()*questionIds.length)]; // no available questions
}

io.on("connection", (socket) => {
  socket.on("findMatch", async (match) => {
    complexity = match.complexity;
    if (matchingDict[complexity] == null || matchingDict[complexity].time <= new Date().getTime() - 30000 || matchingDict[complexity].token == match.token) {
      matchingDict[complexity] = match;
    } else {
      const roomName = Math.random().toString(); // ~56 bits of entropy
      let questionId = await getQuestionId(complexity, match.token, matchingDict[complexity].token);
      let message = {roomName: roomName, questionId: questionId};
      io.to(matchingDict[complexity].socketId).emit("matchFound", message);
      io.to(match.socketId).emit("matchFound", message);
      matchingDict[complexity] = null;
    }
  });

  socket.on("cancel", (id) => {
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