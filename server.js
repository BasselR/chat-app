var express = require('express');
var app = express();
var server = require('http').createServer(app);
var io = require('socket.io')(server);
var path = require('path');

const PORT = process.env.PORT || 3050;

var nicknames = {};

// Static folder route
app.use(express.static(path.join(__dirname, 'public')));

io.on('connection', (socket) => {
    console.log(`socket id ${socket.id} connected`);
    socket.on('disconnect', () => {
      console.log(`socket id ${socket.id} disconnected`);
    });
    socket.on('set nickname', nick => {
      nicknames[socket.id] = nick;
      console.log(`socket id ${socket.id} set nickname to ${nick}`)
    });
    socket.on('chat message', msg => {
      let fullMsg = nicknames[socket.id] + ": " + msg;
      io.emit('chat message', fullMsg);
      console.log(`socket id ${socket.id} (${nicknames[socket.id]}) sent msg: ${msg}`);
    });
});

server.listen(PORT, () => {
  console.log(`listening on port: ${PORT}`);
});