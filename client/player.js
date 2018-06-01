//Functionality for player movement
function playerMove(){

    //Current controls to play with feel
    var max = 90;
    var speed = 4;


    if(arrow.angle > max || arrow.angle < max*-1){
        //Flip arrow's direction if out of max angle
        arrow.dir *= (-1);
    }
    arrow.angle += speed*arrow.dir;
    

}