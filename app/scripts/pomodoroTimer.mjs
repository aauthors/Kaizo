import { tick as coreTick } from './pomodoroCore.mjs';

export default class Timer {
    constructor(options = {}) {
        this.initial = (typeof options.duration === 'number') ? Math.max(0, Math.floor(options.duration)) : 30 * 60;
        this.remaining = (typeof options.duration === 'number') ? Math.max(0, Math.floor(options.duration)) : 30 * 60;
        this.intervalId = null;
        this.onTick = options.onTick || function () {};
        this.onComplete = options.onComplete || function () {};
        this.isRunning = false;
    }

    _tick() {
        if (this.remaining <= 0) {
            this.pause();
            this.remaining = 0;
            this.onTick(this.remaining);
            this.onComplete();
            return;
        }
        this.remaining = coreTick(this.remaining);
        this.onTick(this.remaining);
    }

    start() {
        if (this.intervalId) return;
        // notify UI of current remaining immediately (do not decrement yet)
        this.onTick(this.remaining);
        this.intervalId = setInterval(() => { this._tick(); }, 1000);
        this.isRunning = true;
    }

    pause() {
        if (this.intervalId) {
            clearInterval(this.intervalId);
            this.intervalId = null;
        }
        this.isRunning = false;
    }

    reset() {
        this.pause();
        this.remaining = this.initial;
        this.onTick(this.remaining);
    }

    setDuration(seconds) {
        this.pause();
        this.initial = Math.max(0, Math.floor(seconds));
        this.remaining = this.initial;
        this.onTick(this.remaining);
    }
}
