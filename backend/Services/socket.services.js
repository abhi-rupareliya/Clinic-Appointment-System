const socketIo = require("socket.io");
let io;

function setupSocket(server) {
  io = socketIo(server, {
    cors: {
      origin: "http://localhost:3000",
      methods: ["GET", "POST" , "PUT" , "DELETE"],
      credentials: true,
    },
  });

  io.on("connection", (socket) => {
    console.log("New client connected");
    socket.on("disconnect", () => {
      console.log("Client disconnected");
    });
  });
}

function getIo() {
  return io;
}

module.exports = {
  setupSocket,
  getIo,
};