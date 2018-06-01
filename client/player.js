//Functionality for player movement
function playerMove(){
    //Current controls to play with feel
    var maxAngle = 90;
    var speed = 4;
    var maxScale = 5;
    var scaleSpeed = 6;

    var dirtest = false;
    
    if(arrow.angle > maxAngle || arrow.angle < maxAngle*-1){
        //Flip arrow's direction if out of max angle
        arrow.dir *= (-1);
    }
    if(dirtest){
        arrow.angle += speed*arrow.dir;
    }


   
    if(arrow.power > 100 || arrow.power < 5){
        arrow.dir *= (-1);
    }

    arrow.scale.setTo(2,maxScale * (arrow.power/100));
    arrow.power += scaleSpeed*arrow.dir;



}