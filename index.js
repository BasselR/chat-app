var app = require('express')();
var http = require('http').createServer(app);
var io = require('socket.io')(http);

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html');
});

io.on('connection', (socket) => {
    console.log('a user connected');
    socket.on('disconnect', () => {
      console.log('user disconnected');
    });
    // chat message 'bundle' object contains 'user' and 'msg'
    socket.on('chat message', (bundle) => {
        console.log("user: " + bundle.user);
        console.log("message: " + bundle.msg);
        io.emit('chat message', bundle.msg);
    });
});

const PORT = process.env.PORT || 3050;

http.listen(PORT, () => {
  console.log(`listening on *:${PORT}`);
});