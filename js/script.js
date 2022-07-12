let firstOperand = '';
let secondOperand = '';
let currOperation = null;
let resetScreen = false;


const calcScreenHistory = document.getElementById('calc-history');
const calcScreenCurrent = document.getElementById('calc-current');
const clearBtn = document.getElementById('clearBtn');
const deleteBtn = document.getElementById('deleteBtn');
const negativeBtn = document.getElementById('negativeBtn');
const pointBtn = document.getElementById('pointBtn');
const equalsBtn = document.getElementById('equalsBtn');
const numberBtns = document.querySelectorAll('[data-number]');
const operatorBtns = document.querySelectorAll('[data-operator]');


window.addEventListener('keydown', getKeyboardInput);
equalsBtn.addEventListener('click', evaluate);
clearBtn.addEventListener('click', clear);
deleteBtn.addEventListener('click', deleteOperand);
pointBtn.addEventListener('click', addDecimal);

numberBtns.forEach((button) => {
    button.addEventListener('click', () => appendNumber(button.textContent))
});

operatorBtns.forEach((button) => {
    button.addEventListener('click', () => setOperator(button.textContent))
});

function appendNumber(number) {
    if (calcScreenCurrent.textContent === '0' || resetScreen) {
        clearScreen();
    }
    calcScreenCurrent.textContent += number;
}

function clearScreen() {
    calcScreenCurrent.textContent = '';
    resetScreen = false;
}

function clear() {
    calcScreenCurrent.textContent = 0;
    calcScreenHistory.textContent = '';
    firstOperand = '';
    secondOperand = '';
    currOperation = null;
}

function addDecimal() {
    if (resetScreen) clearScreen();
    if (calcScreenCurrent.textContent === '') {
        calcScreenCurrent.textContent = '0';
    }
    if (calcScreenCurrent.textContent.includes('.')) return;

    calcScreenCurrent.textContent += '.';
}

function deleteOperand() {
    calcScreenCurrent.textContent = calcScreenCurrent.textContent.toString().slice(0, -1);
}

function setOperator(operator) {
    if (currOperation !== null) evaluate();
    firstOperand = calcScreenCurrent.textContent;
    currOperation = operator;
    calcScreenHistory.textContent = `${firstOperand} ${currOperation}`;
    resetScreen = true;
}

function evaluate() {
    if (currOperation === null || resetScreen) return;
    if (currOperation === '÷' && calcScreenCurrent.textContent === '0') {
        alert("You can't divide by 0!");
        return;
    }
    secondOperand = calcScreenCurrent.textContent;
    calcScreenCurrent.textContent = roundResult(operate(currOperation, firstOperand, secondOperand));
    calcScreenHistory.textContent = `${firstOperand} ${currOperation} ${secondOperand} =`;
    currOperation = null;
}

function roundResult(number) {
    return Math.round(number * 1000) / 1000;
}

function getKeyboardInput(e) {
    if (e.key >= 0 && e.key <= 9) appendNumber(e.key);
    if (e.key === '.') addDecimal;
    if (e.key === '=' || e.key === 'Enter') evaluate();
    if (e.key === 'Backspace') deleteOperand();
    if (e.key === 'Escape') clear();
    if (e.key === '+' || e.key === '-' || e.key === '*' || e.key === '/') setOperator(convertOperator(e.key));
}

function convertOperator(keyboardOp) {
    if (keyboardOp === '/') return '÷';
    if (keyboardOp === '*') return '×';
    if (keyboardOp === '-') return '-';
    if (keyboardOp === '+') return '+';
}

function add(a, b) {
    return a + b;
}

function subtract(a, b) {
    return a - b;
}

function multiply(a, b) {
    return a * b;
}

function divide(a, b) {
    return a / b;
}

function operate(operator, a, b) {
    a = Number(a);
    b = Number(b);
    switch (operator) {
        case '+': return add(a, b);

        case '-': return subtract(a, b);

        case '×': return multiply(a, b);

        case '÷':
            if (b === 0) return null;
            else return divide(a, b);

        default:
            return null;
    }
}