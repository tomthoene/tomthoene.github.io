let maxNumber = 100;
let bits = maxNumber.toString(2).length;
let card = 0;
let result = 0;
let numbers = [];
let firstNumber = 0;

document.getElementById("text").innerHTML = "Denke an eine Zahl zwischen 0 und " + maxNumber
refreshControls(true, true);

function start() {
  refreshControls(false, false)
  card = 0;
  result = 0;
  next(false);
  document.getElementById("h1").innerHTML = "Ist deine Zahl hier?";
}
function next(yes) {
  let numbers = [];
  card++;
  if (card > bits) {
    document.getElementById("text").innerHTML = result;
    document.getElementById("h1").innerHTML = "Ergebnis:";
    refreshControls(true, false);
    return;
  }

  for (let i = 1; i <= maxNumber; i++) {
    if (toBinary(i, card) == 1) {
      numbers.push(i);
    }
  }
  document.getElementById("text").innerHTML = numbers.join(" ");
  firstNumber = numbers[0];
}
function yes() {
  result += firstNumber;
  next(true);
}
function no() {
  next(false);
}
function toBinary(input, bitIndex) {
  let binary = input.toString(2);
  return binary[binary.length - bitIndex];
}

function refreshControls(refresh, start) {
  const buttons = document.getElementsByClassName("controls");
  const refreshButton = document.getElementById("refresh");
  //const symbol = document.getElementById("symbol");
  for (button of buttons) {
    if (refresh) {
      button.style.display = "none";
    } else {
      button.style.display = "block";
    }
  }
  if (refresh) {
    refreshButton.style.display = "block";
    if (start) {
      symbol.innerHTML = " play_arrow ";
    } else {
      symbol.innerHTML = " refresh ";
    }
  } else {
    refreshButton.style.display = "none";
  }
}
