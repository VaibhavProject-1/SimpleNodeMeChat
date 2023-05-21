//IO Socket Handler
const io = require("socket.io")(8000)
const express = require('express');
const app = express();
const cors = require('cors');

app.use(cors());

const users = {};

io.on('connection',socket =>{
    //Called on new user joining
    socket.on('new-user-joined',name =>{
        //console.log("New User", name)   For testing
        users[socket.id] = name;
        socket.broadcast.emit('user-joined',name);
        socket.emit('user-joined', name);//Added after blank error
    })

    //Called on new message
    socket.on('send',message =>{
        socket.broadcast.emit('receive',{message:message, name:users[socket.id]})
    });


    //Called on disconnect
    socket.on('disconnect',name =>{
        socket.broadcast.emit('left',users[socket.id]);
        delete users[socket.id];
    });
})