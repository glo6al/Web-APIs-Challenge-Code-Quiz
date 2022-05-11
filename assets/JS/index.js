// declare variabls
var questionIndex = 0;
var timerEl = document.querySelector("#startTimer");
var timeLeft = document.querySelector("#timer");
var quizDisplay = document.querySelector("#questionBox");
var containerBox = document.querySelector("#container");
var timeStartCount = 75;
var timeStops = 0;
var penalty = 10;
var createList = document.createElement("ul");
//declare variable possible answers - array
var questionArray = [
  {
    question: "Inside which HTML element do we put the JavaScript?",
    choices: ["<scripting>", "<js>", "<script>", "<javascript>"],
    answer: "<script>",
  },
  {
    question: "Where is the correct place to insert a JavaScript?",
    choices: [
      "at the bottom of the <body> section",
      "within the <head> section",
      "a <div> element",
      "up at the very top",
    ],
    answer: "at the bottom of the <body> section",
  },
  {
    question: "How would you call a function named 'myFunction?'",
    choices: [
      "call function myFunction()",
      "call myFunction()",
      "myFunction()",
      "dial myFunction()",
    ],
    answer: "myFunction()",
  },
  {
    question: "What is the correct syntax of an IF statement?",
    choices: ["if i = 5 then", "if (i === 5)", "if i == 5 then", "if i = 5"],
    answer: "if (i === 5)",
  },
  {
    question:
      "What is the correct syntax for referring to an external script called 'xxx.js'?",
    choices: [
      "<script src='xxx.js>'",
      "<script name='xxx.js>'",
      "<script href='xxx.js>'",
      "<a href='xxx.js>'",
    ],
    answer: "<script src='xxx.js>'",
  },
];

//add event listener to start quiz and begin countdown
timerEl.addEventListener("click", function () {
  timerRun();
  quizLoop();
});

//add function to start countdown
function timerRun() {
  //if number equals 0 then begin countdown from 75
  if (timeStops === 0) {
    //add function to show time lift -- countdown by 1000ms
    timeStops = setInterval(function () {
      timeStartCount--;
      timeLeft.textContent = "Time: " + timeStartCount;
      //stop the countdown when time reaches zero
      if (timeStartCount <= 0) {
        clearInterval(timeStops);
        timesUp();
      }
    }, 1000);
  }
}

//add function with loop   quizLoop();    to cycle through questions
function quizLoop() {
  //add function to quizDisplay and createList variables, connecting them to innerHTML
  quizDisplay.innerHTML = "";
  createList.innerHTML = "";
  //add for loop to loop through the array of questions
  for (var i = 0; i < questionArray.length; i++) {
    //add variable for current question
    var currentQuestion = questionArray[questionIndex].question;
    //add variable for answer choices
    var currentChoices = questionArray[questionIndex].choices;
    //display the current question as text content
    quizDisplay.textContent = currentQuestion;
  }
  //add function to display/append new question and choices to list
  currentChoices.forEach(function (newItem) {
    //add vaiable to create new list
    var choicesList = document.createElement("li");
    //add new list of choices in text content
    choicesList.textContent = newItem;
    //append new content to question box
    quizDisplay.appendChild(createList);
    //append new choices to question box
    createList.appendChild(choicesList);
    //add event listener for selected choice
    choicesList.addEventListener("click", confirmCorrect);
  });
}

//add function to check for correct answers
function confirmCorrect(clickChoice) {
  //add variable for clicked choice
  var selected = clickChoice.target;
  //if correct answer go to the next question
  if (selected.textContent === questionArray[questionIndex].answer) {
    questionIndex++;

    // var displayCorrect = function () {
    //   displayCorrect.createElement("div");
    //   displayCorrect.setAttribute("class", "correctAnswer");
    //   displayCorrect.textContent = "Correct!";
    // };
    //console.log("correctAnswer");

    //if incorrect subtract penalty and go to the next question
  } else {
    timeStartCount = timeStartCount - penalty;
    questionIndex++;
  }
  //when all questions have been answered end the quiz
  if (questionIndex === questionArray.length) {
    clearInterval(timeStops);
    timesUp();
    //if the quiz isnt fisnished keep looping through the quiz
  } else {
    quizLoop(questionIndex);
  }
}

//add end function to end quiz "timesUp" and open highscore.html file
function timesUp() {
  quizDisplay.innerHTML = "";
  timeLeft.innerHTML = "";

  //declare variable and text content for h1
  var timesUpTitle = document.createElement("h1");
  //set attribute of id timesUpTitle for new element
  timesUpTitle.setAttribute("id", "timesUpTitile");
  //add text contnent to new element
  timesUpTitle.textContent =
    "Congratulations! Please enter your initials to add your score to High Scores.";

  //append the new h1 element to quizDisplay
  quizDisplay.appendChild(timesUpTitle);

  //declare variable to display the users score
  var userScore = timeStartCount;
  //create new element to display the user score
  var scoreDisplay = document.createElement("p");
  //clear timer display
  clearInterval(timeStops);
  //display the user score
  scoreDisplay.textContent = "You scored: " + userScore;

  //append the user score to quizDisplay
  quizDisplay.appendChild(scoreDisplay);

  //add input for user initials to input field
  var userInitials = document.createElement("input");
  //set attribute for the user intiials
  userInitials.setAttribute("type", "text");
  //set attribute for element id
  userInitials.setAttribute("id", "initials");
  //set text content to retrieve the user initials
  userInitials.textContent = "";

  //append the user intitials to quizDisplay
  quizDisplay.appendChild(userInitials);

  //add submit button for score input
  submitScore = document.createElement("button");
  //add type attribute to the submit button
  submitScore.setAttribute("type", "submit");
  //add attributes to the submit button
  submitScore.setAttribute("id", "submit");
  submitScore.innerHTML = "Submit";

  //append the submit button to the element it just created
  quizDisplay.appendChild(submitScore);

  //add event listener to submit button and store to local data
  submitScore.addEventListener("submit", function () {
    var initialsInput = scoreDisplay.value;

    if (initialsInput === "") {
      alert("Please enter your intiials.");
    } else {
      var userFinalScore = {
        initials: initialsInput,
        score: timeStartCount,
      };
      localStorage.setItem("highScores", JSON.stringify(userFinalScore));
      //open highscore.html
      window.open("../highscore.html");
    }
  });
}
