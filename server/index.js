require('dotenv/config');
const express = require('express');
const ClientError = require('./client-error'); // eslint-disable-line
const staticMiddleware = require('./static-middleware');
const errorMiddleware = require('./error-middleware');
const YelpApi = require('./yelp');

const yelp = new YelpApi(process.env.YELP_API_KEY);
const app = express();

const http = require('http').createServer(app);
const io = require('socket.io')(http, {
  cors: {
    origin: '*'
  }
});

app.use(staticMiddleware);

// Yelp API calls
app.get('/api/yelp/search/:location/:category', (req, res, next) => {
  const { location, category } = req.params;
  if (!location || !category) {
    throw new ClientError(400, 'location and category are required fields');
  }
  yelp.getYelpBusinesses(location, category)
    .then(result => {
      res.status(201).json(result);
    })
    .catch(err => next(err));
});

// Chat room server
// Socket being a client
// io is the server
// Contains a list of rooms with a list of usernames. ie rooms[abc] = [matt, me, etc]
const rooms = [];
// Contains a list of socketIds with objs referring to information regarding the id. ie socketIds[abcdkwe] = {name: michael, room: abc}
const socketIds = [];
// Contains chat history of a room. roomChatHistory['roomname'] = [all messages]
const roomChatHistory = [];
io.on('connection', socket => {

  // What to do when a socket joins the room
  socket.on('joinRoom', messageFromClient => {
    const { username, room } = messageFromClient;
    const message = `${username} joined room ${room}`;

    socketIds.push({
      socketId: socket.id,
      username,
      room
    });

    !rooms[room]
      ? rooms[room] = [username]
      : rooms[room].push(username);

    !roomChatHistory[room]
      ? roomChatHistory[room] = [message]
      : roomChatHistory[room].push(message);

    const messageToClient = {
      message,
      users: rooms[room],
      chatHistory: roomChatHistory[room]
    };

    socket.join(room);
    io.to(room)
      .emit('message', messageToClient);
  });

  // What we should do for messages
  socket.on('message', messageFromClient => {
    const { username, message, room } = messageFromClient;

    const messageToClient = {
      message: `${username}: ${message}`
    };

    roomChatHistory[room].push(messageToClient.message);

    io.to(room)
      .emit('message', messageToClient);
  });

  // What to do when a socket disconnects
  socket.on('disconnect', () => {
    const socketInfo = socketIds.find(x => x.socketId === socket.id);
    // Guard for undefined issues
    if (!socketInfo) {
      return;
    }
    const { room, username } = socketInfo;
    const index = rooms[room].indexOf(username);
    rooms[room].splice(index, 1);

    const messageToClient = {
      message: `${username} left the chat...`,
      users: rooms[room]
    };

    // Clear roomChatHistory if no users are left in a room
    !rooms[room].length
      ? roomChatHistory[room] = []
      : roomChatHistory[room].push(messageToClient.message);

    io.emit('message', messageToClient);
  });

});

app.use(errorMiddleware);

http.listen(process.env.PORT, () => {
  // eslint-disable-next-line no-console
  console.log(`express server listening on port ${process.env.PORT}`);
});
