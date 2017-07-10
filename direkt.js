$(document).ready(handleButtonClicks);

var prevSelectedBtn = null;
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
}

function transition(thisBtn){
  $(".game").slideUp(function complete(){
    if(thisBtn != "how-to-play-btn"){
      $(".tutorial").css("display", "none");
      $(".activeGame").css("display", "block");
    } else {
      $(".tutorial").css("display", "block");
      $(".activeGame").css("display", "none");
    }
    $(".game").slideDown(function complete(){
      startGame(thisBtn);
    });
  });
  prevSelectedBtn = thisBtn;
}


var arrowValues = [generateRandomArrow(), generateRandomArrow()];
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
       var game = setInterval(displayArrows, 2000);
       /* Placeholder code
          if(userInput.isWrong()){
            clearInterval(game);
          }
        */
      break;
    case "normal-btn":
      //game
      break;
    case "hard-btn":
      //game
      break;
    case "impossible-btn":
      //game
      break;
    default:
      break;
  }
}

function displayArrows(){
    //need to display images or something in the mean time
    clearArrowDisplay();
    //alert(arrowValues[0]);
    switch(arrowValues[0]){
      case 37:
        $("#leftarrow").css("display", "block");
        break;
      case 38:
        $("#uparrow").css("display", "block");
        break;
      case 39:
        $("#rightarrow").css("display", "block");
        break;
      case 40:
        $("#leftarrow").css("display", "block");
        break;
      default:
        break;
    }
    arrowValues[0] = arrowValues[1];
    arrowValues[1] = generateRandomArrow();
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
