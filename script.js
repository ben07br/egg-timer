const eggs = [
  {
    name: "Soft-Boiled",
    desc: "A soft and gooey yolk, perfect for dipping toast.",
    instructions: "Place egg in boiling water for 6 minutes. Rinse under cold water.",
    time: 360,
    img: "images/softEgg.png"
  },
  {
    name: "Medium-Boiled",
    desc: "A slightly firmer yolk for a richer bite.",
    instructions: "Boil for 8 minutes, then cool briefly under cold water.",
    time: 480,
    img: "images/mediumEgg.png"
  },
  {
    name: "Hard-Boiled",
    desc: "Fully cooked yolk, great for salads and snacks.",
    instructions: "Boil for 10 minutes. Let rest before peeling.",
    time: 600,
    img: "images/hardEgg.png"
  }
];

let currentIndex = 0;
let timer = null;
let timeLeft = 0;

// DOM elements
const screens = {
  intro: document.getElementById("screen-intro"),
  instructions: document.getElementById("screen-instructions"),
  timer: document.getElementById("screen-timer"),
  finished: document.getElementById("screen-finished")
};

const introImg = document.getElementById("intro-egg-img");
const introName = document.getElementById("intro-egg-name");
const introDesc = document.getElementById("intro-egg-desc");

const instructionImg = document.getElementById("instruction-egg-img");
const instructionName = document.getElementById("instruction-egg-name");
const instructionText = document.getElementById("egg-instructions");

const timerName = document.getElementById("timer-egg-name");
const countdown = document.getElementById("countdown");
const startStopBtn = document.getElementById("btn-startstop");

const finishedImg = document.getElementById("finished-egg-img");

// Update displayed egg info
function updateEggView() {
  const egg = eggs[currentIndex];

  introImg.src = egg.img;
  introName.textContent = egg.name;
  introDesc.textContent = egg.desc;

  instructionImg.src = egg.img;
  instructionName.textContent = egg.name;
  instructionText.textContent = egg.instructions;

  timerName.textContent = egg.name;
  finishedImg.src = egg.img;
}

// Screen switcher
function showScreen(screenId) {
  document.querySelectorAll('screen').forEach(screen => {
    screen.className = 'screen hidden';  // hide all
  });

  const target = document.getElementById(screenId);
  if (target) {
    target.className = 'screen'; // show target
  }
}


// Countdown formatter
function formatTime(sec) {
  const m = String(Math.floor(sec / 60)).padStart(2, '0');
  const s = String(sec % 60).padStart(2, '0');
  return `${m}:${s}`;
}

function startTimer() {
  timeLeft = eggs[currentIndex].time;
  countdown.textContent = formatTime(timeLeft);
  startStopBtn.textContent = "Stop";

  timer = setInterval(() => {
    timeLeft--;
    countdown.textContent = formatTime(timeLeft);
    if (timeLeft <= 0) {
      clearInterval(timer);
      showScreen("finished");
    }
  }, 1000);
}

function stopTimer() {
  clearInterval(timer);
  startStopBtn.textContent = "Start";
  timer = null;
}

function toggleTimer() {
  if (timer) {
    stopTimer();
  } else {
    startTimer();
  }
}

// Arrows
["intro", "instructions", "timer"].forEach(screen => {
  document.getElementById(`left-${screen}`).onclick = () => {
    currentIndex = (currentIndex - 1 + eggs.length) % eggs.length;
    updateEggView();
  };
  document.getElementById(`right-${screen}`).onclick = () => {
    currentIndex = (currentIndex + 1) % eggs.length;
    updateEggView();
  };
});

// Buttons

document.getElementById("btn-select").onclick = () => {
  showScreen("instructions");
};

document.getElementById("btn-back").onclick = () => {
  showScreen("intro");
};

document.getElementById("btn-begin").onclick = () => {
  showScreen("timer");
  countdown.textContent = formatTime(eggs[currentIndex].time);
  startStopBtn.textContent = "Start";
};

startStopBtn.onclick = toggleTimer;

screens.finished.onclick = () => {
  showScreen("intro");
};

updateEggView();
