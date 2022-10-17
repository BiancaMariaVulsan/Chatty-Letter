let express = require('express')
let app = express();

let http = require('http');
let server = http.Server(app);

let socketIO = require('socket.io');
var io = socketIO(server);

const port = process.env.PORT || 3000;

server.listen(port, () => {
    console.log(`started on port: ${port}`);
});

io.on('connection', function (socket) {
    console.log('user connected');

    socket.on('disconnect', () => {
      console.log('user disconnected');
    });

    socket.on('join', function (data) {
      socket.join(data.userid);
    });

    socket.on('new-message', function (data) {
      io.to(data.receiverid).emit('new-msg', {msg: data.msg, senderid: data.senderid, receiverid: data.receiverid});
      console.log(data.senderid);
    });
});
