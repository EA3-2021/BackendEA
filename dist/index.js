"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
//FICHERO EJECUCIÓN DEL PROYECTO
const app_1 = __importDefault(require("./app")); //app exportada en app.ts
//Ejecutamos la conexion a la BBDD antes de escuchar al server
require("./database");
const http_1 = require("http");
const socket_io_1 = require("socket.io");
const httpServer = http_1.createServer(app_1.default);
const io = new socket_io_1.Server(httpServer, { cors: { origin: '*' } });
io.on("connection", (socket) => {
    console.log("nova connexió");
    //console.log(socket);
    /*
    socket.on('disconnect', function(){
        io.emit('users-changed', {user: socket.username, event: 'left'});
    });
    */
    //                                                   HAY QUE VINCULARLO CON EL NAME CON EL QUE TE LOGGEAS
    socket.on('set-name', (name) => {
        console.log('SER NAME: ', name);
        // socket.username = name;
        io.emit('users-changed', { user: name, event: 'joined' });
    });
    //enviar mensaje CHAT
    socket.on('send-message', (message) => {
        io.emit('message', { msg: message.text, createdAt: new Date() }); //, user: socket.username,
    });
});
httpServer.listen(app_1.default.get('port')); //Recuperamos puerto de app.ts
console.log('Server in port', app_1.default.get('port'));
