# Collaboration service

> Sockets are implemented through Socket.io.

## 1. Events from Client

### joinRoom

> Format: `socket.emit("joinRoom", roomName)`

Adds the client to a room using a string `roomName`.

### sendCode

Format: `socket.emit("sendCode", roomName, code)`

Sends the string `code` to the server to be broadcasted to all other sockets in the rooms with name `roomName`. Used for updating the editor for other collaborators.

### sendMessage

Format: `socket.emit("sendMessage", roomName, message)`

Sends the string `message` to the server to be broadcasted to all other sockets in the rooms with name `roomName`. Used for sending chat messages to the other collaborator.

### sendLanguage

Format: `socket.emit("sendLanguage", roomName, language)`

Sends the string `language` to the server to be broadcasted to all other sockets in the rooms with name `roomName`. Used for updating editor language for the collaborators.

### sendConsole

Format: `socket.emit("sendConsole", roomName, console)`

Sends the string `console` to the server to be broadcasted to all other sockets in the rooms with name `roomName`. Used for sending results of code execution to other collaborators.

## 2. Events from Server

### updateCode

> Format: `socket.on("updateCode", (code) => {# function})`

Allows the client to run the function when the code has been updated by another user in the same room.

### updateCode

> Format: `socket.on("receiveMessage", (message) => {# function})`

Allows the client to run the function when the message has been received from another user in the same room.

### updateCode

> Format: `socket.on("updateLanguage", (language) => {# function})`

Allows the client to run the function when the language has been updated by another user in the same room.

### updateCode

> Format: `socket.on("updateConsole", (console) => {# function})`

Allows the client to run the function when the console has been provided by another user in the same room.

## 3. How to use?

- If running for the first time run `npm install`.

- Run `nodemon index.js` to start server using **nodemon**. Make sure port `8081` is available.

You will see

```
[nodemon] 3.0.1
[nodemon] to restart at any time, enter `rs`
[nodemon] watching path(s): *.*
[nodemon] watching extensions: js,mjs,cjs,json
[nodemon] starting `node index.js`
server running at http://localhost:8081
```

- Alternatively, if **nodemon** is not installed, `node index.js` can be run to start the server with node.
