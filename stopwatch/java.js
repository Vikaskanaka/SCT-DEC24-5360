const startButton = document.getElementById("start");
const stopButton = document.getElementById("stop");
const lapButton = document.getElementById("lap");
const resetButton = document.getElementById("reset");

const minutesDisplay = document.getElementById("minutes");
const secondsDisplay = document.getElementById("seconds");
const lapsList = document.getElementById("laps-list");
const millisecondsDisplay = document.getElementById("milliseconds");

let minutes = 0;
let seconds = 0;
let milliseconds = 0;
let timerInterval = null;

function updateDisplay() {
    minutesDisplay.textContent = String(minutes).padStart(2, "0");
    secondsDisplay.textContent = String(seconds).padStart(2, "0");
    millisecondsDisplay.textContent = String(Math.floor(milliseconds / 10)).padStart(2, "0");
}

function startTimer() {
    if (!timerInterval) {
        timerInterval = setInterval(() => {
            milliseconds += 10;

            if (milliseconds === 1000) {
                milliseconds = 0;
                seconds++;
            }

            if (seconds === 60) {
                seconds = 0;
                minutes++;
            }

            updateDisplay();
        }, 10);
    }
}

function stopTimer() {
    clearInterval(timerInterval);
    timerInterval = null;
}

function resetTimer() {
    clearInterval(timerInterval);
    timerInterval = null;
    minutes = 0;
    seconds = 0;
    milliseconds = 0;
    updateDisplay();
    lapsList.innerHTML = "";
}

function recordLap() {
    if (timerInterval) {
        const lapTime = `${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}:${String(
            Math.floor(milliseconds / 10)
        ).padStart(2, "0")}`;
        const lapItem = document.createElement("li");
        lapItem.textContent = lapTime;
        lapsList.appendChild(lapItem);
    }
}

startButton.addEventListener("click", startTimer);
stopButton.addEventListener("click", stopTimer);
lapButton.addEventListener("click", recordLap);
resetButton.addEventListener("click", resetTimer);

updateDisplay();

  