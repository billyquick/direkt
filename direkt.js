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
       console.log("game begins");
       beginGame();
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
    score = 0;
    console.log("score initiated: " + score);
    displayArrows();
}

function endGame(){
    console.log("game over");
    clearArrowDisplay();
    clearInterval(game);
}

function displayArrows(){
    //clears input to account for arrows repeating
    userInput = undefined;

    //empties arrow containers
    clearArrowDisplay();

    //using this to make sure the game doesn't check for userInput before the appropriate arrow is displayed
    //this currently only works for Easy mode, just like the rest of the code for now :thunker:
    if(score == 1){
      advanceArrowArray();
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
  console.log("arrow array advanced");
  //console.log(arrowValues);
  arrowValues.push(generateRandomArrow());
}

function checkUserInput(){
    console.log("the game is expecting: " + arrowValues[arrowValues.length - 4]);
    if ((userInput != arrowValues[arrowValues.length - 4]) && (score > 0)){
        console.log("this is happening so the value of the arrowArray is: " + arrowValues + " and the user input is: " + userInput);
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
  // keycodes for arrows are 37-40 - want to generate a random number between those.
   return Math.floor(Math.random() * (41 - 37) + 37);
}
