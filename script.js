const eggs = [    //egg objects 
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

const alarmSound = new Audio('sounds/rooster-sound.mp3');
const buttonSound = new Audio('sounds/button-sound.mp3');
const menuSound = new Audio('sounds/menu-sound.mp3');
const backSound = new Audio('sounds/back-sound.mp3');
const timerStartSound = new Audio('sounds/timer-sound.mp3');
const timerStopSound = new Audio('sounds/timer-stop-sound.mp3');

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

// start timer function
function startTimer() {
  // timeLeft = eggs[currentIndex].time;
  // startStopBtn.textContent = "Reset";

  // timeLeft--;
  // countdown.textContent = formatTime(timeLeft);

  // timer = setInterval(() => {
  //   timeLeft--;
  //   countdown.textContent = formatTime(timeLeft);
  //   if (timeLeft <= 0) {
  //     clearInterval(timer);
  //     alarmSound.play();
  //     alarmSound.loop = true;
  //     showScreen("screen-finished");
  //     if (window.api && window.api.notifyFinished) {
  //       window.api.notifyFinished();
  //     }      
  //   }
  // }, 1000);

  const totalSeconds = eggs[currentIndex].time;
  const endTime = Date.now() + totalSeconds * 1000;
  startStopBtn.textContent = "Reset";

  function updateTimer() {
    const now = Date.now();
    const timeLeftMs = endTime - now;
    timeLeft = Math.max(0, Math.ceil(timeLeftMs / 1000));
    countdown.textContent = formatTime(timeLeft);

    if (timeLeft <= 0) {
      clearInterval(timer);
      timer = null;
      alarmSound.play();
      alarmSound.loop = true;
      showScreen("screen-finished");
      if (window.api && window.api.notifyFinished) {
        window.api.notifyFinished();
      }
    }
  }

  updateTimer(); // run immediately so UI updates right away
  timer = setInterval(updateTimer, 1000);
}

// end timer function
function stopTimer() {
  startStopBtn.textContent = "Start";
  clearInterval(timer);
  timer = null;
  timeLeft = eggs[currentIndex].time;
  countdown.textContent = formatTime(timeLeft);
}


// start stop timer
function toggleTimer() {
  if (timer) {
    timerStopSound.currentTime = 0;
    timerStopSound.play();
    stopTimer();
  } else {
    timerStartSound.currentTime = 0;
    timerStartSound.play();
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
  alarmSound.pause();
  alarmSound.currentTime = 0;
};

// updateEggView();

function addWobbleAnimation(element) {    //wobble effect for when scrolling egg images
  element.classList.add("pixel-wobble");
  setTimeout(() => element.classList.remove("pixel-wobble"), 300);
}

const handleScrollClick = () => {    // handles the scrolling through images
  currentIndex = (currentIndex + 1) % eggs.length;
  updateEggView();
  addWobbleAnimation(introImg);
  addWobbleAnimation(instructionImg);
};

document.getElementById('left-intro').onclick = handleScrollClick;
document.getElementById('left-instructions').onclick = handleScrollClick;
document.getElementById('right-intro').onclick = handleScrollClick;
document.getElementById('right-instructions').onclick = handleScrollClick;

document.getElementById('minimize').addEventListener('click', () => window.api.minimize());
document.getElementById('close').addEventListener('click', () => window.api.close());

document.querySelectorAll('.arrow').forEach(button => {
  button.addEventListener('click', () => {
    buttonSound.currentTime = 0; // rewind to start
    buttonSound.play();
  });
});

document.querySelectorAll('.next-button').forEach(button => {
  button.addEventListener('click', () => {
    menuSound.currentTime = 0;
    menuSound.play();
  });
});

document.querySelectorAll('.back-button').forEach(button => {
  button.addEventListener('click', () => {
    backSound.currentTime = 0;
    backSound.play();
  });
});

