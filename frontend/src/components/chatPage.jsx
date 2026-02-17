import React, { useState, useRef, useEffect } from "react";
import Right from "./doubtChatPage/RightPart/right.jsx";
import Left from "./doubtChatPage/LeftPart/left.jsx";
import { motion, AnimatePresence } from "framer-motion";
import { io } from "socket.io-client";
import { socket } from "./socket";
import { useParams } from "react-router-dom";
import styles from "../style/videoMeetPage.module.css";
import { IconButton } from "@mui/material";
import { SendIcon } from "lucide-react";
import { TextField } from "@mui/material";
import server from "../../production";

const server_url = server;

export default function ChatPage() {
  // const [messages, setMessages] = useState([]);
  // const [message, setMessage] = useState("");
  var socketRef = useRef();
  let socketIdRef = useRef();
  const id = useParams();
  let [messages, setMessages] = useState([]);
  let [message, setMessage] = useState("");
  let [newMessages, setNewMessages] = useState(3);
  let username = localStorage.getItem("user");

  useEffect(() => {
    // socketRef.current = io.connect(server_url, { secure: false });
    connectToSocketServer();
    console.log(message);

    // socketRef.current.on("chat-message", addMessage);
    // socket.on("chat-message", (msg) => {
    //   setMessages((prev) => [...prev, msg]);
    // });
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(message);

    socketRef.current.emit("chat-message", message);
    setMessage("");
  };

  let sendMessage = () => {
    // console.log(socketRef.current);
    socketRef.current.emit("chat-message", message, username);
    setMessage("");

    // this.setState({ message: "", sender: username })
  };

  const addMessage = (data, sender, socketIdSender) => {
    setMessages((prevMessages) => [
      ...prevMessages,
      { sender: sender, data: data },
    ]);
    console.log(messages);

    if (socketIdSender !== socketIdRef.current) {
      setNewMessages((prevNewMessages) => prevNewMessages + 1);
    }
  };

  let gotMessageFromServer = (fromId, message) => {
    var signal = JSON.parse(message);

    if (fromId !== socketIdRef.current) {
      if (signal.sdp) {
        connections[fromId]
          .setRemoteDescription(new RTCSessionDescription(signal.sdp))
          .then(() => {
            if (signal.sdp.type === "offer") {
              connections[fromId]
                .createAnswer()
                .then((description) => {
                  connections[fromId]
                    .setLocalDescription(description)
                    .then(() => {
                      socketRef.current.emit(
                        "signal",
                        fromId,
                        JSON.stringify({
                          sdp: connections[fromId].localDescription,
                        }),
                      );
                    })
                    .catch((e) => console.log(e));
                })
                .catch((e) => console.log(e));
            }
          })
          .catch((e) => console.log(e));
      }

      if (signal.ice) {
        connections[fromId]
          .addIceCandidate(new RTCIceCandidate(signal.ice))
          .catch((e) => console.log(e));
      }
    }
  };

  let connectToSocketServer = () => {
    socketRef.current = io.connect(server_url, { secure: false });

    socketRef.current.on("signal", gotMessageFromServer);

    socketRef.current.on("connect", () => {
      // socketRef.current.emit("join-call", window.location.href);
      // socketIdRef.current = socketRef.current.id;

      socketRef.current.on("chat-message", addMessage);

      // socketRef.current.on("user-left", (id) => {
      //   setVideos((videos) => videos.filter((video) => video.socketId !== id));
      // });

      socketRef.current.on("user-joined", (id, clients) => {
        clients.forEach((socketListId) => {
          connections[socketListId] = new RTCPeerConnection(
            peerConfigConnections,
          );
          // Wait for their ice candidate
          connections[socketListId].onicecandidate = function (event) {
            if (event.candidate != null) {
              socketRef.current.emit(
                "signal",
                socketListId,
                JSON.stringify({ ice: event.candidate }),
              );
            }
          };

          // Wait for their video stream
          // connections[socketListId].onaddstream = (event) => {
          //   console.log("BEFORE:", videoRef.current);
          //   console.log("FINDING ID: ", socketListId);

          //   let videoExists = videoRef.current.find(
          //     (video) => video.socketId === socketListId
          //   );

          //   if (videoExists) {
          //     console.log("FOUND EXISTING");

          //     // Update the stream of the existing video
          //     setVideos((videos) => {
          //       const updatedVideos = videos.map((video) =>
          //         video.socketId === socketListId
          //           ? { ...video, stream: event.stream }
          //           : video
          //       );
          //       videoRef.current = updatedVideos;
          //       return updatedVideos;
          //     });
          //   } else {
          //     // Create a new video
          //     console.log("CREATING NEW");
          //     let newVideo = {
          //       socketId: socketListId,
          //       stream: event.stream,
          //       autoplay: true,
          //       playsinline: true,
          //       username,
          //     };
          //     console.log(newVideo);
          //     setVideos((videos) => {
          //       const updatedVideos = [...videos, newVideo];
          //       videoRef.current = updatedVideos;
          //       return updatedVideos;
          //     });
          //   }
          // };

          // Add the local video stream
          // if (window.localStream !== undefined && window.localStream !== null) {
          //   connections[socketListId].addStream(window.localStream);
          // } else {
          //   let blackSilence = (...args) =>
          //     new MediaStream([black(...args), silence()]);
          //   window.localStream = blackSilence();
          //   connections[socketListId].addStream(window.localStream);
          // }
        });

        // if (id === socketIdRef.current) {
        //   for (let id2 in connections) {
        //     if (id2 === socketIdRef.current) continue;

        //     try {
        //       connections[id2].addStream(window.localStream);
        //     } catch (e) {}

        //     connections[id2].createOffer().then((description) => {
        //       connections[id2]
        //         .setLocalDescription(description)
        //         .then(() => {
        //           socketRef.current.emit(
        //             "signal",
        //             id2,
        //             JSON.stringify({ sdp: connections[id2].localDescription })
        //           );
        //         })
        //         .catch((e) => console.log(e));
        //     });
        //   }
        // }
      });
    });
  };

  return (
    // <>
    //   <ul>
    //     {messages.map((msg, i) => (
    //       <li key={i}>{msg}</li>
    //     ))}
    //   </ul>
    //   <form id="form" onSubmit={handleSubmit}>
    //     <input
    //       type="text"
    //       value={message}
    //       onChange={(e) => setMessage(e.target.value)}
    //     />
    //     <button type="submit">Send</button>
    //   </form>
    // </>

        <div className="flex">
          <div className="w-[30%]">< Left /></div>
          <div className="w-[70%]"><Right/></div>
        </div>

    // <div className="drawer lg:drawer-open">
    //   {/* <input id="my-drawer-2" type="checkbox" className="drawer-toggle" /> */}
    //   <div className="drawer-content flex flex-col items-center justify-center">
    //     <Right />
    //   </div>
    //   <div className="drawer-side">
    //     <label
    //       htmlFor="my-drawer-2"
    //       aria-label="close sidebar"
    //       className="drawer-overlay"
    //     ></label>
    //     <ul className="menu w-80 min-h-full bg-black text-base-content">
    //       <Left />
    //     </ul>
    //   </div>
    // </div>
    // )}
    // </div>
  );
}
