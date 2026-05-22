// Pomodoro timer (interval-based)
var pomodoroRemaining = 30 * 60; // seconds
var pomodoroIntervalId = null;

function formatTime(seconds) {
    var m = Math.floor(seconds / 60);
    var s = seconds % 60;
    return String(m).padStart(2, '0') + ':' + String(s).padStart(2, '0');
}

function getPomodoroDisplay() {
    return document.getElementById('timer-30-display') || document.querySelector('#timer-30 .timer-30') || document.getElementById('timer-30');
}

function updatePomodoroDisplay() {
    var el = getPomodoroDisplay();
    if (!el) return;
    el.innerHTML = formatTime(Math.max(0, pomodoroRemaining));
}

function tickPomodoro() {
    if (pomodoroRemaining <= 0) {
        clearInterval(pomodoroIntervalId);
        pomodoroIntervalId = null;
        pomodoroRemaining = 0;
        updatePomodoroDisplay();
        alert('Time is up!');
        return;
    }
    pomodoroRemaining--;
    updatePomodoroDisplay();
}

function startTimer() {
    if (pomodoroIntervalId) return; // already running
    // initialize if needed
    if (typeof pomodoroRemaining === 'undefined' || pomodoroRemaining === null) pomodoroRemaining = 30 * 60;
    updatePomodoroDisplay();
    pomodoroIntervalId = setInterval(tickPomodoro, 1000);
    var startBtn = document.getElementById('startTimer30');
    var pauseBtn = document.getElementById('pauseTimer30');
    if (startBtn) startBtn.disabled = true;
    if (pauseBtn) pauseBtn.disabled = false;
}

function pauseTimer() {
    if (pomodoroIntervalId) {
        clearInterval(pomodoroIntervalId);
        pomodoroIntervalId = null;
        var pauseBtn = document.getElementById('pauseTimer30');
        var startBtn = document.getElementById('startTimer30');
        if (pauseBtn) pauseBtn.textContent = 'Resume';
        if (startBtn) startBtn.disabled = false;
    } else {
        // resume
        startTimer();
        var pauseBtn = document.getElementById('pauseTimer30');
        if (pauseBtn) pauseBtn.textContent = 'Pause';
    }
}

function resetTimer() {
    if (pomodoroIntervalId) {
        clearInterval(pomodoroIntervalId);
        pomodoroIntervalId = null;
    }
    pomodoroRemaining = 30 * 60;
    updatePomodoroDisplay();
    var pauseBtn = document.getElementById('pauseTimer30');
    var startBtn = document.getElementById('startTimer30');
    if (pauseBtn) { pauseBtn.textContent = 'Pause'; pauseBtn.disabled = false; }
    if (startBtn) startBtn.disabled = false;
}

// Initialize display on load
document.addEventListener('DOMContentLoaded', function () {
    updatePomodoroDisplay();
});