const io = require('socket.io')(3000);

const users = {}

io.on('connection', socket => { 

    socket.on('new-user', name => {
        if (name != null) {
            users[socket.id] = name;
            socket.broadcast.emit('new-user-connected', name);
        }
    });

    socket.on('disconnect', () => {
        if (users[socket.id] != null) {
            socket.broadcast.emit('user-disconnected', users[socket.id]);
        }
    });

    socket.on('send-msg', data => {
        socket.broadcast.emit("user-msg", data);
    })
});
