# Matching service

> Sockets are implemented through Socket.io.

## 1. Events from Client

### findMatch

> Format: `socket.emit("findMatch", {socketId, complexity, time, token})`

Signals to the server that the client trying to find a match. `socketId` is the id of the client's socket, `complexity` is the user's selected complexity and `time` is the timestamp of finding a match. `token` is the user's JWT token received from the user service when logging in.

### cancel

Format: `socket.emit("cancel", socketId)`

Signals to the server that the client has cancelled finding a match. `socketId` is the id of the client's socket.

## 2. Events from Server

### matchFound

> Format: `socket.on("matchFound", ({roomName, questionId}) => {# function})`

`roomName` is a string of the name of the room and `questionId` is the identifier for the question to be worked on.

## 3. How to use?

- If running for the first time run `npm install`.

- Run `nodemon index.js` to start server using **nodemon**. Make sure port `8080` is available.

You will see

```
[nodemon] 3.0.1
[nodemon] to restart at any time, enter `rs`
[nodemon] watching path(s): *.*
[nodemon] watching extensions: js,mjs,cjs,json
[nodemon] starting `node index.js`
server running at http://localhost:8080
```

- Alternatively, if **nodemon** is not installed, `node index.js` can be run to start the server with node.
