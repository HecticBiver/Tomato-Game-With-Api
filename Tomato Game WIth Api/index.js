function startTimer(seconds) {
    let timer = seconds;

    timerInterval = setInterval(function () {
        document.getElementById("timer").innerText = "Timer: " + timer;

        if (timer <= 0) {
            clearInterval(timerInterval);
            alert("Time's up! Moving to the next question.");
            startNewSession();
            tomatoApi();
            startTimer(20); // Reset timer to 20 seconds for the new question
        }

        timer--;
    }, 1000);
}

    
function tomatoApi() {
    let apiUrl = "https://marcconrad.com/uob/tomato/api.php";
    fetch(apiUrl)
        .then(res => res.json())
        .then((data) => {
            console.log(data);
            let gameImage = document.getElementById("game");
            gameImage.setAttribute("src", data.question);
            sessionStorage.setItem("correct_answer", data.solution);
        });
}



// Use sessionStorage instead of sessionStorage for scores
var scores = parseInt(sessionStorage.getItem("scores")) || 0;
var wrongAnswers = parseInt(sessionStorage.getItem("wrongAnswers")) || 0;
var timerInterval;

function submitGame() {
    let userInput = document.getElementById("solution").value;
    let correctAnswer = sessionStorage.getItem("correct_answer");

    if (userInput == correctAnswer) {
        scores++;
        console.log("Correct Answer! Scores: " + scores);
        document.getElementById("scores").innerText = scores.toString();
        alert("Correct Answer");
    } else {
        // Provide feedback for incorrect answers, you might display the correct answer here.
        alert("Wrong Answer!! The correct answer is: " + correctAnswer);
        wrongAnswers++;
        console.log("Wrong Answer! Wrong Answers Count: " + wrongAnswers);
        document.getElementById("wrongAnswers").innerText = wrongAnswers.toString();
    }

    // Update sessionStorage with the current scores
    sessionStorage.setItem("scores", scores);
    sessionStorage.setItem("wrongAnswers", wrongAnswers);

    // Reset the input field
    document.getElementById("solution").value = "";


    clearInterval(timerInterval); // Clear the timer
    startTimer(20); // Restart the timer for the next question

    // Fetch a new question
    tomatoApi();
}

// Call tomatoApi only on initial page load
tomatoApi();

function startNewSession() {
    sessionStorage.clear(); // Clear all session storage data
    // You can also initialize other session-specific variables here if needed
}

// Call this function at the beginning of each session
startNewSession();

 // Fetch a new question and start the timer on initial page load
 tomatoApi();
 startTimer(20);


