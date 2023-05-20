import { Server as WebSocketServer } from "socket.io";
import http from "http";
import Sockets from "./sockets.js";
import {connectDB} from './db.js'
import {PORT} from './config.js'
import app from './app.js'

connectDB();
const server = http.createServer(app);
const httpServer = server.listen(PORT);
console.log('server running at port', PORT)

const io = new WebSocketServer(httpServer, {
    cors: {
      origin: "http://localhost:3000",
    },
  });

Sockets(io);
