const express = require("express");
const socketio = require("socket.io");
const http = require("http");
const router = require("./router");

const PORT = process.env.PORT || 5000;

const app = express();
const httpServer = http.createServer(app);
const io = socketio(httpServer);

io.on("connection", (socket) => {
    console.log("We have a new connection!!!");

    socket.on("disconnect", () => {
        console.log("User had left!!!");
    });
});
app.use(router);

httpServer.listen(PORT, () => {
    console.log(`Server has started on port ${PORT}`);
});
