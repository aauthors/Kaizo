// ES module version of pomodoro core
export function formatTime(seconds) {
    const s = Math.max(0, Math.floor(seconds));
    const m = Math.floor(s / 60);
    const sec = s % 60;
    return String(m).padStart(2, '0') + ':' + String(sec).padStart(2, '0');
}

export function tick(secondsRemaining) {
    const s = Math.max(0, Math.floor(secondsRemaining));
    if (s <= 0) return 0;
    return s - 1;
}
