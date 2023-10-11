import { ClientToServerEvents, Config, InterServerEvents, ServerToClientEvents, SocketData } from './utils/interfaces';
import { createServer } from "http";
import { Server } from "socket.io";
const cfg: Config = require('./config.json'); 

const httpServer = createServer();
const io = new Server<
    ClientToServerEvents,
    ServerToClientEvents,
    InterServerEvents,
    SocketData
>(httpServer, {
    cors: {
        origin: '*',
    }
});

io.on("connection", (socket) => {
    console.log('Connected: '.concat(socket.id));

    socket.on("disconnect", () => {
        console.log('Disconnected'.concat(socket.id));
    });
});

console.log(io.engine.clientsCount);
httpServer.listen(cfg.port, () => {
    console.log('Server running on "http://localhost" :port ' + cfg.port.toString())
});