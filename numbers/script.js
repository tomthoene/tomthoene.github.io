let maxNumber = 100
let bits = maxNumber.toString(2).length
let card = 0
let result = 0
let numbers = []
let firstNumber = 0

next()
function next (yes) { 
    let numbers = []
    card ++
    if (card > bits) {
        document.getElementById("text").innerHTML = result;
        document.getElementById("h1").innerHTML = "Ergebnis:";
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