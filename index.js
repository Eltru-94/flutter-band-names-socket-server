const express = require("express");
const path = require("path");
const { emit } = require("process");
require("dotenv").config();
//App express

const app = express();

//Node serve

const server = require("http").createServer(app);
//sockest io
module.exports.io = require("socket.io")(server);
require('./sockets/socket')

//Mensajes de sockects



const publicPath = path.resolve(__dirname, "public");
app.use(express.static(publicPath));

server.listen(process.env.PORT, (err) => {
  if (err) throw new Error(err);
  console.log("Servidor corriendo en puerto", process.env.PORT);
});
