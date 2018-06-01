function chooseAngle(){
    if(arrow.angle > gameProperties.maxAngle || arrow.angle < gameProperties.maxAngle*-1){
        //Flip arrow's direction if out of max angle
        arrow.dir *= (-1);
    }            
    arrow.angle += gameProperties.speed * arrow.dir;
}

function choosePower(){  
    if(arrow.power > 100 || arrow.power < 5){
        arrow.dir *= (-1);
    }    
    arrow.scale.setTo(2,gameProperties.maxScale * (arrow.power/100));
    arrow.power += gameProperties.scaleSpeed*arrow.dir;
}

function applyForce(){
    if(player.body.touching.down){    
        player.body.velocity.x = Math.cos(Phaser.Math.degToRad(arrow.angle -90)) * gameProperties.maxForce * arrow.power;
        player.body.velocity.y = Math.sin(Phaser.Math.degToRad(arrow.angle -90)) * gameProperties.maxForce * arrow.power;
        arrow.power = 10;
    } 
    //otherwise you're in the air don't do anything
}

//Functionality for player movement
function playerMove(){
    //Phaser friction is undocumented and broken
    //inefficient attempt at doing friction
    if(player.body.touching.down){
        player.body.drag.x = 150;
    } else {
        player.body.drag.x = 0;
    }


    switch(player.moveState){
        case PlayerState.ANGLE:
            chooseAngle();
            break;
        case PlayerState.POWER:
            choosePower();
            break;
        case PlayerState.FORCE:
            applyForce();
            changeState();
            break;
        default:
            if(player.body.velocity.x < 1 && player.body.touching.down){
                //We've stopped, it is okay to start moving again
                player.moveState = PlayerState.ANGLE;
                arrow.scale.setTo(2,2);
            }
    }
}

//Iterates to next state, while hanging on the blocked state
function changeState(){
    if(player.moveState < PlayerState.BLOCKED){
        player.moveState++;
    }     
}