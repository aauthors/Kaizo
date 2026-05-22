var string = "hello world"; 

document.getElementById("box").innerHTML = string;

function changeText() {
    document.getElementById("box").innerHTML = "I love you";
}

function changeNoText() {
    document.getElementById("box").innerHTML = "I understand, but I still love you";
}

function updateClock() {
    var clock = document.getElementById("clock"); 
    var now = new Date(); 
    var hours = now.getHours().toString().padStart(2, '0'); 
    var minutes = now.getMinutes().toString().padStart(2, '0');
    var seconds = now.getSeconds().toString().padStart(2, '0');
    clock.innerHTML = hours + ":" + minutes + ":" + seconds; 
}

setInterval(updateClock, 1000);