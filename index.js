var app = require('express')();
var http = require('http').createServer(app);
var io = require('socket.io')(http);

var nicknames = {};

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html');
});

io.on('connection', (socket) => {
    console.log('a user connected');
    socket.on('disconnect', () => {
      console.log('user disconnected');
    });
    socket.on('set nickname', nick => {
      nicknames[socket.id] = nick;
    });
    socket.on('chat message', msg => {
      let fullMsg = nicknames[socket.id] + ": " + msg;
      io.emit('chat message', fullMsg);
    });
});

const PORT = process.env.PORT || 3050;

http.listen(PORT, () => {
  console.log(`listening on *:${PORT}`);
});