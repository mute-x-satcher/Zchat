const io = require('socket.io')(7620,{
    cors:
    {
       origin: ['https://zchat-new.onrender.com'] 
    }
});
    const users = {};  
    io.on('connection', socket => {
    socket.on('new-user-joined', name => {
        //console.log("new user:",name);
        users[socket.id] = name;
        socket.broadcast.emit('user-joined', name);
    
    });

    socket.on('send', message => {
        socket.broadcast.emit('receive', { message: message, name: users[socket.id] });
    });

    socket.on('disconnect', name =>
    {
            socket.broadcast.emit('leave', users[socket.id] );    
            delete users[socket.id];
    })
    


});

    
