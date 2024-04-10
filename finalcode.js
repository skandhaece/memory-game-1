$(document).ready(function(){
  
    onStartUp(1);
    
    

});

async function levelDecider(level){
    var timesUserClicked = 0;
    var points = 0;
    colourOfButtoms = ["r","b","g","y"];
    buttonClassNames = ["left-top","right-top","left-bottom","right-bottom"];
    questionAsked = howMany(level);
    console.log(questionAsked);
    for(var i =0;i<level;i++)
    {   
        var temp = buttonClassNames[questionAsked[i]];
        var colourLettter = colourOfButtoms[questionAsked[i]];
        console.log(temp)
        addEffect(temp,i+1);
        console.log(`Waiting 1 second...`);
        await sleep(1 * 1000);
        removeEffect(temp,colourLettter)
        

    }

    $("button").on("click", function(){
        var keyPressed = this.innerHTML;
        var answerKeyForPress = colourOfButtoms[questionAsked[timesUserClicked]];
        if(keyPressed == answerKeyForPress){
            points = points + 1;
            timesUserClicked = timesUserClicked + 1;
        }
        if(level == points){
            //change song to level up and make points to zero
            var levelUp = new Audio("./music/level-up.mp3");
            levelUp.play();
            var audio = new Audio("./music/theme-song.mp3");
            audio.play();
            points = 0;
            timesUserClicked = 0;
            $("button").off("click");
            $("h1").text("LeveL "+ (level+1));
            levelDecider(level+1);

        }
       
        if(keyPressed != answerKeyForPress){
            //shutdown everything and start from level 1
            $("button").off("click");
            points = 0;
            timesUserClicked = 0;
            //give delay telling out!! :::::::::TODO:::::::::::::
            $("h1").text("GAME OVER!! CLICK TO PLAY AGAIN");
            onStartUp(1);
            
        }
    });

    
}
async function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms)); 
}
function addEffect(temp,i){
    $("."+temp).addClass("clickedButton")
    $("."+temp).text(i)
    console.log("adding")
    console.log(document.querySelector("."+temp).classList)

}

function removeEffect(temp,colourLettter){
    console.log("removing")
        $("."+temp).removeClass("clickedButton")
        $("."+temp).text(colourLettter)
        console.log(document.querySelector("."+temp).classList)
}

function howMany(level){
    questionGiven = [];

    for(var i=0 ; i<level;i++){
        randomColour = Math.floor(Math.random()*4);
        questionGiven.push(randomColour);
    }
    return questionGiven
}


function onStartUp(level){
    $("button").fadeOut();
    $("body").on("click",function(){
      $("body").off("click")
      $("button").fadeIn();
      $("h1").text("LeveL 1");
    //   var audio = new Audio("./music/theme-song.mp3");
    //   audio.play();
    levelDecider(level);
    
    
    });
}