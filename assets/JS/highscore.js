//DECLARE VARIABLES
var highScoreList = document.querySelector("#highScoreList");
var clearScoreboard = document.querySelector("#reset");
var restartQuiz = document.querySelector("#restart");

//retrieve local data
var scoreboard = localStorage.getItem("highScores");
var unStringScore = JSON.parse(scoreboard);

if (scoreboard !== null) {
  for (var i = 0; i < scoreboard.length; i++) {
    var scoreInitials = document.createElement("li");
    scoreInitials.textContent =
      unStringScore.initials + " : " + unStringScore.score;
    highScoreList.appendChild(scoreInitials);
    break;
  }
}
//add event listener to clear button
clearScoreboard.addEventListener("click", function () {
  localStorage.clear();
  location.reload();
});

//EVENT LISTENER TO GO BACK TO INDEX HTML
restartQuiz.addEventListener("click", function () {
  window.location.replace("./index.html");
});
un