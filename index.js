import express from "express";
import http from "http";
import { fileURLToPath } from "url";
import path from "path";
import { Server } from "socket.io";

// For __dirname in ES6
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
// all http related, handle this
const server = http.createServer(app);
// all socket.io related handle this
const io = new Server(server);

// socket.io
io.on("connection", (socket) => {
  // io mane amar kache joto connection ache
  //console.log("a user connected", socket.id);
  socket.on("new-user", (data) => {
    // console.log("data", data);
    socket.userName = data;
    // console.log("Socket", socket);
  });

  socket.on("user-message", (message) => {
    // ai event (user-message) a ja ja asche, socket.on new event korte use how
    // console.log("new user message", message);

    let userMessage = {
      name: socket.userName,
      message: message,
    };
    // ⚖️ Which one should you use?
    // ✅ Use io.emit if you want everyone (including sender) to receive the update.
    // Example: Public chat app → everyone sees the new message including sender.
    io.emit("message-distributeto-all", userMessage); // io mane amar kache joto connection ache

    // ✅ Use socket.broadcast.emit if you want only others to receive the update.
    // Example: "Typing..." notification → no need to send back to the sender.
    // socket.broadcast.emit("message-distributeto-all", message);
  });
});

app.use(express.static(path.resolve(__dirname, "./public")));

app.get("/", (req, res) => {
  return res.sendFile(path.join(__dirname, "public", "index.html"));
});

server.listen(3000, () => {
  console.log("Server listening on 3000");
});
