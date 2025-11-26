import 'dotenv/config';

import express, { json } from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import http from 'http';
import { Server as SocketIOServer } from 'socket.io';

import authRoutes from './routes/auth.route.js';
import teamRoutes from './routes/team.route.js';
import topicRoutes from './routes/topic.route.js';
import taskRoutes from './routes/task.route.js';
import documentRoutes from './routes/document.route.js';
import commentRoutes from './routes/comment.route.js';

import { errorHandler } from './middlewares/errorHandler.middleware.js';

const PORT = process.env.PORT || 4000;

const app = express();

const server = http.createServer(app);
const io = new SocketIOServer(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST", "DELETE", "PUT"]
  }
});

app.set("io", io);

app.use(cors());
app.use(helmet());
app.use(morgan('dev'));
app.use(json());


app.get('/', (req, res) => {
  res.send('Welcome to the Engineering Management Backend API');
});

app.use("/api", authRoutes);
app.use("/api/teams", teamRoutes, topicRoutes, taskRoutes, documentRoutes, commentRoutes);

io.on("connection", (socket) => {
  console.log("Client connected:", socket.id);

  socket.on("join-task", (taskId) => {
    console.log(`user joined room: task:${taskId}`);
    socket.join(`task:${taskId}`);
  });

  socket.on("comment:new", (data) => {
    console.log("New comment received:", data);
    io.to(`task:${data.taskId}`).emit("comment:new", data);
  });

  socket.on("disconnect", () => {
    console.log("Client disconnected:", socket.id);
  });
});

app.use(
  (err, req, res, next) => {
    errorHandler(err, req, res, next);
  }
);

server.listen(PORT, () => console.log(`🚀 Server and Socket.IO running at http://localhost:${PORT}`));

export default app;