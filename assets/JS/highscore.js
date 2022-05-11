//DECLARE VARIABLES
var highScoreList = document.querySelector("#highhighScoreList");
var clearScoreboard = document.querySelector("#reset");
var restartQuiz = document.querySelector("#restart");

//EVENT LISTENER TO CLEAR SCOREBOARD
clearScoreboard.addEventListener("click", function () {
  localStorage.clear();
  location.reload();
});

//GET LOCAL DATA
var scoreboard = localStorage.getItem("storedScores");
var unStringScore = JSON.parse(scoreboard);
console.log("saved scores " + unStringScore);

if (scoreboard !== null) {
  for (var i = 0; i < scoreboard.length; i++) {
    var scoreItem = document.createElement("li");
    scoreItem.textContent =
      unStringScore.initials + " : " + unStringScore.score;
    highScoreList.appendChild(scoreItem);
  }
}

//EVENT LISTENER TO GO BACK TO INDEX HTML
restartQuiz.addEventListener("click", function () {
  window.location.replace("./index.html");
});
