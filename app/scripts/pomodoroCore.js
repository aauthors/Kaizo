// Pure helper functions for pomodoro logic (DOM-free) — suitable for unit tests
function formatTime(seconds) {
    const s = Math.max(0, Math.floor(seconds));
    const m = Math.floor(s / 60);
    const sec = s % 60;
    return String(m).padStart(2, '0') + ':' + String(sec).padStart(2, '0');
}

function tick(secondsRemaining) {
    const s = Math.max(0, Math.floor(secondsRemaining));
    if (s <= 0) return 0;
    return s - 1;
}

module.exports = {
    formatTime,
    tick,
};

// If running in a browser, also expose as a global for plain script usage
if (typeof window !== 'undefined') {
    window.pomodoroCore = { formatTime, tick };
}
