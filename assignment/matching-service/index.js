const axios = require('axios').default;
const express = require('express');
const { createServer } = require('node:http');
const { Server } = require('socket.io');

const clientUrl =
  process.env.CLIENT_URL || "http://localhost:3000";

const questionsApi = 
  process.env.QUESTIONS_API_URL || "http://localhost:8888/questions"

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

function getQuestionId(complexity) {
  let questionId = 1
  axios.get(`${questionsApi}/complexity/${complexity}`)
  .then((response) => {
    const { data } = response;
    questionId = data[Math.floor(Math.random()*data.length)].id;
  })
  .catch((error) => {
    console.log(error);
  });
  return questionId;
}

io.on("connection", (socket) => {
  socket.on("findMatch", (match) => {
    console.log("Before:")
      console.log(matchingDict);
    complexity = match.complexity;
    if (matchingDict[complexity] == null || matchingDict[complexity].time <= new Date().getTime() - 30000 || matchingDict[complexity].identifier == match.identifier) {
      matchingDict[complexity] = match;
      console.log("Added to queue:")
      console.log(matchingDict);
    } else {
      const roomName = Math.random().toString(); // ~56 bits of entropy
      let questionId = getQuestionId(complexity);
      let message = {roomName: roomName, questionId: questionId};
      io.to(matchingDict[complexity].socketId).emit("matchFound", message);
      io.to(match.socketId).emit("matchFound", message);
      matchingDict[complexity] = null;
      console.log("Matched:")
      console.log(matchingDict);
    }
  });

  socket.on("cancel", (id) => {
    for (let property in matchingDict) {
      if (matchingDict[property]?.identifier == id) {
        matchingDict[property] = null;
        console.log("After cancelling:")
        console.log(matchingDict);
      }
    }
  })
});

server.listen(8080, () => {
  console.log('server running at http://localhost:8080');
});