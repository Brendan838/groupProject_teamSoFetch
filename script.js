//score variables
var scoreObject = {
  Username: [],
  Category: [],
  Difficulty: [],
  Score: [],

};
var storedScores = JSON.parse(localStorage.getItem("scores"));
var tableRows = document.getElementsByClassName("tableRows")
var highScoreMain = document.querySelector("#scores")
var scoreHeader = document.querySelector("#scoreHeader");

//trivia screen variable
var quizQuestion = document.querySelector("#quizQuestion");
var quizAnswers = document.getElementsByClassName("answerButtons");
var submitButton = document.querySelector("#submitButton");
var disp = document.getElementById("display");
var count = 0;
var lives = 3;
//gifScreen variables
var gifScreen = document.querySelector("#gifScreen");
var gifDisplay = document.querySelector("#gifDisplay");
var trivia = document.querySelector("#trivia");
var gifScreenMessage = document.querySelector("#gifScreenMessage");
var correctArray = [
"Dancing",
"Applause",
"yay",
"Party",
"Celebration",
"Yas",
"tears of joy"
]
var incorrectArray = [
"Angry",
"yikes",
"wrong",
"stupid",
"sad",
"fail",
"fool",
]
var gifIndex = Math.floor(Math.random() * 8)

//homescreen variables
var topicDropDown = document.querySelector("#topicDropDown");
var dropDownName = document.getElementsByClassName("dropDownName")
var difficultyDropDown = document.querySelector("#difficulty");
var userName = document.querySelector("#name")

submitButton.onclick = function () {
  var t = topicDropDown.value;
  var d = difficultyDropDown.value;
  console.log(t)
  console.log(d)
  getQuizApi(t, d);
};
//high score screen click
printScores()
//All functions on page load
let showScreen = function (screen) {
  //prevent page from reloading on form submission
  window.event.preventDefault();
  document.getElementById("menu").style.display = "none";
  document.getElementById("trivia").style.display = "none";
  document.getElementById("highScores").style.display = "none";
  document.getElementById("home").classList.remove("active");
  document.getElementById("scores").classList.remove("active");
  //  when menu is clicked show underline
  if (screen === "menu") {
    document.getElementById("home").classList.add("active");
    //  when High Scores is clicked show underline
  } else if (screen === "highScores") {
    document.getElementById("scores").classList.add("active");
  }
  //display menu, trivia, High Scores sections when click
  document.getElementById(screen).style.display = "block";
};

//API for getting a random GIF from a max list of 25 based on the search criteria entered. Will attach source to any element entered

function getGIF(searchItem, gifEl) {
  var requestUrl =
    "https://api.giphy.com/v1/gifs/search?api_key=0pXpAzRY9RmZGboXjvmC9uwTPKv6JApT&q=" +
    searchItem +
    "&limit=50&offset=0&rating=pg-13&lang=en";

  fetch(requestUrl)
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      console.log(data);
      var i = Math.floor(Math.random() * data.data.length);
      console.log(i);
      var randomGif = data.data[i].images.downsized.url;
      gifEl.setAttribute("src", randomGif);
    });
}

//function for storing high scores

function addScore(u, c, d, s) {
  if (storedScores !== null) {
    storedScores.Username.unshift(u);
    storedScores.Category.unshift(c)
    storedScores.Difficulty.unshift(d)
    storedScores.Score.unshift(s);
    localStorage.setItem("scores", JSON.stringify(storedScores));
  } else {
    scoreObject.Username.unshift(u);
    scoreObject.Category.unshift(c)
    scoreObject.Difficulty.unshift(d)
    scoreObject.Score.unshift(s);
    localStorage.setItem("scores", JSON.stringify(scoreObject));
    storedScores = JSON.parse(localStorage.getItem("scores"));
  }
}
//function for printing high scores
function printScores() {
  if (storedScores === null) {
    scoreHeader.textContent = "There are no high scores yet. Play a quiz!";
  } else {
    for (var i = 0; i < storedScores.Username.length; i++) {
      var indexNumber = (storedScores.Category[i]-9)
      console.log(indexNumber)
      var tr1 = document.createElement("td")
      var tr2 = document.createElement("td")
      var tr3 = document.createElement("td")
      var tr4 = document.createElement("td")
      tr1.textContent = storedScores.Username[i]
      tr2.textContent = dropDownName[indexNumber].textContent
      tr3.textContent = storedScores.Difficulty[i]
      tr4.textContent = storedScores.Score[i]
      tableRows[i].appendChild(tr1)
      tableRows[i].appendChild(tr2)
      tableRows[i].appendChild(tr3)
      tableRows[i].appendChild(tr4)
     
      
    }
  }
}

//Quiz API

function getQuizApi(topic, difficulty) {
  var requestUrl =
    "https://opentdb.com/api.php?amount=20&category=" +
    topic +
    "&difficulty=" +
    difficulty +
    "&type=multiple";
    console.log(topic)
    console.log(difficulty)
  fetch(requestUrl)
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      console.log(data);
      var i = Math.floor(Math.random() * data.results.length);
      quizQuestion.innerHTML = data.results[i].question; //quiz question is the div for displaying the question
      var answers = [
        data.results[i].correct_answer,
        data.results[i].incorrect_answers[0],
        data.results[i].incorrect_answers[1],
        data.results[i].incorrect_answers[2],
      ];
      var randomizedAnswers = answers.sort(() => Math.random() - 0.5); //this is a fancy function that I found to randomize questions
      for (var t = 0; t < 4; t++) {
        quizAnswers[t].innerHTML = randomizedAnswers[t]; //quiz answers is the class representing
      }
      for (var g = 0; g < 4; g++) {
        var quizButtons = quizAnswers[g];
        quizButtons.onclick = function () {
          if (this.innerHTML === data.results[i].correct_answer) {
            console.log("Correct");
            count++ , disp.innerHTML = count; //We can have a variable to tally up user score
            showGifScreen(correctArray[gifIndex], "Correct!");
            getQuizApi(topic, difficulty);
          } else {
            lives--;
            showGifScreen(incorrectArray[gifIndex], "Wrong! The correct answer was: " + data.results[i].correct_answer + ".")
            getQuizApi(topic, difficulty);
            var c = topicDropDown.value;
            var d = difficultyDropDown.value;
            var u = userName.value;
            var s = userScore
            addScore(u, c, d, s)
          }
        };
      }
    });
}

function showGifScreen(searchItem, message) {
  getGIF(searchItem, gifDisplay);
  trivia.style.display = "none";
  gifScreenMessage.textContent = message;
  gifScreen.style.display = "block";
  setTimeout(function () {
    trivia.style.display = "block";
    gifScreen.style.display = "none";
  }, 4000);
}

function gameOver(){
userScoreFinal = userScore * 10
trivia.style.display = "none";
gifScreen.style.display = "block"
gifScreenMessage.textContent = "Game over! You scored " + userScoreFinal + " points."
getGIF("That's All Folks", gifDisplay)
}
