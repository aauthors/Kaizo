var string = "hello world";

var box = document.getElementById("box");
if (box) {
    box.innerHTML = string;
}

function changeText() {
    var b = document.getElementById("box");
    if (b) b.innerHTML = "I love you";
}

function changeNoText() {
    var b = document.getElementById("box");
    if (b) b.innerHTML = "I understand, but I still love you";
}

function goToPomo() {
    window.location.href = "./pomo.html";
}

function goToHomePage() {
    window.location.href = "./index.html";
}

function timer30() {
    var timer = document.getElementById("timer-30");
    if (!timer) return;

    // initialize remaining seconds on first call (29:59)
    if (typeof window.timer30Remaining === 'undefined' || window.timer30Remaining === null) {
        window.timer30Remaining = 29 * 60 + 59; // start at 29:59
    }

    if (window.timer30Remaining <= 0) {
        timer.innerHTML = "00:00";
        if (window.timer30Remaining === 0) {
            alert('Time is up!');
            window.timer30Remaining = -1; // prevent repeated alerts
        }
        return;
    }

    var minutes = Math.floor(window.timer30Remaining / 60);
    var seconds = window.timer30Remaining % 60;
    timer.innerHTML = String(minutes).padStart(2, '0') + ":" + String(seconds).padStart(2, '0');

    // decrement once per invocation (setInterval calls once per second)
    window.timer30Remaining--;
}

function updateClock() {
    var clock = document.getElementById("clock");
    if (!clock) return;
    var now = new Date();
    var hours = now.getHours().toString().padStart(2, '0');
    var minutes = now.getMinutes().toString().padStart(2, '0');
    var seconds = now.getSeconds().toString().padStart(2, '0');
    clock.innerHTML = hours + ":" + minutes + ":" + seconds;
}

// show time immediately and then update every second
updateClock();
setInterval(updateClock, 1000);
timer30();
setInterval(timer30, 1000); 