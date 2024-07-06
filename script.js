let startTime, elapsedTime = 0, timerInterval;
let isRunning = false;

const display = document.getElementById('display');
const startBtn = document.getElementById('startBtn');
const pauseBtn = document.getElementById('pauseBtn');
const resetBtn = document.getElementById('resetBtn');
const lapBtn = document.getElementById('lapBtn');
const laps = document.getElementById('laps');

function formatTime(time) {
    const date = new Date(time);
    const minutes = String(date.getUTCMinutes()).padStart(2, '0');
    const seconds = String(date.getUTCSeconds()).padStart(2, '0');
    const milliseconds = String(date.getUTCMilliseconds()).padStart(3, '0').slice(0, -1);
    return `${minutes}:${seconds}.${milliseconds}`;
}

function start() {
    if (!isRunning) {
        startTime = Date.now() - elapsedTime;
        timerInterval = setInterval(updateDisplay, 10);
        startBtn.textContent = 'Start';
        pauseBtn.disabled = false;
        lapBtn.disabled = false;
        isRunning = true;
    }
}

function pause() {
    if (isRunning) {
        clearInterval(timerInterval);
        elapsedTime = Date.now() - startTime;
        isRunning = false;
        pauseBtn.disabled = true;
        lapBtn.disabled = true;
    }
}

function reset() {
    clearInterval(timerInterval);
    display.textContent = '00:00:00.00';
    elapsedTime = 0;
    isRunning = false;
    startBtn.disabled = false;
    pauseBtn.disabled = true;
    lapBtn.disabled = true;
    laps.innerHTML = '';
}

function lap() {
    if (isRunning) {
        const lapTime = formatTime(Date.now() - startTime);
        const lapElement = document.createElement('div');
        lapElement.textContent = `Lap ${laps.children.length + 1}: ${lapTime}`;
        laps.appendChild(lapElement);
    }
}

function updateDisplay() {
    const currentTime = Date.now() - startTime;
    display.textContent = formatTime(currentTime);
}

startBtn.addEventListener('click', start);
pauseBtn.addEventListener('click', pause);
resetBtn.addEventListener('click', reset);
lapBtn.addEventListener('click', lap);
