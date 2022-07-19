"use strict";
const express = require("express");
const bodyParser = require("body-parser");
const http = require('http');
const cors = require("cors");
const socketIO = require("socket.io");
const port = 9000;
const app = express();
const server = http.Server(app);
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
// app.get("/debug", async (req:any, res:any) => {
//     res.send("ok");
// })
const io = socketIO(server, {
    cors: {
        origin: "http://localhost:3399",
    }
});
// console.log(io)
let numberUserConn = 0;
io.on('connection', (client) => {
    numberUserConn++;
    console.log(numberUserConn);
    // is new user online it will send to frontend 
    // io.emit("sent-message", `user number ${numberUserConn} is connected` )
    // console.log('user connected')
    // เมื่อ Client ตัดการเชื่อมต่อ
    // client.on('disconnect', () => {
    //     console.log('user disconnected')
    //     io.emit("sent-message", `user number ${numberUserConn} is disconnected` )
    // });
    client.on('receive-message', (message) => {
        // console.log("receive-message ===> ",message);
        io.emit("sent-message", `${message.username}: ${message.text}`);
    });
});
server.listen(9000, function () {
    console.log('listening on localhost:9000');
});
