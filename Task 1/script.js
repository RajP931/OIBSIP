const expressionDisplay = document.getElementById('expression');
const resultDisplay = document.getElementById('result');
const themeButton = document.getElementById('themeButton');
const calculator = document.querySelector('.calculator');
let currentExpression = '';
let isDarkMode = false;

function appendToDisplay(value) {
    currentExpression += value;
    expressionDisplay.textContent = currentExpression;
    calculatePreview();
}

function clearDisplay() {
    currentExpression = '';
    expressionDisplay.textContent = '';
    resultDisplay.textContent = '0';
}

function backspace() {
    currentExpression = currentExpression.slice(0, -1);
    expressionDisplay.textContent = currentExpression;
    if (currentExpression === '') {
        resultDisplay.textContent = '0';
    } else {
        calculatePreview();
    }
}

function calculatePreview() {
    try {
        const result = eval(currentExpression);
        if (isFinite(result)) {
            resultDisplay.textContent = result;
        } else {
            resultDisplay.textContent = 'Error';
        }
    } catch (error) {
        resultDisplay.textContent = calculatePreview();
    }
}

function calculate() {
    try {
        const result = eval(currentExpression);
        if (isFinite(result)) {
            resultDisplay.textContent = result;
            currentExpression = result.toString();
            expressionDisplay.textContent = currentExpression;
        } else {
            resultDisplay.textContent = 'Error';
            setTimeout(clearDisplay, 1000);
        }
    } catch (error) {
        resultDisplay.textContent = '';
        setTimeout(clearDisplay, 1000);
    }
}

function applyPercentage() {
    try {
        const value = parseFloat(currentExpression);
        const result = value / 100;
        currentExpression = result.toString();
        expressionDisplay.textContent = currentExpression;
        resultDisplay.textContent = result;
    } catch (error) {
        resultDisplay.textContent = 'Error';
        setTimeout(clearDisplay, 1000);
    }
}

function toggleTheme() {
    isDarkMode = !isDarkMode;
    if (isDarkMode) {
        calculator.classList.add('dark');
        document.body.classList.add('dark');
        themeButton.textContent = '☀️';
    } else {
        calculator.classList.remove('dark');
        document.body.classList.remove('dark');
        themeButton.textContent = '🌙';
    }
}

// Keyboard input support
document.addEventListener('keydown', (event) => {
    const key = event.key;

    // Numbers and decimal
    if (/^[0-9]$/.test(key)) {
        appendToDisplay(key);
    } else if (key === '.') {
        appendToDisplay('.');
    } else if (key === '0' && event.shiftKey) { // For '00' (Shift + 0)
        appendToDisplay('00');
    }

    // Operators
    else if (key === '+') {
        appendToDisplay('+');
    } else if (key === '-') {
        appendToDisplay('-');
    } else if (key === '*') {
        appendToDisplay('*');
    } else if (key === '/') {
        appendToDisplay('/');
    }

    // Percentage
    else if (key === '%') {
        applyPercentage();
    }

    // Equals (Enter key)
    else if (key === 'Enter') {
        event.preventDefault(); // Prevent form submission if inside a form
        calculate();
    }

    // Clear (Escape key)
    else if (key === 'Escape') {
        clearDisplay();
    }

    // Backspace
    else if (key === 'Backspace') {
        event.preventDefault(); // Prevent browser navigation
        backspace();
    }
});