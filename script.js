const eggs = [
  {
    name: "Soft-Boiled",
    desc: "A soft and gooey yolk, perfect for dipping toast.",
    instructions: "Place egg in boiling water for 6 minutes. Rinse under cold water.",
    time: 360,    //360
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
  document.querySelectorAll('.screen').forEach(screen => {
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
  startStopBtn.textContent = "Reset";

  timeLeft--;
  countdown.textContent = formatTime(timeLeft);

  timer = setInterval(() => {
    timeLeft--;
    countdown.textContent = formatTime(timeLeft);
    if (timeLeft <= 0) {
      clearInterval(timer);
      showScreen("screen-finished");
      if (window.api && window.api.notifyFinished) {
        window.api.notifyFinished();
      }      
    }
  }, 1000);
}

function stopTimer() {
  startStopBtn.textContent = "Start";
  clearInterval(timer);
  timer = null;
  timeLeft = eggs[currentIndex].time;
  countdown.textContent = formatTime(timeLeft);
}

function toggleTimer() {
  if (timer) {
    stopTimer();
  } else {
    startTimer();
  }
}

// arrow logic
["intro", "instructions"].forEach(screen => {
  document.getElementById(`left-${screen}`).onclick = () => {
    currentIndex = (currentIndex - 1 + eggs.length) % eggs.length;
    updateEggView();
  };
  document.getElementById(`right-${screen}`).onclick = () => {
    currentIndex = (currentIndex + 1) % eggs.length;
    updateEggView();
  };
});

//buttons logic
document.getElementById("btn-select").onclick = () => {
  showScreen("screen-instructions");
};

document.getElementById("btn-back").onclick = () => {
  showScreen("screen-intro");
};

document.getElementById("btn-back-2").onclick = () => {
  showScreen("screen-instructions");
  stopTimer();
};

document.getElementById("btn-begin").onclick = () => {
  showScreen("screen-timer");
  stopTimer();
};

startStopBtn.onclick = toggleTimer;

document.getElementById("screen-finished").onclick = () => {
  showScreen("screen-intro");
};

updateEggView();

function addWobbleAnimation(element) {
  element.classList.add("pixel-wobble");
  setTimeout(() => element.classList.remove("pixel-wobble"), 300);
}

const handleIntroClick = () => {
  currentIndex = (currentIndex + 1) % eggs.length;
  updateEggView();
  addWobbleAnimation(introImg);
  addWobbleAnimation(instructionImg);
};

document.getElementById('left-intro').onclick = handleIntroClick;
document.getElementById('left-instructions').onclick = handleIntroClick;
document.getElementById('right-intro').onclick = handleIntroClick;
document.getElementById('right-instructions').onclick = handleIntroClick;

