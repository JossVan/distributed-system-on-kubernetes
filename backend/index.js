var WSServer = require('ws').Server,
  wss = new WSServer({port:8080});

wss.on('connection', function (socket) { 
  socket.on('message', function (msg) {
    console.log('Recibido: ', msg, '\n', 'Desde la IP: ', socket.upgradeReq.connection.remoteAddress);
    socket.send('Si funciona!');
  });
   socket.on('close', function (code, desc) {
    console.log('Desconectado: ' + code + ' - ' + desc);
  });
});