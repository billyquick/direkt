$(document).ready(handleButtonClicks);

var arrowValues;
var game;
var score;
var userInput;
var prevSelectedBtn;
var currentDifficulty;
var gameInProgress;
var displayInterval = 2000;
var minimumDisplayInterval = 1000;
var personalBest = 0;
var impossibleSelection;

/* TO-DO:
 * check issues in the github repo
 */

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
      /* Need to add a check for a different difficulty selections
       * currently players can see the score and replay button when changing difficulties until the slideDown is complete
      if(thisBtn != currentDifficulty){
        $(".activeGame").css("display", "none");
        $(".scoreContainer").css("display", "none");
      } */
      $(".tutorial").css("display", "none");
      $(".activeGame").css("display", "block");
      $(".scoreContainer").css("display", "block");
    } else {
      $(".tutorial").css("display", "block");
      $(".activeGame").css("display", "none");
      $(".scoreContainer").css("display", "none");
      endGame();
    }
    $(".game").slideDown(function complete(){
      startGame(thisBtn);
    });
  });
  prevSelectedBtn = thisBtn;
}

function startGame(difficulty){
  generateArrowArray();
  switch(difficulty){
    case "easy-btn":
       console.log("game begins");
       currentDifficulty = "easy-btn";
       beginGame();
      break;
    case "normal-btn":
      currentDifficulty = "normal-btn";
      beginGame();
      break;
    case "hard-btn":
      currentDifficulty = "hard-btn";
      beginGame();
      break;
    case "impossible-btn":
      currentDifficulty = "impossible-btn";
      getUserImpossibleSelection();
      break;
    default:
      break;
  }
}

function getUserImpossibleSelection(){
    impossibleSelection = +prompt("Please select a number greater than 4.");
    beginGame();
}

function generateArrowArray(){
    arrowValues = [generateRandomArrow(), generateRandomArrow(), generateRandomArrow()];
}

function beginGame(){
    $("#replayimage").css("display", "none");
    gameInProgress = true;
    score = 0;
    console.log("score initiated: " + score);
    displayArrows();
}

function endGame(){
    $("#replayimage").css("display", "block");
    console.log("game over");
    if(score > personalBest){
      personalBest = score;
      document.getElementById('personalBest').innerHTML = "Personal Best: " + personalBest;
    }
    clearArrowDisplay();
    clearInterval(game);
    gameInProgress = false;
}

function displayArrows(){
    //clears input to account for arrows repeating
    userInput = undefined;

    document.getElementById('score').innerHTML = "score: " + score;

    //empties arrow containers
    clearArrowDisplay();

    //using this to make sure the game doesn't check for userInput before the appropriate arrow is displayed
    if(score == 1){
      advanceArrowArray();
    }

    if((score % 5 == 0) && (displayInterval > minimumDisplayInterval)){
      decreaseDisplayInterval();
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

    if (score > 0){
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
  arrowValues.push(generateRandomArrow());
}

function checkUserInput(){
    //this currently only works for Easy mode
    if ((userInput != arrowValues[arrowValues.length - 4]) && (currentDifficulty == "easy-btn")){
      console.log("game ended. arrowArray is: " + arrowValues + " and the user input is: " + userInput);
      endGame();
    } else if ((userInput != arrowValues[arrowValues.length - 5]) && (currentDifficulty == "normal-btn")){
      console.log("game ended. arrowArray is: " + arrowValues + " and the user input is: " + userInput);
      endGame();
    } else if ((userInput != arrowValues[arrowValues.length - 6]) && (currentDifficulty == "hard-btn")){
      console.log("game ended. arrowArray is: " + arrowValues + " and the user input is: " + userInput);
      endGame();
    } else if ((userInput != arrowValues[arrowValues.length - (impossibleSelection + 3)]) && (currentDifficulty == "impossible-btn")){
      console.log("game ended. arrowArray is: " + arrowValues + " and the user input is: " + userInput);
      endGame();
    } else {
      score++;
      advanceArrowArray();
      displayArrows();
    }
}

function replayGame(){
    console.log("current difficulty: " + currentDifficulty);
    startGame(currentDifficulty);
}

function clearArrowDisplay(){
    $("#leftarrow").css("display", "none");
    $("#uparrow").css("display", "none");
    $("#rightarrow").css("display", "none");
    $("#downarrow").css("display", "none");
}

function decreaseDisplayInterval(){
  displayInterval = displayInterval - 100;
}

function generateRandomArrow(){
  // keycodes for arrows are 37-40 - want to generate a random number between those.
   return Math.floor(Math.random() * (41 - 37) + 37);
}
