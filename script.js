//Declarations of all buttons



let showScreen = function (screen) {
  //prevent page from reloading on form submission
  window.event.preventDefault();
  document.getElementById("home").classList.remove("active");
  document.getElementById("scores").classList.remove("active");
  //  when menu is clicked show underline
  if (screen === "menu") {
    document.getElementById("home").classList.add("active");
    //  when High Scores is clicked show underline
  } else if (screen === "highScores") {
    document.getElementById("scores").classList.add("active");
  }
  document.getElementById("menu").style.display = "none";
  document.getElementById("trivia").style.display = "none";
  document.getElementById("highScores").style.display = "none";
  //display menu, trivia, High Scores sections when click
  document.getElementById(screen).style.display = "block";
};

//All functions on page load
 




//Event Functionality of all Buttons




//API for getting a random GIF from a max list of 25 based on the search criteria entered. Will attach source to any element entered

function getGIF(searchItem, gifEl) {

  var requestUrl = "https://api.giphy.com/v1/gifs/search?api_key=0pXpAzRY9RmZGboXjvmC9uwTPKv6JApT&q=" + searchItem + "&limit=25&offset=0&rating=pg-13&lang=en"

  fetch(requestUrl)
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
    console.log(data)
    var i = Math.floor(Math.random() * data.data.length)
    console.log(i)
    var randomGif = data.data[i].images.downsized.url
    gifEl.setAttribute("src", randomGif)
    })
} 



//other functions


