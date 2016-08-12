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
    $(".game").slideDown();
  });
  prevSelectedBtn = thisBtn;
}
