$(document).ready(function () {


    // timer
    var count = 120;
    var interval = setInterval(function(){
      $("#timer")[0].innerHTML=count;
      $("#timer").html("<h3>Time Remaining: " + count + " seconds</h3>");
      count--;
      if (count === 0){
        clearInterval(interval);
        $("#timer")[0].innerHTML='Done';
        // or...
        alert("You're out of time!");
        showResults();
      }
    }, 1000);

    // quiz variables
    var quizContainer = $("#quiz")[0];
    var resultsContainer = $("#results")[0];
    var submitButton = $("#submit")[0];
    var myQuestions = [
        {
            question: "How much does the largest rubber band ball weigh?",
            answers: {
                a: "1,369 lbs",
                b: "2,508 lbs",
                c: "2 lbs",
            },
            correctAnswer: "b"

        },
       
        {
            question: "Who is credited for discovering natural rubber?",
            answers: {
                a: "Abraham Lincoln",
                b: "George Washington",
                c: "Chrisopher Columbus",
            },
            correctAnswer: "c"
        },
        {
            question: "Who coined the term rubber?",
            answers: {
                a: "John Prine",
                b: "John Mayer",
                c: "John Priestly",
            },
            correctAnswer: "c"
        },
        {
            question: "Who is the biggest consumer of rubber bands on earth?",
            answers: {
                a: "US Postal Service",
                b: "UPS",
                c: "FedEx",
            },
            correctAnswer: "a"
        },
        {
            question: "About how much did Pablo Escobar spend on rubber bands every month?",
            answers: {
                a: "$400",
                b: "$1,500",
                c: "$2,500",
            },
            correctAnswer: "c"
        }
    ];




    function buildQuiz() {
        // we'll need a place to store the HTML output
        var output = [];

        // for each question...
        myQuestions.forEach((currentQuestion, questionNumber) => {
            // we'll want to store the list of answer choices
            var answers = [];

            // and for each available answer...
            for (letter in currentQuestion.answers) {
                // ...add an HTML radio button
                answers.push(
                    `<label>
                  <input type="radio" name="question${questionNumber}" value="${letter}">
                  ${letter} :
                  ${currentQuestion.answers[letter]}
                </label>`
                );
            }

            // add this question and its answers to the output
            output.push(
                `<div class="question"> ${currentQuestion.question} </div>
              <div class="answers"> ${answers.join("")} </div>`
            );
        });

        // finally combine our output list into one string of HTML and put it on the page
        quizContainer.innerHTML = output.join("");
    }

    function showResults() {
        // gather answer containers from our quiz
        var answerContainers = quizContainer.querySelectorAll(".answers");
 
        // keep track of user's answers
        let numCorrect = 0;

        // for each question...
        myQuestions.forEach((currentQuestion, questionNumber) => {
            // find selected answer
            var answerContainer = answerContainers[questionNumber];
            var selector = `input[name=question${questionNumber}]:checked`;
            var userAnswer = (answerContainer.querySelector(selector) || {}).value;

            // if answer is correct
            if (userAnswer === currentQuestion.correctAnswer) {
                // add to the number of correct answers
                numCorrect++; 
            } 
        });

        // show number of correct answers out of total
        resultsContainer.innerHTML = `${numCorrect} out of ${myQuestions.length}`;
    }

    function stop () {
        clearInterval(interval);
    };



    // display quiz 
    buildQuiz();
    
    

    // on submit, show results, stop timer
    submitButton.addEventListener("click", showResults, stop);
    // $("#showResults").click("#submit");


})    