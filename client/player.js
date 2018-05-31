//Functionality for player movement
function playerMove(){
    console.log("Hello world~");
    arrow.destroy();
    createArrow();
    arrow.lineStyle(3,0xff0000);
    arrow.moveTo(player.x,player.y);
    arrow.lineTo(player.x+100,player.y+100);
    

}