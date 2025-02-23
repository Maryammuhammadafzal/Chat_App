require("dotenv").config();
const express = require("express");
const http = require("http");
const { Server } = require("socket.io");
const cors = require("cors");
const socket = require("socket.io-client");
const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: { origin: "*" },
});

// Middleware
app.use(cors());
app.use(express.json());

// WebSocket Connection
io.on("connection", (socket) => {
        console.log("A user connected:", socket.id);
      
        socket.on("chat message", (msg) => {
          io.emit("chat message", msg);
        });

        socket.on("disconnect", () => {
                console.log("User disconnected:", socket.id);
              });
            });

            
            // Start Server
const PORT = process.env.PORT || 3000;
server.listen(PORT, () => console.log(`Server running on port ${PORT}`));

const mongoose = require("mongoose");

mongoose
  .connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("MongoDB Connected"))
  .catch((err) => console.log("Error:", err));

//   const Message = require("./models/Message.js");

socket.on("chat message", async (msg) => {
  const message = new Message({ user: socket.id, text: msg });
  await message.save();
  io.emit("chat message", msg);
});

const authRoutes = require("./routes/auth");
app.use("/auth", authRoutes);