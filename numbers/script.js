let maxNumber = 100
let bits = maxNumber.toString(2).length
let card = 0
let result = 0
let numbers = []
let firstNumber = 0

start()

function start () {
    refreshControls(false)
    card = 0
    result = 0
    next()
}
function next (yes) { 
    let numbers = []
    card ++
    if (card > bits) {
        document.getElementById("text").innerHTML = result;
        document.getElementById("h1").innerHTML = "Ergebnis:";
        refreshControls(true)
        return
    }
    
    for (let i = 1; i <= maxNumber; i ++) {
        if (toBinary(i, card) == 1) {
            numbers.push(i)
        }
    }
   
    console.log(result)
    console.log(numbers)
    document.getElementById("text").innerHTML = numbers.join(" ");
    firstNumber = numbers[0]
}
function yes () {
    result += firstNumber
    next(true)
}
function no () {
    next(false)
}
function toBinary (input, bitIndex) {
    let binary = input.toString(2) 
    return binary[binary.length - bitIndex];
}

function refreshControls (refresh) {
    const buttons = document.getElementsByClassName("controls")
    const refreshButton = document.getElementById("refresh")
    for (button of buttons) {
            if (refresh) {
                button.style.display = "none"
            } else {
                button.style.display = "block"
            }
        }
    if (refresh) {
        refreshButton.style.display = "block"
    } else {
        refreshButton.style.display = "none"
    }
}