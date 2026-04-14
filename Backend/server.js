const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
require("dotenv").config();

const authRoutes = require("./routes/auth");
const messageRoutes = require("./routes/message");
const userRoutes = require("./routes/user");
const conversationRoutes = require("./routes/conversation"); // ✅ NEW

const http = require("http");
const { Server } = require("socket.io");

const app = express();

// Create HTTP server
const server = http.createServer(app);

// Setup Socket.io
const io = new Server(server, {
  cors: {
    origin: "*",
  },
});

// Middlewares
app.use(cors());
app.use(express.json());

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/messages", messageRoutes);
app.use("/api/users", userRoutes);
app.use("/api/conversations", conversationRoutes); // ✅ NEW

app.get("/", (req, res) => {
  res.send("API is running...");
});

// ================= SOCKET LOGIC =================

let users = {}; // { userId: socketId }

io.on("connection", (socket) => {
  console.log("User connected:", socket.id);

  // ✅ JOIN USER
  socket.on("join", (userId) => {
    users[userId] = socket.id;

    console.log("Online Users:", users);

    // send online users to all
    io.emit("onlineUsers", Object.keys(users));
  });

  // ✅ SEND MESSAGE
  socket.on("sendMessage", ({ senderId, receiverId, text }) => {
    const receiverSocket = users[receiverId];

    if (receiverSocket) {
      io.to(receiverSocket).emit("receiveMessage", {
        senderId,
        receiverId,
        text,
      });
    }
  });

  // ✅ TYPING INDICATOR
  socket.on("typing", ({ senderId, receiverId }) => {
    const receiverSocket = users[receiverId];

    if (receiverSocket) {
      io.to(receiverSocket).emit("typing", senderId);
    }
  });

  // ✅ DISCONNECT
  socket.on("disconnect", () => {
    console.log("User disconnected:", socket.id);

    for (let userId in users) {
      if (users[userId] === socket.id) {
        delete users[userId];
        break;
      }
    }

    // update online users
    io.emit("onlineUsers", Object.keys(users));
  });
});

// ================= START SERVER =================

mongoose.connect(process.env.MONGO_URI)
.then(() => {
  console.log("MongoDB connected");

  server.listen(5000, () => {
    console.log("Server running on port 5000");
  });

})
.catch((err) => console.log(err));