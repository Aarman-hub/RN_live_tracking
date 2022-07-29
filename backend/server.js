require('dotenv').config();
const express = require('express');
const socketIo = require('socket.io');


const app = express();

const port = process.env.PORT || 8000

const server = app.listen(port, ()=>{
   console.log(`Listining on ${port}`); 
});

const socketHandler = socketIo(server);


socketHandler.on("connection", (socket)=>{
    socket.on('connect_error',()=>{
        console.log('Connection Error');
    });
    socket.on("disconnect", ()=>{
        console.log("Disconnected");
    });
    console.log("Client conected")
    socket.emit("crypto","Hello Crypto")
});