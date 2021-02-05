import { io } from 'socket.io-client';

const serverUrl = "http://localhost:3001";


const client = ({username, room}) => {
  const socket = io(serverUrl);

  //When creating a client, send a message to the server with username, room
  socket.emit('joinRoom', {username, room});

  //Listening for a message called 'message'
  socket.on('message', (message) => {
    console.log("FROM SERVER,", message);
  });

  //Listening for a leaveRoom message to print who left on chat history
  socket.on('leaveRoom', msg => {
    console.log(msg);
  })
}

export default client;
