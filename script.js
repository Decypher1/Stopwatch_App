// Stopwatch logic: hours / minutes / seconds, single toggle button, clear resets.
// Prevents multiple intervals when start pressed repeatedly.

let hours = 0;
let minutes = 0;
let seconds = 0;

let intervalId = null;
let isRunning = false;

const displayEl = document.getElementById('display');
const toggleBtn = document.getElementById('toggle');
const clearEl  = document.getElementById('clear');

// Format and render time as HH:MM:SS
function updateDisplay() {
  const h = hours.toString().padStart(2, '0');
  const m = minutes.toString().padStart(2, '0');
  const s = seconds.toString().padStart(2, '0');
  displayEl.textContent = `${h}:${m}:${s}`;
}

// Tick every second
function tick() {
  seconds++;
  if (seconds >= 60) {
    seconds = 0;
    minutes++;
  }
  if (minutes >= 60) {
    minutes = 0;
    hours++;
  }
  updateDisplay();
}

// Start the timer (if not already running)
function startTimer() {
  if (isRunning) return;           // guard: don't start multiple intervals
  isRunning = true;
  toggleBtn.setAttribute('aria-pressed', 'true');
  intervalId = setInterval(tick, 1000);
}

// Stop/pause the timer (if running)
function stopTimer() {
  if (!isRunning) return;
  isRunning = false;
  toggleBtn.setAttribute('aria-pressed', 'false');
  clearInterval(intervalId);
  intervalId = null;
}

// Toggle start/stop when oval button is clicked
toggleBtn.addEventListener('click', () => {
  if (isRunning) {
    stopTimer();
  } else {
    startTimer();
  }
});

// CLEAR element click: reset timer and stop
function clearTimer() {
  stopTimer();
  hours = minutes = seconds = 0;
  updateDisplay();
}

// Make CLEAR clickable and keyboard accessible
clearEl.addEventListener('click', clearTimer);
clearEl.addEventListener('keydown', (e) => {
  if (e.key === 'Enter' || e.key === ' ') {
    e.preventDefault();
    clearTimer();
  }
});

// Allow Space key to toggle when button focused
toggleBtn.addEventListener('keydown', (e) => {
  if (e.key === ' ' || e.key === 'Enter') {
    e.preventDefault();
    toggleBtn.click();
  }
});

// Initialize display
updateDisplay();
