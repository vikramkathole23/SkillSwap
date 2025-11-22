import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { io } from "socket.io-client";
import { socket } from "./socket";

export default function ChatPage() {
  const [messages, setMessages] = useState([]);
  const [message, setMessage] = useState("");

  useEffect(() => {
    socket.connect();

    socket.on("chat message", (msg) => {
      setMessages((prev) => [...prev, msg]);
    });
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    socket.emit("chat message", message);
    setMessage("");
  };


  return (
    <>
      <ul>
        {messages.map((msg, i) => (
          <li key={i}>{msg}</li>
        ))}
      </ul>
      <form id="form" onSubmit={handleSubmit}>
        <input
          type="text"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />
        <button type="submit">Send</button>
      </form>
    </>
  );
}
