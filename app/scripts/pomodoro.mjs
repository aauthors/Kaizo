import Timer from './pomodoroTimer.mjs';
import { formatTime } from './pomodoroCore.mjs';

let timer = null;

function getDisplay() {
    return document.getElementById('timer-30-display') || document.querySelector('#timer-30 .timer-30') || document.getElementById('timer-30');
}

function updateDisplay(seconds) {
    const el = getDisplay();
    if (!el) return;
    el.innerHTML = formatTime(Math.max(0, seconds));
}

function enableButtonsForRunning(isRunning) {
    const startBtn = document.getElementById('startTimer30');
    const pauseBtn = document.getElementById('pauseTimer30');
    if (startBtn) startBtn.disabled = isRunning;
    if (pauseBtn) {
        const canResume = !!timer && timer.remaining > 0 && timer.remaining !== timer.initial;
        pauseBtn.disabled = isRunning ? false : !canResume;
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
// expose global functions immediately so inline handlers don't error before DOMContentLoaded
window.startTimer = startTimer;
window.pauseTimer = pauseTimer;
window.resetTimer = resetTimer;
window.setFiveMinuteTimer = setFiveMinuteTimer;

// Initialize on DOM ready
window.addEventListener('DOMContentLoaded', () => {
    timer = new Timer({
        duration: 30 * 60,
        onTick(seconds) { updateDisplay(seconds); },
        onComplete() { if (typeof alert !== 'undefined') alert('Time is up!'); }
    });
    updateDisplay(timer.remaining);
    enableButtonsForRunning(false);
    // global handlers already attached above; nothing to do here
});
