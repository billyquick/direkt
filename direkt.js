$(document).ready(handleButtonClicks);

var arrowValues = [generateRandomArrow(), generateRandomArrow(), generateRandomArrow()];
var game;
var score;
var userInput;
var prevSelectedBtn;

$(document).keydown(function (keypressed){
  userInput = keypressed.keyCode;
  console.log(userInput);
});

function handleButtonClicks() {
  $(".btn.btn-primary").each(function(idx, btn){
    $(btn).click(registerBtnListeners.bind(this));
  });
}

function registerBtnListeners() {
  var thisBtn = $(this).attr('id');
  if(thisBtn === prevSelectedBtn) {
    hideGame();
  } else {
    transition(thisBtn);
  }
}

function hideGame(){
  $(".game").slideUp();
  prevSelectedBtn = null;
  endGame();
}

function transition(thisBtn){
  $(".game").slideUp(function complete(){
    if(thisBtn != "how-to-play-btn"){
      $(".tutorial").css("display", "none");
      $(".activeGame").css("display", "block");
    } else {
      $(".tutorial").css("display", "block");
      $(".activeGame").css("display", "none");
      endGame();
    }
    $(".game").slideDown(function complete(){
      startGame(thisBtn);
    });
  });
  prevSelectedBtn = thisBtn;
}

function startGame(difficulty){
  switch(difficulty){
    case "easy-btn":
      //game
      /* need to generate random arrow, set value of arrow created to a variable and put it
       * into an array. From there, I need to generate another random arrow and put it's value
       * into the same array at index [1]. Then compare the the value of the arrow at index [0]
       * with the user's input. Probably will look something like this:
       arrowValues[generateRandomArrow()];
       */
       console.log("game begins");
       beginGame();
       //alert(userInput);
       /* Placeholder code
          if(userInput.isWrong()){
            clearInterval(game);
          }
        */
      break;
    case "normal-btn":
      //game
      arrowValues[2] = generateRandomArrow();
      break;
    case "hard-btn":
      //game
      arrowValues[2] = generateRandomArrow();
      arrowValues[3] = generateRandomArrow();
      break;
    case "impossible-btn":
      //game
      break;
    default:
      break;
  }
}

function beginGame(){
    //alert(userInput);
    score = 0;
    console.log("score initiated: " + score);
    displayArrows();
    //game = setInterval(displayArrows, 2000);
}

function endGame(){
    console.log("game over");
    clearArrowDisplay();
    clearInterval(game);
}

function displayArrows(){
    clearArrowDisplay();

    if(score == 1){
      advanceArrowArray();
      //score++;
    }

    switch(arrowValues[arrowValues.length - 3]){
      case 37:
        $("#leftarrow").fadeIn();
        break;
      case 38:
        $("#uparrow").fadeIn();
        break;
      case 39:
        $("#rightarrow").fadeIn();
        break;
      case 40:
        $("#downarrow").fadeIn();
        break;
      default:
        break;
    }

    if(score > 0){
      console.log("score is currently: " + score);
      setTimeout(checkUserInput, 2000);
    } else {
      //advanceArrowArray();
      console.log("this should only happen once");
      score++;
      setTimeout(displayArrows, 2000);
    }

}

function advanceArrowArray() {
  //should work for all game types now, but this is broken at the moment.
  //this is currently asking the user to predict the future - need to make this happen only if they get the first one right
  /* for(i = 0; i < arrowValues.length; i++){
    arrowValues[i] = arrowValues[i + 1];
  }
  arrowValues[arrowValues.length - 1] = generateRandomArrow(); */
  console.log("arrow array advanced");
  console.log(arrowValues);
  arrowValues.push(generateRandomArrow());
}

function checkUserInput(){
    /*$(document).keydown(function (keypressed){
      userInput = keypressed.keyCode;
    });*/

    console.log("the game is expecting: " + arrowValues[arrowValues.length - 3] + " current input is: " + userInput);
    if ((userInput != arrowValues[arrowValues.length - 3]) && (score > 0)){
        console.log("this is happening so the value of the arrowArray is: " + arrowValues + " and the user input is: " + userInput);
        //console.log(arrowValues[0]);
        endGame();
    } else {
      score++;
      advanceArrowArray();
      displayArrows();
    }
}

function clearArrowDisplay(){
    $("#leftarrow").css("display", "none");
    $("#uparrow").css("display", "none");
    $("#rightarrow").css("display", "none");
    $("#downarrow").css("display", "none");
}

function generateRandomArrow(){
  /* keycodes for arrows are 37-40 - want to generate a random number between those.
   */
   return Math.floor(Math.random() * (41 - 37) + 37);
}
