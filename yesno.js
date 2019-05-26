var yesNo = ["Yes", "No"]
var randomYesNo = yesNo[Math.floor(Math.random()*yesNo.length)];
document.getElementById("userQ").innerHTML = randomYesNo;
