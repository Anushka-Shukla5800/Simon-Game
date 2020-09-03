var gamePattern = [];
var buttonColours = ["red", "blue", "green", "yellow"];
var userClickedPattern = [];
var level = -1;
var started = 0;
$(document).on("keypress", function() {
  if (started == 0) {
    started = 1;
    nextSequence();
  }
});

function checkAnswer(currentLevel) {
  if (userClickedPattern[currentLevel] === gamePattern[currentLevel]) {
    if(userClickedPattern.length===gamePattern.length){
      setTimeout(nextSequence, 1000);
    }
    // var flag = 0;
    // for (var i = gamePattern.length - 1; i > -1; i--) {
    //   if (userClickedPattern[i] != gamePattern[i]) {
    //     flag = 1;
    //     break;
    //   }
    // }
    // if (flag == 0) {
    //   setTimeout(nextSequence, 1000);
    //   userClickedPattern = [];
    // } else if (flag == 1) {
    //   var wrong = new Audio("sounds/wrong.mp3");
    //   wrong.play();
    //   $("body").addClass("game-over");
    //   setTimeout(function() {
    //     $("body").removeClass("game-over");
    //   }, 200);
    //   $("h1").text("Game Over, Press Any Key to Restart");
    //   startOver();
    // }
  }
  else {
    var wrong = new Audio("sounds/wrong.mp3");
    wrong.play();
    $("h1").text("Game Over, Press Any Key to Restart");
    $("body").addClass("game-over");
    setTimeout(function() {
      $("body").removeClass("game-over");
    }, 200);
    startOver();
  }

}

function startOver() {
  level = -1;
  gamePattern = [];
  started = 0;
  userClickedPattern=[];
}

function nextSequence() {
  userClickedPattern=[];
  level++;
  $("h1").text("Level " + level);
  var randomNumber = Math.floor(Math.random() * 4);
  var randomChosenColour = buttonColours[randomNumber];
  gamePattern.push(randomChosenColour);
  $("#" + randomChosenColour).fadeOut(100).fadeIn(100);
  playSound(randomChosenColour);


}

$(".btn").on("click", function(event) {
  var userChosenColour = event.target.id;
  userClickedPattern.push(userChosenColour);
  animatePress(userChosenColour);
  playSound(userChosenColour);
  // if(userClickedPattern.length==gamePattern.length)
    checkAnswer(userClickedPattern.length - 1);
});

function playSound(name) {
  switch (name) {
    case "green":
      var greenSound = new Audio("sounds/green.mp3");
      greenSound.play();
      break;
    case "red":
      var redSound = new Audio("sounds/red.mp3");
      redSound.play();
      break;
    case "yellow":
      var yellowSound = new Audio("sounds/yellow.mp3");
      yellowSound.play();
      break;
    case "blue":
      var blueSound = new Audio("sounds/blue.mp3");
      blueSound.play();
      break;
    default:

  }
}

function animatePress(currentColour) {
  $("#" + currentColour).addClass("pressed");
  setTimeout(function() {
    $("#" + currentColour).removeClass("pressed");
  }, 100);
}
