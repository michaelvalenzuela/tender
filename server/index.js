require('dotenv/config');
const express = require('express');
const staticMiddleware = require('./static-middleware');

const app = express();

const http = require('http').createServer(app);
const io = require('socket.io')(http, {
  cors: {
    origin: '*'
  }
});

app.use(staticMiddleware);

// Chat room server
// Socket being a client
// io is the server
io.on('connection', socket => {

  //When a user joins a room
  socket.on('joinRoom', ({username, room}) => {
    //Hold all users later
    socket.join(room);
    io.to(room)
      .emit('message',`${username} joined room ${room}`);
  })

  socket.on('message', (msg, username) => {

    // console.log(msg, username);
    io.emit('message', msg, username);
  });

  socket.on('disconnect', (socket) => {
    io.emit('leaveRoom', `${socket} left the chat...`);
  });

});

http.listen(process.env.PORT, () => {
  // eslint-disable-next-line no-console
  console.log(`express server listening on port ${process.env.PORT}`);
});
