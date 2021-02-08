import { io } from 'socket.io-client';

const serverUrl = 'http://localhost:3001';

export default function () {
  const socket = io(serverUrl);

  function joinRoom({ username, room }) {
    socket.emit('joinRoom', { username, room });
  }

  function sendMessage({ username, room, message }) {
    socket.emit('message', { username, room, message });
  }

  function listenMessage(message) {
    socket.on('message', message);
  }

  function stopListening() {
    socket.off('message');
  }

  return {
    joinRoom,
    sendMessage,
    listenMessage,
    stopListening
  };
}
