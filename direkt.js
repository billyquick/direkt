$(document).ready(handleButtonClicks);

var arrowValues = [generateRandomArrow(), generateRandomArrow(), generateRandomArrow()];
var game;
var score;
var userInput;
var prevSelectedBtn;
var currentDifficulty;
var gameInProgress;

//default interval period, but will change as game goes on
var displayInterval = 2000;

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
       currentDifficulty = "easy";
       beginGame();
      break;
    case "normal-btn":
      //game
      currentDifficulty = "normal";
      //arrowValues = [generateRandomArrow(), generateRandomArrow(), generateRandomArrow(), generateRandomArrow()];
      beginGame();
      break;
    case "hard-btn":
      //game
      currentDifficulty = "hard";
      beginGame();
      break;
    case "impossible-btn":
      //game
      currentDifficulty = "impossible";
      break;
    default:
      break;
  }
}

function beginGame(){
    gameInProgress = true;
    score = 0;
    console.log("score initiated: " + score);
    displayArrows();
}

function endGame(){
    console.log("game over");
    clearArrowDisplay();
    clearInterval(game);
    gameInProgress = false;
    //$(".activeGame p").css("display", "block");
}

function displayArrows(){
    //clears input to account for arrows repeating
    userInput = undefined;
    //console.log(currentDifficulty);

    //empties arrow containers
    clearArrowDisplay();
    //$(".activeGame p").css("display", "none");

    //using this to make sure the game doesn't check for userInput before the appropriate arrow is displayed
    //this currently only works for Easy mode, just like the rest of the code for now :thunker:
    if(score == 1){
      advanceArrowArray();
    }

    //displays arrow, but this was tailored for easy mode - may need to revisit this
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

    //I realize this is very redundant - will look at this later
    /* if((score > 0) && (currentDifficulty == "easy")){
      console.log("the game is expecting: " + arrowValues[arrowValues.length - 4]);
      console.log("score is currently: " + score);
      setTimeout(checkUserInput, displayInterval);
    } else if((score > 0) && (currentDifficulty == "normal")){
      console.log("the game is expecting: " + arrowValues[arrowValues.length - 4]);
      console.log("score is currently: " + score);
      setTimeout(checkUserInput, displayInterval);
    } */
    if (score > 0){
      //console.log("the game is expecting: " + arrowValues[arrowValues.length - 4]);
      console.log("score is currently: " + score);
      setTimeout(checkUserInput, displayInterval);
    } else {
      console.log("this should only happen once for Easy");
      score++;
      setTimeout(displayArrows, displayInterval);
    }
    console.log(arrowValues);
}

function advanceArrowArray() {
  console.log("arrow array advanced");
  //console.log(arrowValues);
  arrowValues.push(generateRandomArrow());
}

function checkUserInput(){
    //this currently only works for Easy mode
    if ((userInput != arrowValues[arrowValues.length - 4]) && (currentDifficulty == "easy")){
      console.log("game ended. arrowArray is: " + arrowValues + " and the user input is: " + userInput);
      endGame();
    } else if ((userInput != arrowValues[arrowValues.length - 5]) && (currentDifficulty == "normal")){
      console.log("game ended. arrowArray is: " + arrowValues + " and the user input is: " + userInput);
      endGame();
    } else if ((userInput != arrowValues[arrowValues.length - 6]) && (currentDifficulty == "hard")){
      console.log("game ended. arrowArray is: " + arrowValues + " and the user input is: " + userInput);
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
