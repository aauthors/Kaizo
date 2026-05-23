/** @jest-environment jsdom */
const fs = require('fs');
const path = require('path');

describe('pomodoro DOM integration', () => {
    let pomodoro;

    beforeEach(() => {
        jest.useFakeTimers();
        // load HTML fixture
        const html = `
            <div id="timer-30"><p id="timer-30-display">30:00</p></div>
            <button id="startTimer30">Start</button>
            <button id="pauseTimer30">Pause</button>
            <button id="resetTimer30">Reset</button>
        `;
        document.body.innerHTML = html;
        // require the module (it will attach functions globally)
        jest.isolateModules(() => {
            pomodoro = require('../pomodoro');
        });
    });

    afterEach(() => {
        jest.useRealTimers();
        // cleanup module cache
        jest.resetModules();
        document.body.innerHTML = '';
    });

    test('startTimer starts countdown and updates display', () => {
        expect(document.getElementById('timer-30-display').textContent).toBe('30:00');
        // call startTimer
        global.startTimer();
        // advance one second
        jest.advanceTimersByTime(1000);
        expect(document.getElementById('timer-30-display').textContent).toBe('29:59');
        // advance 2 more seconds
        jest.advanceTimersByTime(2000);
        expect(document.getElementById('timer-30-display').textContent).toBe('29:57');
    });

    test('pauseTimer stops countdown and resume works', () => {
        global.startTimer();
        jest.advanceTimersByTime(2000);
        expect(document.getElementById('timer-30-display').textContent).toBe('29:58');
        global.pauseTimer();
        jest.advanceTimersByTime(2000);
        // still paused
        expect(document.getElementById('timer-30-display').textContent).toBe('29:58');
        // resume
        global.pauseTimer(); // resume toggles
        jest.advanceTimersByTime(1000);
        expect(document.getElementById('timer-30-display').textContent).toBe('29:57');
    });

    test('resetTimer sets back to 30:00', () => {
        global.startTimer();
        jest.advanceTimersByTime(3000);
        expect(document.getElementById('timer-30-display').textContent).toBe('29:57');
        global.resetTimer();
        expect(document.getElementById('timer-30-display').textContent).toBe('30:00');
    });
});
