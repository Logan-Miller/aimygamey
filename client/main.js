//global socket
var socket = io.connect();

//configure canvas to screen size
canvasWidth = window.innerWidth * window.devicePixelRatio; 
canvasHeight = window.innerHeight * window.devicePixelRatio;

//The actual phaser game
game = new Phaser.Game(canvasWidth, canvasHeight, Phaser.CANVAS,
	'gameDiv');

//game properties
var gameProperties = {
	gameElement: "gameDiv",
	gameWidth = 1000;
	gameHeight = 2000;
	inGame = false,
};

//game state
var main = function(game){

};

//When connected to the server, log it, create a new object
//for the player to control, and then tell the server
function onSocketConnected() {
	console.log("Connected to server");
	createPlayer();
	gameProperties.inGame = true;
	socket.emit('newPlayer', {x: 0, y: 0, angle: 0});
};

//Create the client player. 
function createPlayer() {
	//add graphics
	player = game.add.graphics(0, 0)

	//set fill and line style
	player.lineStyle(2, 0x0000FF, 1);
	player.beginFill(0xffd900);
  player.drawRect(50, 50, 50, 50);
  player.endFill();
  player.anchor.setTo(0.5, 0.5);

  //draw the shape
  game.physics.p2.enableBody(player, true);
  player.body.addRectangle(50, 50)
}

//physics for the game
main.prototype = {
	preload: function() {
		game.scale.scaleMode = Phaser.ScaleManager.RESIZE;
		game.world.setBounds(0, 0, gameProperties.gameWidth);
		game.physics.startSystem(Phaser.Physics.P2JS);
		game.physics.p2.setBoundsToWorld(false, false, false,
			false, false):
		game.physics.p2.gravity.y = 100;
		game.physics.p2.applyGravity = true;
		game.physics.p2.enableBody(game.physics.p2.walls, false);
		game.physics.p2.setImpactEvents(true);
	}

	create: function() {
		console.log("client started");
		socket.on("connect", onSocketConnected());
	}
}

var gameBootStrapper = {
	init: function(gameContainerElementID) {
		game.state.add('main', main);
		game.state.start('main');
	}
};;

gameBootStrapper.init("gameDiv");
