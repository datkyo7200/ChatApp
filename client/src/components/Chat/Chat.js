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
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);

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

  useEffect(() => {
    socket.on("messgae", (message) => {
      setMessages([...messages, message]);
    });
  }, [messages]);

  const sendMessage = (event) => {
    event.preventDefault();

    if (message) {
      socket.emit("sendMessage", message, () => setMessage(""));
    }
  };
  console.log(message, messages);

  return (
    <div className="outerContainer">
      <div className="container">
        <input
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          onKeyPress={(e) => (e.key === "Enter" ? sendMessage(e) : null)}
        />
      </div>
    </div>
  );
};

export default Chat;
