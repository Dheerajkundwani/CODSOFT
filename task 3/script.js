document.addEventListener("DOMContentLoaded", function() {
    const display = document.getElementById('display');
    const buttons = document.querySelectorAll('.button');
    let currentInput = '';
    let operator = null;
    let firstOperand = null;

    buttons.forEach(button => {
        button.addEventListener('click', function() {
            const action = this.dataset.action;
            const value = this.dataset.value;

            if (action === 'clear') {
                clearDisplay();
            } else if (action === 'backspace') {
                backspace();
            } else if (action === 'equals') {
                calculateResult();
            } else if (value) {
                appendToDisplay(value);
            }
        });
    });

    function clearDisplay() {
        currentInput = '';
        firstOperand = null;
        operator = null;
        display.value = '';
    }

    function backspace() {
        currentInput = currentInput.slice(0, -1);
        display.value = currentInput;
    }

    function appendToDisplay(value) {
        if (['+', '-', '*', '/'].includes(value)) {
            if (firstOperand === null) {
                firstOperand = parseFloat(currentInput);
                operator = value;
                currentInput = '';
            } else {
                calculateIntermediate();
                operator = value;
            }
        } else {
            currentInput += value;
        }
        display.value = currentInput;
    }

    function calculateIntermediate() {
        if (operator && currentInput) {
            const secondOperand = parseFloat(currentInput);
            firstOperand = operate(firstOperand, secondOperand, operator);
            display.value = firstOperand;
            currentInput = '';
        }
    }

    function calculateResult() {
        if (operator && currentInput) {
            calculateIntermediate();
            operator = null;
        }
    }

    function operate(firstOperand, secondOperand, operator) {
        if (operator === '+') return firstOperand + secondOperand;
        if (operator === '-') return firstOperand - secondOperand;
        if (operator === '*') return firstOperand * secondOperand;
        if (operator === '/') return firstOperand / secondOperand;
    }
});
