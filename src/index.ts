//FICHERO EJECUCIÓN DEL PROYECTO
import app from './app'; //app exportada en app.ts
//Ejecutamos la conexion a la BBDD antes de escuchar al server
import './database'; 

import { createServer} from "http";
import { Server, Socket } from "socket.io";

const httpServer = createServer(app);
const io = new Server(httpServer, { cors: { origin: '*' } });

io.on("connection", (socket: Socket) => {
  console.log("Un nou usuari s'ha connectat :) ");

    console.log(socket);
/*
    socket.on('disconnect', function(){
        io.emit('users-changed', {user: socket.username, event: 'left'});
    });
*/
    socket.on('set-name', (name) => {
         console.log('SER NAME: ', name)
        // socket.username = name;
         io.emit('users-changed', {user: name, event: 'joined'});
    });

    socket.on('send-message', (message) => {
          io.emit('message', {msg: message.text, createdAt: new Date()});   //, user: socket.username,
    });




});

httpServer.listen(app.get('port')); //Recuperamos puerto de app.ts
console.log('Server in port', app.get('port'));