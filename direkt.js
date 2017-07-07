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
    } else {
      $(".tutorial").css("display", "block");
    }
    $(".game").slideDown(function complete(){
      startGame(thisBtn);
    });
  });
  prevSelectedBtn = thisBtn;
}

// var arrowValues = [];
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
       var arrowValues = [generateRandomArrow(), generateRandomArrow()];
       displayArrows(arrowValues);
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

function displayArrows(arrowValues){
    //need to display images or something in the mean time
}
function generateRandomArrow(){
  /* keycodes for arrows are 37-40 - want to generate a random number between those.
   */
   return Math.floor(Math.random() * (41 - 37) + 37);
}
