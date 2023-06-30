const { Server } = require('socket.io');
const express = require('express');
const http = require('http');
const PORT = 3333;
const app = express();
const cors = require('cors');

app.use(cors());
const server = http.createServer(app);

const io = require('socket.io')(server, {
  cors: {
    origin: '*',
  },
});

io.on('connection', (socket) => {
  socket.on('joinRoom', (roomName) => {
    socket.join(roomName);
  });

  // Handle incoming messages
  socket.on('message', (data) => {
    // Broadcast the message to all connected clients in the relevant group
    io.to(data.room).emit('response', data.message);
  });

  // Handle disconnections
  socket.on('disconnect', () => {
    console.log('A user disconnected');
  });
});

server.listen(PORT, () => {
  console.log(`Websocket Server listening on port ${PORT}`);
});

module.exports = server;
