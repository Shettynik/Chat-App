const express = require("express");
const socket = require("socket.io");

const app = express();

app.use(express.static("public"));
app.use(express.json());

const server = app.listen(3000, () => {
    console.log("Server is up and running on port 3000");
});

// ==============================SOCKET SETUP============================
var io = socket(server);
io.on("connection", function(socket){
    // console.log(socket.id)

    socket.on("chat", function(data){
        // console.log(data);
        // ================EMITTING THE DATA TO ALL THE SOCKETS=====================
        io.sockets.emit("chat", data);
    });

    socket.on("typing", function(data){
        socket.broadcast.emit("typing", data);
    });
});