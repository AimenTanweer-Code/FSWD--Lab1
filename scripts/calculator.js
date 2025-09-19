// Calculator JavaScript functionality

let display = document.getElementById('display');
let currentInput = '';
let operator = '';
let previousInput = '';

function appendToDisplay(value) {
    if (display.value === '0' && value !== '.') {
        display.value = value;
    } else {
        display.value += value;
    }
}

function clearDisplay() {
    display.value = '';
    currentInput = '';
    operator = '';
    previousInput = '';
}

function deleteLast() {
    display.value = display.value.slice(0, -1);
}

function calculate() {
    try {
        // Replace × with * for calculation
        let expression = display.value.replace(/×/g, '*');
        
        // Basic validation to prevent dangerous eval
        if (/^[0-9+\-*/.() ]+$/.test(expression)) {
            let result = eval(expression);
            
            // Handle division by zero and other edge cases
            if (!isFinite(result)) {
                display.value = 'Error';
                return;
            }
            
            // Round to avoid floating point precision issues
            result = Math.round(result * 100000000) / 100000000;
            display.value = result.toString();
        } else {
            display.value = 'Error';
        }
    } catch (error) {
        display.value = 'Error';
    }
}

// Keyboard support
document.addEventListener('keydown', function(event) {
    const key = event.key;
    
    if (key >= '0' && key <= '9' || key === '.') {
        appendToDisplay(key);
    } else if (key === '+' || key === '-' || key === '/') {
        appendToDisplay(key);
    } else if (key === '*') {
        appendToDisplay('×');
    } else if (key === 'Enter' || key === '=') {
        event.preventDefault();
        calculate();
    } else if (key === 'Escape' || key === 'c' || key === 'C') {
        clearDisplay();
    } else if (key === 'Backspace') {
        deleteLast();
    }
});

// Initialize display
display.value = '';