$(document).ready(function () {
    var handler;

   


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
                a: "1,369 lbs<br />",
                b: "2,508 lbs<br />",
                c: "2 lbs<br /><br />",
            },
            correctAnswer: "b"

        },
       
        {
            question: "Who is credited for discovering natural rubber?<br />",
            answers: {
                a: "Abraham Lincoln<br />",
                b: "George Washington<br />",
                c: "Chrisopher Columbus<br /><br />",
            },
            correctAnswer: "c"
        },
        {
            question: "Who coined the term rubber?<br />",
            answers: {
                a: "John Prine<br />",
                b: "John Mayer<br />",
                c: "John Priestly<br /><br />",
            },
            correctAnswer: "c"
        },
        {
            question: "Who is the biggest consumer of rubber bands on earth?<br />",
            answers: {
                a: "US Postal Service<br />",
                b: "UPS<br />",
                c: "FedEx<br /><br />",
            },
            correctAnswer: "a"
        },
        {
            question: "About how much did Pablo Escobar spend on rubber bands every month?<br />",
            answers: {
                a: "$400<br />",
                b: "$1,500<br />",
                c: "$2,500<br />",
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
        resultsContainer.innerHTML = `You scored ${numCorrect} out of ${myQuestions.length} correct!`;
    }

    function stop () {
        clearInterval(count);
    };

    



    // display quiz 
    buildQuiz();
    stop();
    
    
    // on submit, show results, stop timer
    submitButton.addEventListener("click", showResults, stop);
   

})    