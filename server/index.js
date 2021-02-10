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

//Yelp API calls
app.get("/api/yelp/search/:location/:category", (req, res, next) => {
  const {location, category} = req.params;
  if(!location || !category){
    throw new ClientError(400, "location and category are required fields");
  }
  yelp.getYelpBusinesses(location, category)
      .then(res => {
        //Change later, using 1 for testing purposes
        console.log("test", res[0]);
      })
      .catch(err => next(err));
});

// Chat room server
// Socket being a client
// io is the server
const rooms = [];
const socketIds = [];
io.on('connection', socket => {

  socket.on('joinRoom', ({ username, room }) => {
    socketIds.push({
      socketId: socket.id,
      username,
      room
    });

    if (!rooms[room]) {
      rooms[room] = [username];
    } else {
      rooms[room].push(username);
    }

    const messageToClient = {
      message: `${username} joined room ${room}`,
      users: rooms[room]
    };

    socket.join(room);
    io.to(room)
      .emit('message', messageToClient);
  });

  // What we should do for messages
  // Add history later
  // socket.on('message', ({ username, room, message }) => {
  socket.on('message', messageFromClient => {
    const { username, message, room } = messageFromClient;

    const messageToClient = {
      message: `${username}: ${message}`
    };
    io.to(room)
      .emit('message', messageToClient);
  });

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
    io.emit('message', messageToClient);
  });

});

app.use(errorMiddleware);

http.listen(process.env.PORT, () => {
  // eslint-disable-next-line no-console
  console.log(`express server listening on port ${process.env.PORT}`);
});
