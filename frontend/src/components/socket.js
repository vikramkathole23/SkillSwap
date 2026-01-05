import {io} from "socket.io-client"
import server from "../../production";

export const socket = io(server, {
    transports: ["websocket"],
    autoConnect: true,
  });