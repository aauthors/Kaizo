const { formatTime, tick } = require('../pomodoroCore');

describe('pomodoroCore', () => {
    test('formatTime formats seconds into MM:SS', () => {
        expect(formatTime(0)).toBe('00:00');
        expect(formatTime(5)).toBe('00:05');
        expect(formatTime(65)).toBe('01:05');
        expect(formatTime(600)).toBe('10:00');
        expect(formatTime(-10)).toBe('00:00');
    });

    test('tick decrements seconds and clamps at 0', () => {
        expect(tick(5)).toBe(4);
        expect(tick(1)).toBe(0);
        expect(tick(0)).toBe(0);
        expect(tick(-3)).toBe(0);
    });
});
