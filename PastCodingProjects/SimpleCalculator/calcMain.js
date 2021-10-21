let currentNumber = "";
let savedNumber = 0;
let currentOperation = "";
let negativeNumberCheck = false;
let lastButtonPressed = "";

let numberButtonClicked = function(number) {

    lastButtonPressed = "number";
    let numberClicked;

    //used to take the leading 0 out of the number when a user clicks a number.
    // As long as the first thing they click isn't a decimal. If it is a decimal it keeps the leading 0.
    let tempCurNum = "";

    if(currentNumber[0] === '0' && currentNumber[1] !== '0' && currentNumber[1] !== '.'){

        for(let i=1; i<currentNumber.length; i++) {
            tempCurNum[i-1] = currentNumber[i];
        }

        currentNumber = tempCurNum;
    }

    numberClicked = number;
    currentNumber = currentNumber+numberClicked;

    //call function to display number
    displayNumber();
}

let decimalButtonClicked = function(decimal) {

    lastButtonPressed = "decimal";

    // check to make sure there isn't already a decimal entered in the calculator.
    // Can't be 2 decimal places for one number, so only add if there is one.
    if(currentNumber.includes('.') !== true){

        currentNumber = currentNumber+decimal;

        if(currentNumber[0] === '.'){
            currentNumber[0] = '0';
            currentNumber[1] = '.'
        }

        //call function to display number
        displayNumber();
    }
}

//clears the calculator, operation and saved number from the program.
let clearCalc = function() {
    currentNumber = "0";
    savedNumber = 0;
    currentOperation = "";
    lastButtonPressed = "";

    // call function to display the number
    displayNumber();
}

let posNegFunction = function() {
    //check if the current setting for positive/negative is on or off. meaning is the user hits the button when the
    //number is negative, then make it positive and vice versa.
    if (negativeNumberCheck === false) {

        //set the number check to the opposite since the button has been pressed.
        negativeNumberCheck = true;

        //call helper function since math to change a number from positive to
        //negative is same as changing negative to a positive
        //(0 - thisNumber) will make number + or - depending on sign of thisNumber
        posNegHelperFunction();
    }

    //if the number is already negative and the user wants to make it back into a positive number.
    else {

        //set the number check to the opposite since the button has been pressed.
        negativeNumberCheck = false;

        posNegHelperFunction();
    }

}

let posNegHelperFunction = function () {
    let currentNumStringToFloat = 0;

    currentNumStringToFloat = parseFloat(currentNumber);

    //change the number from positive to negative. if the number is 9, then 0 - 9 = -9.
    currentNumStringToFloat = 0 - currentNumStringToFloat;

    //convert back to a string
    currentNumber = currentNumStringToFloat.toString();

    //call display number to display the number as a negative number.
    displayNumber();
}

let backspaceFunction = function() {
    let numberLength = currentNumber.length
    numberLength = numberLength-1;

    let tempNumber = "";

    //Only delete numbers or decimals. You cannot do something like 2+2 = 4 and then hit the backspace button.
    //The "AC" button is for clearing the calculator. Backspace button is only if user messes up typing mid number.
    if((lastButtonPressed === "number") || (lastButtonPressed === "decimal")){

        //if you delete the last number then display a 0 again
        if(numberLength === 0){
            currentNumber = "0"
        }

        // otherwise if it isn't the last number, then just delete it.
        else {

            for (let i = 0; i < numberLength; i++) {
                tempNumber = tempNumber + currentNumber[i]
            }

            currentNumber = tempNumber;
        }

        //call function to display the number
        displayNumber();
    }

}

//see additionFunction for  for a detailed explanation of the operation functions
//since all are practically identical.
let divisionFunction = function() {

    if(currentOperation !== ""){

        equalsFunction();

        currentOperation = "/";

        operationHelperFunction();

    }
    else{

        currentOperation = "/";

        operationHelperFunction();

        displayNumber();
    }
}

//see additionFunction for  for a detailed explanation of the operation functions
//since all are practically identical.
let multiplicationFunction = function() {

    if(currentOperation !== ""){

        equalsFunction();

        currentOperation = "*";

        operationHelperFunction();
    }
    else{

        currentOperation = "*";

        operationHelperFunction();

        displayNumber();
    }
}

//see additionFunction for  for a detailed explanation of the operation functions
//since all are practically identical.
let subtractionFunction = function() {
    if(currentOperation !== ""){

        equalsFunction();

        currentOperation = "-";

        operationHelperFunction();
    }
    else{

        currentOperation = "-";

        operationHelperFunction();

        displayNumber();
    }
}

let additionFunction = function() {
    if(currentOperation !== ""){
        //call equals function to do the math before adding a new number. Allows user to do things like 3 + 3 / 2 - 5
        //without having to hit ='s after every operation for the math to happen.
        equalsFunction();

        //updates the saved number and changes the current number back to "0" in order for user to type the next number.
        //put in a helper function because all operations do this action.
        operationHelperFunction();

        currentOperation = "+";
    }
    else{
        //all code above is the same, except no equals function is needed yet because the user has yet to type the 2nd
        // number needed for the operation. For example, the user would have typed something like "3+" they need a 2nd #
        operationHelperFunction();

        currentOperation = "+";

        displayNumber();
    }
}

//helper function for all the operations (+,-,*,/). All operation functions use these two lines of code.
let operationHelperFunction = function(){

    savedNumber = parseFloat(currentNumber);

    currentNumber = "0";
}

//gets the operation that was selected and performs that operation on the saved number (one entered before an operation)
//and the number written after before the user presses either another operation or the ='s sign. Finally, displays the #
let equalsFunction = function() {
    lastButtonPressed = "operation";

    if (currentOperation === "+"){
        currentNumber = savedNumber + parseFloat(currentNumber);
    }
    else if (currentOperation === "-"){
        currentNumber = savedNumber - parseFloat(currentNumber);
    }
    else if (currentOperation === "/"){
        currentNumber = savedNumber / parseFloat(currentNumber);
    }
    else if (currentOperation === "*"){
        currentNumber = savedNumber * parseFloat(currentNumber);
    }

    currentOperation = "";
    displayNumber();

}

let displayNumber = function() {

    let changeScreenText = document.getElementById("screenText");

    changeScreenText.innerText = currentNumber.toString();
}