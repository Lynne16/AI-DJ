song1="";
counter=0;
song2="";
rightWristx=0;
leftWristx=0;
rightWristy=0;
leftWrist=0;
leftscore=0;
rightscore=0;
speed=0;

function HPplay(){
  counter=1;   
}

function DLMDplay(){
    counter=2;
}

function preload(){
    song1=loadSound("music.mp3");
    song2=loadSound("DLMD.mp3");
}


function play(){
    if(counter == 1){
        song2.stop();
        song1.play();
        song1.setVolume(1);
        song1.rate(1)
    }
    //song.play();
    if(counter == 2){
        song1.stop();
        song2.play();
        song2.setVolume(1);
        song2.rate(1)
    }
}

function stop(){
    if(counter == 1){
    song1.stop();
    }

    if(counter == 2){
        song2.stop();
    }
}
function setup(){
    canvas=createCanvas(600,500);
    canvas.position(400,200);

    video= createCapture(VIDEO);
    video.hide();

    poseNet=ml5.poseNet(video,modelLoaded);
    poseNet.on('pose',gotPoses);
}

function modelLoaded(){
    console.log('poseNet is loaded');
}


function gotPoses(results){
    if(results.length > 0)
    {
    console.log(results);

    leftscore=results[0].pose.keypoints[9].score;
    console.log("the leftWrist score is "+leftscore);

    rightscore=results[0].pose.keypoints[10].score;
    console.log("the RightWrist score is "+ rightscore );

    rightWristx=results[0].pose.rightWrist.x;
    leftWristx=results[0].pose.leftWrist.x;

    rightWristy=results[0].pose.rightWrist.y;
    leftWristy=results[0].pose.leftWrist.y;

    console.log("rightWristx = "+rightWristx+" rightWristy = "+ rightWristy);
    console.log("leftWristx = "+leftWristx+" leftWristy = "+ leftWristy);
    }
}


function draw(){
    image(video,0,0,600,500)

    if(leftscore > 0.2){
        fill("red");
        stroke("black");
        circle(leftWristx,leftWristy,10);
        InNumberLeftWristY=Number(leftWristy);
        remove_decimal=floor(InNumberLeftWristY);
        volume=remove_decimal/500;
       if(counter == 1){
           song1.setVolume(volume);
           document.getElementById("volume").innerHTML=volume;
       }
       if(counter == 2){
        song2.setVolume(volume);
        document.getElementById("volume").innerHTML=volume;
    }
}

    if(rightscore > 0.2){
        fill("purple");
        stroke("black");
        circle(rightWristx,rightWristy,10);

        if(rightWristy >= 0 && rightWristy <= 100){

            if(counter == 1){
                song1.rate(0.5);
                document.getElementById("speed").innerHTML="0.5x";
            }

            if(counter == 2){
                song2.rate(0.5);
                document.getElementById("speed").innerHTML="0.5x";
            }
        }

        if(rightWristy > 100 && rightWristy <= 200){

            if(counter == 1){
                song1.rate(1);
                document.getElementById("speed").innerHTML="1x";
            }

            if(counter == 2){
                song2.rate(1);
                document.getElementById("speed").innerHTML="1x";
            }
        }

        if(rightWristy > 200 && rightWristy <= 300){

            if(counter == 1){
                song1.rate(1.5);
                document.getElementById("speed").innerHTML="1.5x";
            }

            if(counter == 2){
                song2.rate(1.5);
                document.getElementById("speed").innerHTML="1.5x";
            }
        }

        if(rightWristy > 300 && rightWristy <= 400){

            if(counter == 1){
                song1.rate(2);
                document.getElementById("speed").innerHTML="2x";
            }

            if(counter == 2){
                song2.rate(2);
                document.getElementById("speed").innerHTML="2x";
            }
        }

        if(rightWristy > 400 && rightWristy <= 500){

            if(counter == 1){
                song1.rate(2.5);
                document.getElementById("speed").innerHTML="2.5x";
            }

            if(counter == 2){
                song2.rate(2.5);
                document.getElementById("speed").innerHTML="2.5x";
            }
        }
    }
}