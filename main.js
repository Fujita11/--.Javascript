'use strict'
{
    const buttons = document.querySelectorAll('button');
    const result = document.querySelector('#result');

    let concatText = "";
    let lastButtonWasOperator = false; 
    let lastButtonWasZero = false;
    
    function buttonPressed(event) {
        const text = event.target.textContent;

        if ((lastButtonWasZero && (text === "0" || Number.isInteger(parseInt(text)))) || (text === "00" && concatText === "")) {
            return;
        }

        if (lastButtonWasOperator && ["+", "-", "*", "/"].includes(text)) {
            return;
        }
        
        if (text === "." && lastButtonWasOperator) {
            return;
        }

        if (text === "=") {
            concatText = eval(concatText);
            lastButtonWasOperator = false;
            lastButtonWasZero = false;
        } else if (text === "AC") {
            concatText = "";
            lastButtonWasOperator = false;
            lastButtonWasZero = false;
        } else {
            if (text === "0" && concatText === "") {
                return;
            } 
            if (concatText === "0") { // 表示が "0" の場合は置き換える
                concatText = text;
            }
            concatText += text;
            if (lastButtonWasOperator && ["+", "-", "*", "/"].includes(text)) {
                return;
            }
            lastButtonWasOperator = !Number.isInteger(parseInt(text));
            lastButtonWasZero = text === "0";
        }
        result.textContent = concatText;
    }

    buttons.forEach(button => button.addEventListener('click',buttonPressed));
}

   