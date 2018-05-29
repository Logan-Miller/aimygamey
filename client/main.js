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
	createPlayer();
	gameProperties.inGame = true;
	socket.emit('newPlayer', {x: 0, y: 0, angle: 0});
};

//Create the client player. 
function createPlayer() {

}

//This contains the preload, create, and update functions
main.prototype = {
	//preload function should load all assets required for the game
	preload: function() {


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
