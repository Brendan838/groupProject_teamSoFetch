//score variables
var scoreObject = {
  username: [],
  score: [],
};
var storedScores = JSON.parse(localStorage.getItem("scores"));
var scoreEl = document.querySelector("#scoreEl");
var scoreHeader = document.querySelector("#scoreHeader");
var gifTest = document.querySelector("#gifTest");

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

function addScore(userInit, highScore) {
  if (storedScores !== null) {
    storedScores.username.unshift(userInit);
    storedScores.score.unshift(highScore);
    localStorage.setItem("scores", JSON.stringify(storedScores));
  } else {
    scoreObject.username.unshift(userInit);
    scoreObject.score.unshift(highScore);
    localStorage.setItem("scores", JSON.stringify(scoreObject));
    storedScores = JSON.parse(localStorage.getItem("scores"));
  }
}
//function for printing high scores
function printScores() {
  if (storedScores === null) {
    scoreHeader.textContent = "There are no high scores yet. Play a quiz!";
  } else {
    for (var i = 0; i < storedScores.username.length; i++) {
      console.log("testing");
      var userDiv = document.createElement("div");
      var scoreDiv = document.createElement("div");
      userDiv.innerHTML = storedScores.username[i];
      scoreDiv.innerHTML = storedScores.score[i];
      scoreEl.append(userDiv);
      scoreEl.append(scoreDiv);
    }
  }
}

//start of the Quiz API//
fetch("https://opentdb.com/api.php?amount=1")
  .then((response) => response.json())
  .then((data) => console.log(data));
function useApiData(data) {
  document.querySelector("#trivia").innerHTML = $("data.results[0].category");
  document.querySelector("#button1").innerHTML = $(
    "data.results[0].correct_answer"
  );
  document.querySelector("#button2").innerHTML = $(
    "data.results[0].incorrect_answers"
  );
  document.querySelector("#button3").innerHTML = $(
    "data.results[0].incorrect_answers"
  );
  document.querySelector("#button4").innerHTML = $(
    "data.results[0].incorrect_answers"
  );
}

let correctButton = document.querySelector("button");

// Randomize wrong answer//
//const questions.answer = Math.floor(Math.random()*3) +1;
