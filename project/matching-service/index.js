const axios = require('axios').default;
const express = require('express');
const { createServer } = require('node:http');
const { Server } = require('socket.io');
const { jwtDecode } = require('jwt-decode');

const clientUrl =
  process.env.CLIENT_URL || "http://localhost:3000";

const questionsApi = 
  process.env.QUESTIONS_API_URL || "http://localhost:8888/questions"

const usersApi = 
  process.env.USERS_API_URL || "http://localhost:5100/user"

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
  let questionId = 1;
  token1 = jwtDecode(user1)?.sub;
  token2 = jwtDecode(user2)?.sub;
  const { data } = await axios.get(`${questionsApi}/complexity/${complexity}`);
  const questions = data.questions;
  questionId = questions[Math.floor(Math.random()*questions.length)].question_id;
  return questionId;
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