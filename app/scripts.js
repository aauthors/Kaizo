var string = "hello world"; 

document.getElementById("box").innerHTML = string;

function changeText() {
    document.getElementById("box").innerHTML = "I love you";
    alert("I love you");
}

function changeNoText() {
    alert("I understand, but I still love you");
}