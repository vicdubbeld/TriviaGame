$(document).ready(function () {


    // timer
    var count = 120;
    var interval = setInterval(function(){
      $("#timer")[0].innerHTML=count;
      count--;
      if (count === 0){
        clearInterval(interval);
        $("#timer")[0].innerHTML='Done';
        // or...
        alert("You're out of time!")[0];
      }
    }, 1000);

    // quiz variables
    var quizContainer = $("#quiz")[0];
    var resultsContainer = $("#results")[0];
    var submitButton = $("#submit")[0];
    var myQuestions = [
        {
            question: "what color is the sky?",
            answers: {
                a: "blue",
                b: "green",
                c: "purple",
            },
            correctAnswer: "a"

        },
        {
            question: "what color is grass?",
            answers: {
                a: "blue",
                b: "green",
                c: "purple",
            },
            correctAnswer: "b"
        }
    ];




    function buildQuiz() {
        // we'll need a place to store the HTML output
        var output = [];

        // for each question...
        myQuestions.forEach((currentQuestion, questionNumber) => {
            // we'll want to store the list of answer choices
            const answers = [];

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
        const answerContainers = quizContainer.querySelectorAll(".answers");

        // keep track of user's answers
        let numCorrect = 0;

        // for each question...
        myQuestions.forEach((currentQuestion, questionNumber) => {
            // find selected answer
            const answerContainer = answerContainers[questionNumber];
            const selector = `input[name=question${questionNumber}]:checked`;
            const userAnswer = (answerContainer.querySelector(selector) || {}).value;

            // if answer is correct
            if (userAnswer === currentQuestion.correctAnswer) {
                // add to the number of correct answers
                numCorrect++;

                // color the answers green
                answerContainers[questionNumber].style.color = "lightgreen";
            } else {
                // if answer is wrong or blank
                // color the answers red
                answerContainers[questionNumber].style.color = "red";
            }
        });

        // show number of correct answers out of total
        resultsContainer.innerHTML = `${numCorrect} out of ${myQuestions.length}`;
    }

    // display quiz 
    buildQuiz();

    // on submit, show results
    submitButton.addEventListener("click", showResults);



})    