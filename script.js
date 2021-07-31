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



// Randomize wrong answer//
//const questions.answer = Math.floor(Math.random()*3) +1;



// API Quiz Function & Vars // 

/*
var one = document.querySelector("#one")
var two = document.querySelector("#two")
var three = document.querySelector("#three")
var four = document.querySelector("#four")
var quiz = document.querySelector("#quiz")
var  difficulty = document.querySelector("#difficulty")
quiz.innerHTML = "test"


 fetch ("https://opentdb.com/api.php?amount=1")
    .then(function (response) {
    return response.json();
    })
    .then(function (data) {
      console.log(data)
      useAPIData(data)
    })

    .then(data => {
      var oneValue = data.results[0]["correct_answer"];
      var twoValue = data.results[0]["incorrect_answers"];
      var threeValue = data.results[0]["incorrect_answers"];
      var fourValue = data.results[0]["incorrect_answers"];
      var quizValue = data.results[0]["question"];
      var categoryValue = data.results[0]["category"];
      var difficultyValue = data.results[0]["difficulty"];

      one.innerHTML= oneValue;
      two.innerHTML = twoValue;
      three.innerHTML = threeValue;
      four.innerHTML = fourValue;
      quiz.innerHTML = quizValue;
      category.innerHTML = categoryValue;
      difficulty.innerHTML = difficultyValue;

      function useApiData (data) {
        document.querySelector("#trivia").innerHTML = 'Question: ${data.results[0].question}'
      }
    })
      
    .catch(err => alert ("not working"))
*/

getQuizApi(9, "easy")
var quizQuestion = document.querySelector("#quizQuestion")
var quizAnswers = document.getElementsByClassName("answerButtons")
var menuSubmit = document.querySelector("#menuSubmit")
var userScore = 0;


function getQuizApi(topic, difficulty) {
var requestUrl = "https://opentdb.com/api.php?amount=50&category=" + topic + "&difficulty=" + difficulty + "&type=multiple"
  fetch(requestUrl)
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
    console.log(data)
    var i = Math.floor(Math.random() * data.results.length)
    quizQuestion.innerHTML = data.results[i].question; //quiz question is the div for displaying the question
    var answers = [data.results[i].correct_answer, data.results[i].incorrect_answers[0],data.results[i].incorrect_answers[1],data.results[i].incorrect_answers[2]]
    var randomizedAnswers = answers.sort(() => Math.random() - .5)//this is a fancy function that I found to randomize questions
      for (var t= 0; t < 4; t++){
      quizAnswers[t].innerHTML= randomizedAnswers[t] //quiz answers is the class representing
      }
      for(var g = 0; g < 4 ; g++) {
      var quizButtons = quizAnswers[g];
      quizButtons.onclick = function() {
      if (this.innerHTML === data.results[i].correct_answer){
      console.log("Correct")
      userScore++; //We can have a variable to tally up user score
      
     }
      else {
      console.log("incorrect")
      }
      }
      }
   })
}
