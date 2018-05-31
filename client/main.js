//global socket
var socket = io.connect();

//configure canvas to screen size
//canvasWidth = window.innerWidth * window.devicePixelRatio; 
//canvasHeight = window.innerHeight * window.devicePixelRatio;
canvasHeight = 750;
canvasWidth = 1000;

//The actual phaser game
//Create the game, first two arguments are its resolution
//third is the renderer to be used
//last is the DOM element the game will live in
game = new Phaser.Game(canvasWidth, canvasHeight, Phaser.CANVAS,
	'gameDiv');

//game properties
var gameProperties = {
	gameElement: "gameDiv",
	gameWidth: 750,
	gameHeight: 1000,
	inGame: false,
};

//game state
var main = function(game){
};

//When connected to the server, log it, create a new object
//for the player to control, and then tell the server
function onSocketConnected() {
	console.log("Connected to server");
	createPlatforms();
	createPlayer();
	gameProperties.inGame = true;
	socket.emit('newPlayer', {x: 0, y: 0, angle: 0});
};

//Create the client player. 
function createPlayer() {
	//adding graphics at a point on the plane
	player = game.add.graphics(500, 0);
	
	//draws the box
	player.lineStyle(2, 0x0000FF, 1);
	player.beginFill(0xffd900);
	player.drawRect(-25, -25, 50, 50);
	player.endFill();

	player.anchor.setTo(0.5, 0.5)

	//enables the debugging "ghost"
	game.physics.p2.enableBody(player, true);
}

function createPlatforms() {
	platforms = game.add.graphics(0,0);
	
	platforms.lineStyle(2, 0x0000FF, 1);
	platforms.beginFill(0x45A81E);
	platforms.drawRect(0, 725, 1000, 25);
	platforms.endFill();
	
	game.physics.p2.enableBody(platforms, false);
	platforms.body.immovable = true;
}

//This contains the preload, create, and update functions
main.prototype = {
	//preload function should load all assets required for the game
	preload: function() {
		//physics engine for the game, we're using P2
		game.physics.startSystem(Phaser.Physics.P2JS);
		//y gravity
		game.physics.p2.gravity.y = 300;
	},

	create: function() {
		console.log("client started");
		socket.on("connect", onSocketConnected());
		//set background color
		game.stage.backgroundColor = "#4488AA";

	}
}

var gameBootStrapper = {
	init: function(gameContainerElementID) {
		game.state.add('main', main);
		game.state.start('main');
	}
};;

gameBootStrapper.init("gameDiv");
