const express = require("express");
const socketio = require("socket.io");
const http = require("http");
const morgan = require("morgan");
const cors = require("cors");
const router = require("./router");

const PORT = process.env.PORT || 5000;

const app = express();

app.use(function (req, res, next) {
  res.header(
    "Access-Control-Allow-Origin",
    "https://www.differentServerDomain.fr https://www.differentServerDomain.fr"
  );
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});

app.use(cors());
//middeware
app.use(morgan("dev"));
const httpServer = http.createServer(app);
const io = socketio(httpServer);

io.on("connection", (socket) => {
  console.log("We have a new connection!!!");

  socket.on("join", ({ name, room }, err) => {
    console.log(name, room);
  });

  socket.on("disconnect", () => {
    console.log("User had left!!!");
  });
});
app.use(router);

httpServer.listen(PORT, () => {
  console.log(`Server has started on port ${PORT}`);
});
