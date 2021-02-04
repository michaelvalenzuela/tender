import { io } from 'socket.io-client';

const socket = io('http://localhost:3001');

socket.emit('username', 'michael');

// Receive a "Message" What to do if you receive
socket.on('message', function (msg, username) {
  console.log("From server",msg,username);
});

// Receive a "is_online" message, what to do on front end
socket.on('is_online', function (msg) {
  console.log("From Server is online")
});
