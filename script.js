const startBtn = document.getElementById("startBtn");
const eggSelect = document.getElementById("eggType");
const timerDisplay = document.getElementById("timerDisplay");

let timerInterval;

startBtn.addEventListener("click", () => {
    clearInterval(timerInterval);
    let timeLeft = parseInt(eggSelect.value);
    timerInterval = setInterval (() => {
        const mins = Math.floor(timeLeft/60);
        const secs = timeLeft % 60;

        timerDisplay.textContent = `${String(mins).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;

        if (timeLeft <=0) {
            clearInterval(timerInterval);
            alert("Egg is ready!!");
        }

        timeLeft--;
    }, 1000);
});