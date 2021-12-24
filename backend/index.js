'use strict';
const express = require('express');
const app = express();
const path = require('path');
const morgan = require('morgan');
const ios =require('socket.io');
const db = require("./config/db")

const io = new ios.Server({
    allowEIO3: true,
    cors: {
        origin : true,
        credentials: true
    },
});


const port = process.env.PORT || 8080;

// 1. Morgan middleware for logging
app.use(morgan('dev'));

// 2. Express static index.html file
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

// 6. Socket.io configuration
io.on('connection', (socket) => {
  console.log('Dispositivo conectado');

  socket.on('new-message', (data) => {
    console.log('Message has been received!', data);

    io.emit('message-received', {
      message: data
    });

  });

  socket.on('disconnect', () => {
    console.log('Dispositivo desconectado');

    socket.emit('user-disconnected', () => {

    });
  });
});
console.log("buenas")
// 7. Run the server
io.listen(port, () => {
  console.log('Servidor activo en puerto: %d', port);
});

