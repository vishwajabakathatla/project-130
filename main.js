song = "";
song_2 = "";
scoreleftWrist = 0;
scorerightwrist = 0;
left_play_song = "";
right_play_song = "";

leftWristX = 0;
leftWristY = 0;

rightWristX = 0;
rightWristY = 0;

function preload(){
    song = loadSound("music2.mp3");
    song_2 = loadSound("music3.mp3");


}

function setup(){
    canvas = createCanvas(500 , 500);
   canvas.position(500 , 200);


    video = createCapture(VIDEO);
    video.hide();

    poseNet = ml5.poseNet(video , modelLoded);
    poseNet.on('pose' , gotPoses);
}

function modelLoded(){

    console.log('PoseNet is initialized');
    
}
 function gotPoses(results){
     if(results.length > 0){
         console.log(results);

         scoreleftWrist = results[0].pose.keypoints[9].score;
         scorerightwrist = results[0].pose.keypoints[10].score;

         leftWristX = results[0].pose.leftWrist.x;
         leftWristY = results[0].pose.leftWrist.y;
         console.log("leftWristX = " + leftWristX + "leftWristY = " + leftWristY);

         rightWristX = results[0].pose.rightWrist.x;
         rightWristY = results[0].pose.rightWrist.y;
         console.log("rightWristX = " + rightWristX + "rightWristY = " + rightWristY);
     }
 }
function draw(){
    image(video , 0 , 0 , 500 , 500);

    fill('#fce303');
    stroke('#fce303');
    
    
    left_play_song = song.isPlaying();
    right_play_song = song_2.isPlaying();
    
    console.log(left_play_song);

    if(scoreleftWrist >0.2){
        circle(leftWristX , leftWristY , 20);
       song_2.stop();

       if(left_play_song == false){
        song.play();
        document.getElementById("song_name").innerHTML = "Peter Pan";
    }
       
    }

       if(right_play_song == false){
        song_2.play();
        document.getElementById("song_name").innerHTML = "Harry Potter";
    }
       
    }
    if(scorerightwrist >0.2){
        circle(rightWristX , rightWristY , 20);
       song.stop();

   

   
}