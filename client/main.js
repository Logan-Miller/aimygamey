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
	createArrow();
	gameProperties.inGame = true;
	socket.emit('newPlayer', {x: 0, y: 0, angle: 0});
};

//Create the client player. 
function createPlayer() {
	//adding graphics at a point on the plane
	box = game.add.graphics(500, 0);
	
	//draws the box
	box.lineStyle(2, 0x0000FF, 1);
	box.beginFill(0xffd900);
	box.drawRect(-25, -25, 50, 50);
	box.endFill();

	//create sprite from the drawn graphics
	player = game.add.sprite(500, 0, box.generateTexture());
	player.anchor.set(0.5);

	//player.anchor.setTo(0.5, 0.5)
	game.physics.enable(player, Phaser.Physics.ARCADE);
	player.body.collideWorldBounds = true;
	
	box.destroy();
}

function createArrow() {
	arrow = game.add.graphics(0,0);
}

function createPlatforms() {
	box = game.add.graphics(0,1000);
	
	box.lineStyle(2, 0x0000FF, 1);
	box.beginFill(0x45A81E);
	box.drawRect(0, 0, 1000, 25);
	box.endFill();

	platforms = game.add.sprite(0, 500, box.generateTexture());
	platforms.anchor.set(0.5);

	//enable physics on the graphic, gives it the "body" property
	game.physics.enable(platforms, Phaser.Physics.ARCADE);
	platforms.body.immovable = true;
	platforms.body.allowGravity = false;

	box.destroy();
}

//This contains the preload, create, and update functions
main.prototype = {
	//preload function should load all assets required for the game
	preload: function() {
		//physics engine for the game, we're using P2
		game.physics.startSystem(Phaser.Physics.ARCADE);
		//y gravity
		game.physics.arcade.gravity.y = 300;
	},

	create: function() {
		console.log("client started");
		socket.on("connect", onSocketConnected());
		//set background color
		game.stage.backgroundColor = "#4488AA";
	},

	update: function() {
		//allows collisions between the player and platforms
		var collision = game.physics.arcade.collide(player, platforms);
		playerMove();
		//Adds listener to client\player.js playerMove function
		game.input.onDown.add(playerMove, this);



		
	}
}

var gameBootStrapper = {
	init: function(gameContainerElementID) {
		game.state.add('main', main);
		game.state.start('main');
	}
};;

gameBootStrapper.init("gameDiv");
