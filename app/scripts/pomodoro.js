// UI layer: wires Timer to DOM and exposes global control functions used by the markup
var TimerClass = null;
if (typeof module !== 'undefined' && module.exports) {
    try { TimerClass = require('./pomodoroTimer'); } catch (e) { TimerClass = null; }
}
if (!TimerClass && typeof window !== 'undefined') TimerClass = window.PomodoroTimer;

// formatting helper (uses pomodoroCore if available)
var formatter = null;
if (typeof module !== 'undefined' && module.exports) {
    try { formatter = require('./pomodoroCore'); } catch (e) { formatter = null; }
}
if (!formatter && typeof window !== 'undefined' && window.pomodoroCore) formatter = window.pomodoroCore;
if (!formatter) {
    formatter = { formatTime: function (s) { var m = Math.floor(s / 60); var sec = s % 60; return String(m).padStart(2,'0')+':'+String(sec).padStart(2,'0'); } };
}

var timer = null;

function getDisplay() {
    return document.getElementById('timer-30-display') || document.querySelector('#timer-30 .timer-30') || document.getElementById('timer-30');
}

function updateDisplay(seconds) {
    var el = getDisplay();
    if (!el) return;
    el.innerHTML = formatter.formatTime(Math.max(0, seconds));
}

function enableButtonsForRunning(isRunning) {
    var startBtn = document.getElementById('startTimer30');
    var pauseBtn = document.getElementById('pauseTimer30');
    if (startBtn) startBtn.disabled = isRunning;
    if (pauseBtn) {
        pauseBtn.disabled = !isRunning;
        pauseBtn.textContent = isRunning ? 'Pause' : 'Resume';
    }
}

function startTimer() {
    if (!timer) return;
    timer.start();
    enableButtonsForRunning(true);
}

function pauseTimer() {
    if (!timer) return;
    if (timer.isRunning) {
        timer.pause();
        enableButtonsForRunning(false);
    } else {
        timer.start();
        enableButtonsForRunning(true);
    }
}

function resetTimer() {
    if (!timer) return;
    timer.reset();
    enableButtonsForRunning(false);
}

function setTimerDuration(seconds) {
    if (!timer) return;
    timer.setDuration(seconds);
    enableButtonsForRunning(false);
}

function setFiveMinuteTimer() {
    setTimerDuration(5 * 60);
}

// Initialize on DOM ready
document.addEventListener('DOMContentLoaded', function () {
    if (!TimerClass) return;
    timer = new TimerClass({
        duration: 30 * 60,
        onTick: function (seconds) { updateDisplay(seconds); },
        onComplete: function () { if (typeof alert !== 'undefined') alert('Time is up!'); }
    });
    // initial render
    updateDisplay(timer.remaining);
    enableButtonsForRunning(false);
    // expose global functions for existing inline handlers
    window.startTimer = startTimer;
    window.pauseTimer = pauseTimer;
    window.resetTimer = resetTimer;
    window.setFiveMinuteTimer = setFiveMinuteTimer;
});