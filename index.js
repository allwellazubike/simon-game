
alert("Welcome to the Simon Game!\n\nWatch the sequence of colors, then repeat it by tapping the buttons in the same order. The sequence gets longer each round. Make a mistake, and the game is over!\n\nTap anywhere to start.");

//button array list
var buttonColours = ["red", "blue", "green", "yellow"];
var gamePattern = [];
var userClickedPattern = [];


function nextSequence() {
  var randomNumber = Math.floor(Math.random() * 4);
  var randomChosenColour = buttonColours[randomNumber];

  gamePattern.push(randomChosenColour);

  level++; // increase level
  $("#level-title").text("Level " + level);

  // Play the full sequence (including the new color)
  playSequence();
}

// This function plays the full gamePattern sequence with a delay between each color
function playSequence() {
  for (let i = 0; i < gamePattern.length; i++) {
    setTimeout(function() {
      flashbutton(gamePattern[i]);
      playSound(gamePattern[i]);
    }, 600 * i); // 600ms interval between flashes
  }
}


//sets the current level 
var level = 0;

// calls the nextsequence when the keyboard is pressed 
var started = false;
$(document).one("keydown touchstart", function() {
    if (!started) {
        setTimeout(nextSequence, 700);
        started = true;
        console.log("Game started");
    }
});


// this function creates the flashing animation for the "color"
function flashbutton(color) {
    $("#" + color)
    .fadeOut(100)
    .fadeIn(100)
    .fadeOut(100)
    .fadeIn(100);
}

function playSound(name) {
  var audio = new Audio("sounds/" + name + ".mp3");
  audio.play();
}

//adds an event listener to all buttons and takes
// the color of the button and stores it in a var
$(".btn").on("touchstart mousedown", function (e) {
  e.preventDefault(); // Prevent mobile delay and ghost click

  var userChosenColour = $(this).attr("id");
  userClickedPattern.push(userChosenColour);
  checkAnswer(userClickedPattern.length - 1);
  console.log(userClickedPattern);
  playSound(userChosenColour);
  flashbutton(userChosenColour);
});



function checkAnswer(currentLevel) {
  if (userClickedPattern[currentLevel] === gamePattern[currentLevel]) {
    // User got this step right
    console.log("success");

    // Check if user has finished the sequence
    if (userClickedPattern.length === gamePattern.length) {
      // Wait 1 second before calling nextSequence to add next color
      setTimeout(function() {
        nextSequence();
      }, 1000);

      // Reset userClickedPattern for next level
      userClickedPattern = [];
    }
  } else {
    // User made a mistake
    playSound("wrong");
    console.log("wrong");
    $("#level-title").text("Game Over, Press Any Key to Restart");
    startOver();

   //adds the class for the game over css
    $("body").attr("class", "game-over")
    setTimeout(function() {$("body").removeClass("game-over");},
      200);

    // You can add game over logic here later
  }
}

function startOver() {
  gamePattern = [];
  userClickedPattern = [];
  level = 0;
  started = false;
}

