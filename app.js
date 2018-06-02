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

var players = [];

var Player = function (startX, startY, playerID) {
  this.x = startX;
  this.y = startY;
  this.id = playerID;
}

//When a new player is made, save it
function onNewPlayer(data) {
  var newPlayer = new Player(data.x, data.y, this.id);
  
  var currentInfo = {
    x: newPlayer.x,
    y: newPlayer.y,
    id: newPlayer.id,
  };

  for(i = 0; i < players.length; i++) {
    this.broadcast.emit("newEnemy", currentInfo);
  }

  players.push(newPlayer);
}


//when movement is detected, update the player's position in the players list
//then broadcast their new position out to everyone else. 
function movement(data) {
  for(i = 0; i < players.length; i++) {
    if(players[i].id = this.id) {
      players[i].x = data.x;
      players[i].y = data.y;
    }
  }

  var currentInfo = {
    x: data.x,
    y: data.y,
    id: data.id,
  };

  this.broadcast.emit('enemyMovement', currentInfo);
}

//listen for a connection from a client
io.sockets.on('connection', function(socket){
	console.log("User " + socket.id + " connected");
  //notification for when a new player connects
  socket.on('newPlayer', onNewPlayer);
  //notification for movement by players
  socket.on('playerMovement', movement);

});