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

//list of players in game
var players = [];

//constructor for a player
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
    //broadcast the new player out to all the other players in the list  
    this.broadcast.emit("newEnemy", currentInfo);
  }

  //check for if there are already players,
  //if so, send the player's who are already in the game to the new player
  if(players.length > 0) {
  	for(i = 0; i < players.length; i++) {
  		currentInfo.x = players[i].x;
  		currentInfo.y = players[i].y;
  		currentInfo.id = players[i].id;
  		this.emit("newEnemy", currentInfo);
  	}
  }

  players.push(newPlayer);
  //TODO
  for(i = 0; i < players.length; i++) {
  		console.log(players[i].id);
  	}
}

function onDisconnect(){
	console.log("User " + this.id + " disconnected");
	//TODO Cleanup
	//find the user in the list of players and remove them, then tell the client
	for(i = 0; i < players.length; i++) {
		//TODO
		console.log("playsers ID " + players[i].id + " and this id " + this.id);
		if(players[i].id === this.id) {
			//TODO
			console.log("telling clients who to delete");
			this.broadcast.emit("playerDisconnect", this.id);
			players.splice(i, 1);
		}
	}
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
    id: this.id,
  };

  this.broadcast.emit('enemyMovement', currentInfo);
}

//listen for a connection from a client
io.sockets.on('connection', function(socket){
	console.log("User " + socket.id + " connected");
	socket.on('disconnect', onDisconnect)
 	//notification for when a new player connects
  socket.on('newPlayer', onNewPlayer);
  //notification for movement by players
  socket.on('playerMovement', movement);
});

