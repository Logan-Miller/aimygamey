//import express
var express = require('express');
var app = express();
//create the server
var server = require('http').Server(app);
//bind server to socket.io
var io = require('socket.io')(server);

//send index.html (client code) along with all dependencies
//in the client folder
app.get('/', function(req, res) {
	res.sendFile(__dirname + '/client/index.html');
});

app.use('/client', express.static(__dirname + '/client'));

//listener
server.listen(process.env.PORT || 2000);
console.log("Server started");

//listen for a connection from a client
io.sockets.on('connection', function(socket){
	console.log("User " + socket.id + " connected");
});