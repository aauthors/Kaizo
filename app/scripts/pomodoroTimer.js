// Timer class: responsible solely for timer state and lifecycle (SRP)
// Uses pomodoroCore for pure logic when available.
(function () {
    'use strict';

    var core = null;
    if (typeof module !== 'undefined' && module.exports) {
        try { core = require('./pomodoroCore'); } catch (e) { core = null; }
    }
    if (!core && typeof window !== 'undefined' && window.pomodoroCore) core = window.pomodoroCore;
    if (!core) {
        core = {
            formatTime: function (s) { var m = Math.floor(s / 60); var sec = s % 60; return String(m).padStart(2,'0')+':'+String(sec).padStart(2,'0'); },
            tick: function (s) { var ss = Math.max(0, Math.floor(s)); if (ss <= 0) return 0; return ss-1; }
        };
    }

    function Timer(options) {
        options = options || {};
        this.initial = (typeof options.duration === 'number') ? Math.max(0, Math.floor(options.duration)) : 30 * 60;
        this.remaining = (typeof options.duration === 'number') ? Math.max(0, Math.floor(options.duration)) : 30 * 60;
        this.intervalId = null;
        this.onTick = options.onTick || function () {};
        this.onComplete = options.onComplete || function () {};
        this.isRunning = false;
    }

    Timer.prototype._tick = function () {
        if (this.remaining <= 0) {
            this.pause();
            this.remaining = 0;
            this.onTick(this.remaining);
            this.onComplete();
            return;
        }
        this.remaining = core.tick(this.remaining);
        this.onTick(this.remaining);
    };

    Timer.prototype.start = function () {
        var self = this;
        if (this.intervalId) return;
        // notify UI of current remaining immediately (do not decrement yet)
        this.onTick(this.remaining);
        this.intervalId = setInterval(function () { self._tick(); }, 1000);
        this.isRunning = true;
    };

    Timer.prototype.pause = function () {
        if (this.intervalId) {
            clearInterval(this.intervalId);
            this.intervalId = null;
        }
        this.isRunning = false;
    };

    Timer.prototype.reset = function () {
        this.pause();
        this.remaining = this.initial;
        this.onTick(this.remaining);
    };

    Timer.prototype.setDuration = function (seconds) {
        this.pause();
        this.initial = Math.max(0, Math.floor(seconds));
        this.remaining = this.initial;
        this.onTick(this.remaining);
    };

    // export
    if (typeof module !== 'undefined' && module.exports) {
        module.exports = Timer;
    }
    if (typeof window !== 'undefined') {
        window.PomodoroTimer = Timer;
    }
})();
