 const users= [];

const  ioConnection = (io) => {
  io.on("connection" , (socket)=>{
    console.log("client connected" );

    socket.on("register" , (userId) => {
      socket.join(userId.toString())
      console.log("User joined:", userId);
      console.log("Socket rooms:", socket.rooms);

    })

    socket.on("chat message", (msg) => {
      console.log("Message:", msg);
      io.emit('chat message', msg);
    });


    socket.on("connect_error", (err) => {
  console.log("Socket error:", err.message);
});


    socket.on("disconnect" , () => {
      console.log("client disconnected");
    })
  })
}

export default ioConnection;