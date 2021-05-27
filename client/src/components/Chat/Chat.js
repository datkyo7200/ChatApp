import React, { useEffect, useState } from "react";
import queryString from "query-string";
import io from "socket.io-client";
import "./Chat.css";

const ENDPOINT = "localhost:5000";
let socket = io(ENDPOINT, {
  transports: ["websocket", "polling", "flashsocket"],
});

const Chat = ({ location }) => {
  const [name, setName] = useState("");
  const [room, setRoom] = useState("");

  useEffect(() => {
    const { name, room } = queryString.parse(location.search);

    setName(name);
    setRoom(room);
    console.log(socket);
    socket.emit("join", { name, room }, () => {});
    return () => {
      socket.emit("disconnect");

      socket.off();
    };
  }, [ENDPOINT, location.search]);
  return <div>Chat</div>;
};

export default Chat;
