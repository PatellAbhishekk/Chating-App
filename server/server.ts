import http from "http";
import express from "express";
import { Server } from "socket.io";

const app = express();
const server = http.createServer(app);

app.get("/", (req, res) => {
  res.send("Socket.io server is healthy!");
});

// MARK: Socket.io
const io = new Server(server, {
  cors: {
    origin: "*",
  },
});

io.on("connection", (socket) => {
  console.log(`Someone connected with ${socket.id} id.`);

  socket.on("user", (data) => {
    socket.broadcast.emit("new_user", data);
  });

  socket.on("message", (data) => {
    console.log("new message");
    console.log(data);
    socket.broadcast.emit("new_message", data);
  });

  socket.on("typing", (data) => {
    socket.broadcast.emit("user_typing", data);
  });
});

server.listen(8080, () => {
  console.log("Server listening on PORT: 8080");
});
