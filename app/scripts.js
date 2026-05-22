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