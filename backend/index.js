'use strict';
const express = require('express');
const app = express();
const http = require("http").Server(app)
const path = require('path');
const morgan = require('morgan');
const cors = require('cors')

const consultas = require('./config/consultas');

app.use(cors())

const ios = require('socket.io')(http, {
  cors: {
    origins: ["http://localhost:4200"] //ruta del frontend
  }
});

const port = process.env.PORT || 8080;

// 1. Morgan middleware for logging
app.use(morgan('dev'));

// 2. Express static index.html file
app.get('/', (req, res) => {
  //res.sendFile(path.join(__dirname, 'index.html'));
  res.send("<h1>Server</h1>")
});

// 6. Socket.io configuration
ios.on('connection', (socket) => {
  console.log('Socket conectado');
  
  // consulta 1
  setInterval(async() => {
    consultas.consulta1().then( val => {
      socket.emit('result1', val)
    })
  }, 3000);

  // consulta 2
  setInterval(async() => {
    consultas.consulta2().then(val => {
      socket.emit('result2', val)
    })
  }, 3000);

  // consulta 3
  setInterval(async() => {
    consultas.consulta3().then(val => {
      socket.emit('result3', val)
    })
  }, 3000);

  // consulta 4
  setInterval(async() => {
    consultas.consulta4().then(val => {
      socket.emit('result4', val)
    })
  }, 3000);

  // consulta 5
  setInterval(async() => {
    consultas.consulta5().then(val=>{
      socket.emit('result5', val)
    })
  }, 3000);

  // consulta 6
  setInterval(async() => {
    consultas.consulta6().then(val=>{
      //console.log(val)
      socket.emit('result6', val)
    })
  }, 3000);

});


// 7. Run the server
http.listen(port, () => {
  console.log('Servidor activo en puerto: %d', port)
})
