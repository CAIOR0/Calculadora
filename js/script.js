const previousOperationText = document.querySelector("#preview-operator");
const currentOperationText = document.querySelector("#current-operator");
const button = document.querySelectorAll("#buttons button");

class Calculator {
    constructor(previousOperationText, currentOperationText){
        this.previousOperationText = currentOperationText;
        this.currentOperationText = currentOperationText;
        this.currentOperation = "";
    }

    // add digit to screen
    addDigit(digit){
        // check if current operation already has a dot
        if(digit === "." && this.currentOperationText.innerText.includes(".")){
            return;
        }
        
        this.currentOperation = digit;
        this.updateScreen();
    }

    // Process all calculator operation
    processOperation(operation){
    // check current value 
    if(this.currentOperationText.innerText === ""){
         // change operation
        if(this.previousOperationText !== ""){
           this.changeOperation(operation);
        }
        return;                        
    }

    // Get current and previous value 
    let operationValue;
    const previous = +this.previousOperationText.innerText.split(" ")[0];
    const current = +this.currentOperationText.innerText;

    switch(operation){
        case "+" :
            operationValue = previous + current;
            this.updateScreen(operationValue, operation, current, previous);
         break;
         case "-":
            operationValue = previous - current;
            this.updateScreen(operationValue, operation, current, previous);
         break;
         case "/":
            operationValue = previous / current;
            this.updateScreen(operationValue, operation, current, previous);
         break;
         case "*":
            operationValue = previous / current;
            this.updateScreen(operationValue, operation, current, previous);
         break;
         default:
         return;
        } 
    }

    // change value screen
    updateScreen(
        operationValue = null, 
        operation = null, 
        current= null, 
        previous = null
        ){

      if(operationValue === null){
        this.currentOperationText.innerText += this.currentOperation;}
        else{
            //check if value is zero, if it just add current value
            if(previous === 0){
                operationValue = current;
            }

            //add current value to previous
            this.previousOperationText.innerText = `${operationValue} ${operation}`;
            this.currentOperationText.innerText = "";
        }
    }

    changeOperation(operation){
        
        const mathOperation = ["*","/","+","-"]
      
        if(!mathOperation.includes(operation)){
            return
        }
        this.previousOperationText.innerText = this.previousOperationText.innerText.slice(0, -1) + operation

    }
}

const calc = new Calculator(previousOperationText,currentOperationText);

button.forEach(btn => {
    btn.addEventListener("click", (e) => {
        const value = e.target.innerText;

        if(+value >= 0 || value === ".") { 
            calc.addDigit(value);
         } else {
            calc.processOperation(value);

        }
    });   
});