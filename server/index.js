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
io.on('connection', socket => {

  socket.on('username', username => {
    socket.username = username;
    io.emit('is_online', `${socket.username} join the chat...`);
  });

  socket.on('message', (msg, username) => {

    // console.log(msg, username);
    io.emit('message', msg, username);
  });

  socket.on('disconnect', socket => {
    io.emit('is_online', `${socket.username} left the chat...`);
  });

});

http.listen(process.env.PORT, () => {
  // eslint-disable-next-line no-console
  console.log(`express server listening on port ${process.env.PORT}`);
});
