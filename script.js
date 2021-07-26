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
