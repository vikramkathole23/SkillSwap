import React, { useEffect, useRef, useState } from "react";
import io from "socket.io-client";
import { Badge, IconButton, TextField } from "@mui/material";
import { Button } from "@mui/material";
import VideocamIcon from "@mui/icons-material/Videocam";
import VideocamOffIcon from "@mui/icons-material/VideocamOff";
import styles from "../../style/videoMeetPage.module.css";
import CallEndIcon from "@mui/icons-material/CallEnd";
import MicIcon from "@mui/icons-material/Mic";
import MicOffIcon from "@mui/icons-material/MicOff";
import ScreenShareIcon from "@mui/icons-material/ScreenShare";
import StopScreenShareIcon from "@mui/icons-material/StopScreenShare";
import ChatIcon from "@mui/icons-material/Chat";
import CloseIcon from "@mui/icons-material/Close";
import SendIcon from "@mui/icons-material/Send";
import server from "../../../production";
// import server from '../environment';

const server_url = server;

var connections = {};

const peerConfigConnections = {
  iceServers: [{ urls: "stun:stun.l.google.com:19302" }],
};

export default function VideoMeetComponent() {
  var socketRef = useRef();
  let socketIdRef = useRef();

  let localVideoref = useRef();

  let messagesEndRef = useRef();

  let [videoAvailable, setVideoAvailable] = useState(true);

  let [audioAvailable, setAudioAvailable] = useState(true);

  let [video, setVideo] = useState();

  let [audio, setAudio] = useState();

  let [screen, setScreen] = useState();

  let [showModal, setModal] = useState(false);

  let [showVideoModel, setVideoModel] = useState(true);

  let [screenAvailable, setScreenAvailable] = useState();

  let [messages, setMessages] = useState([]);

  let [message, setMessage] = useState("");

  let [newMessages, setNewMessages] = useState(3);

  let [askForUsername, setAskForUsername] = useState(true);

  let [username, setUsername] = useState("");

  const videoRef = useRef([]);

  let [videos, setVideos] = useState([]);

  let [activeVideoId, setActiveVideoId] = useState("local");

  // TODO
  // if(isChrome() === false) {

  // }

  useEffect(() => {
    console.log("HELLO");
    getPermissions();
    // console.log(videoRef);
  }, []);

  let getDislayMedia = () => {
    if (screen) {
      if (navigator.mediaDevices.getDisplayMedia) {
        navigator.mediaDevices
          .getDisplayMedia({ video: true, audio: true })
          .then(getDislayMediaSuccess)
          .then((stream) => {})
          .catch((e) => console.log(e));
      }
    }
  };
  const constraints = {
    video: {
      width: { ideal: 1280 },
      height: { ideal: 720 },
    },
    audio: false, // Start with video only to simplify debugging
  };

  const getPermissions = async () => {
    try {
      const videoPermission = await navigator.mediaDevices.getUserMedia(
        constraints
      );
      if (videoPermission) {
        setVideoAvailable(true);
        console.log("Video permission granted");
      } else {
        setVideoAvailable(false);
        console.log("Video permission denied");
      }

      const audioPermission = await navigator.mediaDevices.getUserMedia({
        audio: true,
      });
      if (audioPermission) {
        setAudioAvailable(true);
        console.log("Audio permission granted");
      } else {
        setAudioAvailable(false);
        console.log("Audio permission denied");
      }

      if (navigator.mediaDevices.getDisplayMedia) {
        setScreenAvailable(true);
      } else {
        setScreenAvailable(false);
      }

      if (videoAvailable || audioAvailable) {
        const userMediaStream = await navigator.mediaDevices.getUserMedia({
          video: videoAvailable,
          audio: audioAvailable,
        });
        if (userMediaStream) {
          window.localStream = userMediaStream;
          if (localVideoref.current) {
            localVideoref.current.srcObject = userMediaStream;
          }
        }
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (video !== undefined && audio !== undefined) {
      getUserMedia();
      console.log("SET STATE HAS ", video, audio);
    }
  }, [video, audio]);
  let getMedia = () => {
    setVideo(videoAvailable);
    setAudio(audioAvailable);
    connectToSocketServer();
  };

  let getUserMediaSuccess = (stream) => {
    try {
      window.localStream.getTracks().forEach((track) => track.stop());
    } catch (e) {
      console.log(e);
    }

    window.localStream = stream;
    localVideoref.current.srcObject = stream;

    for (let id in connections) {
      if (id === socketIdRef.current) continue;

      connections[id].addStream(window.localStream);

      connections[id].createOffer().then((description) => {
        console.log(description);
        connections[id]
          .setLocalDescription(description)
          .then(() => {
            socketRef.current.emit(
              "signal",
              id,
              JSON.stringify({ sdp: connections[id].localDescription })
            );
          })
          .catch((e) => console.log(e));
      });
    }

    stream.getTracks().forEach(
      (track) =>
        (track.onended = () => {
          setVideo(false);
          setAudio(false);

          try {
            let tracks = localVideoref.current.srcObject.getTracks();
            tracks.forEach((track) => track.stop());
          } catch (e) {
            console.log(e);
          }

          let blackSilence = (...args) =>
            new MediaStream([black(...args), silence()]);
          window.localStream = blackSilence();
          localVideoref.current.srcObject = window.localStream;

          for (let id in connections) {
            connections[id].addStream(window.localStream);

            connections[id].createOffer().then((description) => {
              connections[id]
                .setLocalDescription(description)
                .then(() => {
                  socketRef.current.emit(
                    "signal",
                    id,
                    JSON.stringify({ sdp: connections[id].localDescription })
                  );
                })
                .catch((e) => console.log(e));
            });
          }
        })
    );
  };

  let getUserMedia = () => {
    if ((video && videoAvailable) || (audio && audioAvailable)) {
      navigator.mediaDevices
        .getUserMedia({ video: video, audio: audio })
        .then(getUserMediaSuccess)
        .then((stream) => {})
        .catch((e) => console.log(e));
    } else {
      try {
        let tracks = localVideoref.current.srcObject.getTracks();
        tracks.forEach((track) => track.stop());
      } catch (e) {}
    }
  };

  let getDislayMediaSuccess = (stream) => {
    console.log("HERE");
    try {
      window.localStream.getTracks().forEach((track) => track.stop());
    } catch (e) {
      console.log(e);
    }

    window.localStream = stream;
    localVideoref.current.srcObject = stream;

    for (let id in connections) {
      if (id === socketIdRef.current) continue;

      connections[id].addStream(window.localStream);

      connections[id].createOffer().then((description) => {
        connections[id]
          .setLocalDescription(description)
          .then(() => {
            socketRef.current.emit(
              "signal",
              id,
              JSON.stringify({ sdp: connections[id].localDescription })
            );
          })
          .catch((e) => console.log(e));
      });
    }

    stream.getTracks().forEach(
      (track) =>
        (track.onended = () => {
          setScreen(false);

          try {
            let tracks = localVideoref.current.srcObject.getTracks();
            tracks.forEach((track) => track.stop());
          } catch (e) {
            console.log(e);
          }

          let blackSilence = (...args) =>
            new MediaStream([black(...args), silence()]);
          window.localStream = blackSilence();
          localVideoref.current.srcObject = window.localStream;

          getUserMedia();
        })
    );
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
                        })
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
      socketRef.current.emit("join-call", window.location.href);
      socketIdRef.current = socketRef.current.id;

      socketRef.current.on("chat-message", addMessage);

      socketRef.current.on("user-left", (id) => {
        setVideos((videos) => videos.filter((video) => video.socketId !== id));
      });

      socketRef.current.on("user-joined", (id, clients) => {
        clients.forEach((socketListId) => {
          connections[socketListId] = new RTCPeerConnection(
            peerConfigConnections
          );
          // Wait for their ice candidate
          connections[socketListId].onicecandidate = function (event) {
            if (event.candidate != null) {
              socketRef.current.emit(
                "signal",
                socketListId,
                JSON.stringify({ ice: event.candidate })
              );
            }
          };

          // Wait for their video stream
          connections[socketListId].onaddstream = (event) => {
            console.log("BEFORE:", videoRef.current);
            console.log("FINDING ID: ", socketListId);

            let videoExists = videoRef.current.find(
              (video) => video.socketId === socketListId
            );

            if (videoExists) {
              console.log("FOUND EXISTING");

              // Update the stream of the existing video
              setVideos((videos) => {
                const updatedVideos = videos.map((video) =>
                  video.socketId === socketListId
                    ? { ...video, stream: event.stream }
                    : video
                );
                videoRef.current = updatedVideos;
                return updatedVideos;
              });
            } else {
              // Create a new video
              console.log("CREATING NEW");
              let newVideo = {
                socketId: socketListId,
                stream: event.stream,
                autoplay: true,
                playsinline: true,
                username,
              };
              console.log(newVideo);
              setVideos((videos) => {
                const updatedVideos = [...videos, newVideo];
                videoRef.current = updatedVideos;
                return updatedVideos;
              });
            }
          };

          // Add the local video stream
          if (window.localStream !== undefined && window.localStream !== null) {
            connections[socketListId].addStream(window.localStream);
          } else {
            let blackSilence = (...args) =>
              new MediaStream([black(...args), silence()]);
            window.localStream = blackSilence();
            connections[socketListId].addStream(window.localStream);
          }
        });

        if (id === socketIdRef.current) {
          for (let id2 in connections) {
            if (id2 === socketIdRef.current) continue;

            try {
              connections[id2].addStream(window.localStream);
            } catch (e) {}

            connections[id2].createOffer().then((description) => {
              connections[id2]
                .setLocalDescription(description)
                .then(() => {
                  socketRef.current.emit(
                    "signal",
                    id2,
                    JSON.stringify({ sdp: connections[id2].localDescription })
                  );
                })
                .catch((e) => console.log(e));
            });
          }
        }
      });
    });
  };

  let silence = () => {
    let ctx = new AudioContext();
    let oscillator = ctx.createOscillator();
    let dst = oscillator.connect(ctx.createMediaStreamDestination());
    oscillator.start();
    ctx.resume();
    return Object.assign(dst.stream.getAudioTracks()[0], { enabled: false });
  };
  let black = ({ width = 640, height = 480 } = {}) => {
    let canvas = Object.assign(document.createElement("canvas"), {
      width,
      height,
    });
    canvas.getContext("2d").fillRect(0, 0, width, height);
    let stream = canvas.captureStream();
    return Object.assign(stream.getVideoTracks()[0], { enabled: false });
  };

  let handleVideo = () => {
    setVideo(!video);
    // getUserMedia();
  };
  let handleAudio = () => {
    setAudio(!audio);
    // getUserMedia();
  };

  useEffect(() => {
    if (screen !== undefined) {
      getDislayMedia();
    }
  }, [screen]);
  let handleScreen = () => {
    setScreen(!screen);
  };

  let handleEndCall = () => {
    try {
      let tracks = localVideoref.current.srcObject.getTracks();
      tracks.forEach((track) => track.stop());
    } catch (e) {}
    window.location.href = "/";
  };

  let openChat = () => {
    setModal(true);
    setNewMessages(0);
  };
  let closeChat = () => {
    setModal(false);
  };
  let handleMessage = (e) => {
    setMessage(e.target.value);
  };

  const addMessage = (data, sender, socketIdSender) => {
    setMessages((prevMessages) => [
      ...prevMessages,
      { sender: sender, data: data },
    ]);
    if (socketIdSender !== socketIdRef.current) {
      setNewMessages((prevNewMessages) => prevNewMessages + 1);
    }
  };

  let sendMessage = () => {
    console.log(socketRef.current);
    socketRef.current.emit("chat-message", message, username);
    setMessage("");

    // this.setState({ message: "", sender: username })
  };

  let connect = () => {
    setAskForUsername(false);
    getMedia();
  };

  return (
    <div className="flex flex-col">
      {askForUsername === true ? (
        <div className={styles.lobbyContainer || ""}>
          <div className={styles.lobbyCard || ""}>
            <h2>Enter into Lobby</h2>
            <div className={styles.inputGroup || ""}>
              <TextField
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                label="Username"
                variant="outlined"
                size="small"
              />
              <Button variant="contained" onClick={connect}>
                Connect
              </Button>
            </div>
            <div className={styles.previewContainer || ""}>
              <video ref={localVideoref} autoPlay muted />
              <div className={styles.previewLableAndBottonContainer}>
                <div className={styles.previewLabel || ""}>Preview</div>
                <div className={styles.previewBottons}>
                  <IconButton
                    onClick={handleAudio}
                    className={audio ? styles.iconBtn : styles.endCallBtn}
                  >
                    {audio ? <MicIcon /> : <MicOffIcon />}
                  </IconButton>

                  <IconButton
                    onClick={handleVideo}
                    className={video ? styles.iconBtn : styles.endCallBtn}
                  >
                    {video ? <VideocamIcon /> : <VideocamOffIcon />}
                  </IconButton>
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className={styles.videoCallContainer}>
          <div className={styles.mainStage}>
            {/* VIDEO GRID */}
            <div className={styles.videoGrid}>
              {
                /* Local Video */ //*}
                <div
                  className={styles.videoWrapper}
                  onClick={() => setActiveVideoId("local")}
                >
                  {activeVideoId === "local" ? (
                    <video ref={localVideoref} autoPlay muted />
                  ) : (
                    <video
                      ref={(ref) => {
                        const activeUser = videos.find(
                          (v) => v.socketId === activeVideoId
                        );
                        if (ref && activeUser?.stream) {
                          ref.srcObject = activeUser.stream;
                        }
                      }}
                      autoPlay
                    />
                  )}
                  <div className={styles.nameTag}>
                    {activeVideoId !== "local" ? username : `${username}(You)`}
                  </div>
                </div>
              }
              {/* sidebar for all particepate  */}
            </div>

            {/* sidebar */}

            {showVideoModel && (
              <div className={styles.videosSidebar}>
                {videos.map((video) => (
                  <div
                    className={`${styles.videoWrapper} ${
                      activeVideoId === video.socketId ? styles.active : ""
                    }`}
                    key={video.socketId}
                    onClick={() => setActiveVideoId(video.socketId)}
                  >
                    <video
                      ref={(ref) => {
                        if (ref && video.stream) ref.srcObject = video.stream;
                      }}
                      autoPlay
                    />
                    <div className={styles.nameTag}>
                      {activeVideoId !== "local" ? username : `${username}(You)`}
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* SIDEBAR CHAT */}
            {showModal && (
              <div className={styles.chatSidebar}>
                <div className={styles.chatHeader}>
                  <h3 className="font-bold"> messages</h3>
                  <IconButton
                    onClick={() => {
                      setModal(false), setVideoModel(!showVideoModel);
                    }}
                  >
                    <CloseIcon />
                  </IconButton>
                </div>

                <div className={styles.ChatContainer}>
                  <div className={styles.chatMessages}>
                    {messages.map((item, index) => (
                      <div key={index} className="mb-4">
                        <p className="text-xs font-bold">{item.sender}</p>
                        <p className="text-sm">{item.data}</p>
                      </div>
                    ))}
                    <div />
                  </div>
                </div>

                <div className={styles.chatInputArea}>
                  <TextField
                    fullWidth
                    size="small"
                    variant="standard"
                    placeholder="Send a message"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                  />
                  <IconButton onClick={sendMessage} color="primary">
                    <SendIcon />
                  </IconButton>
                </div>
              </div>
            )}
          </div>

          {/* BOTTOM CONTROLS */}
          <div className={styles.bottomBar}>
            <div className={styles.controlGroup}>
              <IconButton
                onClick={handleAudio}
                className={audio ? styles.iconBtn : styles.endCallBtn}
              >
                {audio ? <MicIcon /> : <MicOffIcon />}
              </IconButton>

              <IconButton
                onClick={handleVideo}
                className={video ? styles.iconBtn : styles.endCallBtn}
              >
                {video ? <VideocamIcon /> : <VideocamOffIcon />}
              </IconButton>

              <IconButton
                onClick={handleScreen}
                className={screen ? styles.iconBtnActive : styles.iconBtn}
              >
                {screen ? <ScreenShareIcon /> : <StopScreenShareIcon />}
              </IconButton>

              <Badge badgeContent={newMessages} color="error">
                <IconButton
                  onClick={() => {
                    setModal(!showModal), setVideoModel(!showVideoModel);
                  }}
                  className={showModal ? styles.iconBtnActive : styles.iconBtn}
                >
                  <ChatIcon />
                </IconButton>
              </Badge>

              <IconButton onClick={handleEndCall} className={styles.endCallBtn}>
                <CallEndIcon />
              </IconButton>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
