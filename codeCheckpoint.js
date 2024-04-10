$(document).ready(function(){
  
    onStartUp();
    
    

});

async function levelDecider(level){
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

    
}
function sleep(ms) {
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


function onStartUp(){
    $("button").fadeOut();
    $("body").on("click",function(){
      $("body").off("click")
      $("button").fadeIn();
      $("h1").text("LeveL 1");
    //   var audio = new Audio("./music/theme-song.mp3");
    //   audio.play();
    setTimeout(levelDecider(4),1000);
    
    });
}