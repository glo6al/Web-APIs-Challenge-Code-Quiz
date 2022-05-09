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
    choices: ["<scripting>", "<js>", "script", "javascript"],
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
      "<script src='xxx.js'",
      "<script name='xxx.js'",
      "<script href='xxx.js'",
      "<a href='xxx.js'",
    ],
    answer: "<script src='xxx.js'",
  },
];

//add event listener to start quiz and begin countdown
timerEl = addEventListener("click", function () {
  //if number equals 0 then begin countdown from 75
  if (timeStops === 0) {
    //add function to show time lift -- countdown by 1000ms
    timeStops = setInterval(function () {
      timeStartCount--;
      timeLeft.textContent = "Time: " + countLeft;
      //stop the countdown when time reaches zero
      if (countLeft <= 0) {
        clearInterval(timeStops);
        timesUp();
      }
    }, 1000);
  }
  //call function to cycle through questions
  quizLoop();
});
//add function with loop   quizLoop();    to cycle through questions
function quizLoop() {
  //connect this function to quizDisplay and createList variables, connecting them to innerHTML
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
  //execute function for each item in questionArray
  currentChoices.forEach(function (newItem) {
    //add vaiable to create new list item
    var choicesList = document.createElement("li");
    //add new list of choices in text content
    choicesList.textContent = newItem;
    quizDisplay.appendChild(createList);
    createList.appendChild(choicesList);
    choicesList.addEventListener("click", checkAnswer);
  });
}

//add function to check for corrent answers
//add end function to end quiz "timesUp" and open highscore.html file
