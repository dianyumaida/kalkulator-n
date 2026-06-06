let formulaDisplay = document.getElementById('formula-display');
let resultDisplay = document.getElementById('result-display');
let currentInput = '';
let activeMode = null;

function append(value) {
    currentInput += value;
    formulaDisplay.value = currentInput;
}

function clearAll() {
    currentInput = '';
    activeMode = null;
    formulaDisplay.value = '';
    resultDisplay.value = '0';
}

function insertRadioValue() {
    const selectedRadio = document.querySelector('input[name="calc-option"]:checked');
    if (selectedRadio) {
        const val = selectedRadio.value;
        if (val === 'integral' || val === 'sigma') {
            setMode(val);
        } else if (val === '%') {
            processPercent();
        } else {
            append(val);
        }
    }
}

function processPercent() {
    if (currentInput) {
        try {
            let tokens = currentInput.split(/([\+\-\*\/])/);
            let lastToken = tokens.pop();
            if (!isNaN(lastToken) && lastToken !== '') {
                let percentValue = parseFloat(lastToken) / 100;
                currentInput = tokens.join('') + percentValue;
                formulaDisplay.value = currentInput;
            }
        } catch (e) {
            resultDisplay.value = 'Error %';
        }
    }
}

function setMode(mode) {
    activeMode = mode;
    if (mode === 'integral') {
        currentInput = '∫(0,5)[20000*e^(-0.08*t)]';
    } else if (mode === 'sigma') {
        currentInput = '∑(t=1,4)[10000/(1+0.1)^t]';
    }
    formulaDisplay.value = currentInput;
}

function calculate() {
    try {
        let expression = currentInput;

        if (activeMode === 'integral') {
            let f = (t) => 20000 * Math.exp(-0.08 * t);
            let a = 0, b = 5, n = 1000, h = (b - a) / n;
            let sum = 0.5 * (f(a) + f(b));
            for (let i = 1; i < n; i++) sum += f(a + i * h);
            resultDisplay.value = (sum * h).toFixed(2) + " (PV Kontinu)";
            return;
        }

        if (activeMode === 'sigma') {
            let total = 0;
            let cashFlow = 10000;
            let rate = 0.1;
            for (let t = 1; t <= 4; t++) {
                total += cashFlow / Math.pow(1 + rate, t);
            }
            resultDisplay.value = total.toFixed(2) + " (Total NPV)";
            return;
        }

        if (expression.includes('°')) {
            expression = expression.replace(/(\d+)(?=°)/g, (match) => {
                return (parseFloat(match) * Math.PI / 180).toFixed(6);
            });
            expression = expression.replace(/°/g, '');
        }

        if (expression.includes('^')) {
            let parts = expression.split('^');
            expression = `Math.pow(${parts}, ${parts})`;
        }

        let finalResult = Function('"use strict";return (' + expression + ')')();
        if (finalResult !== undefined) {
            resultDisplay.value = Number(finalResult.toFixed(4)).toString();
        }
    } catch (error) {
        resultDisplay.value = 'Syntax Error';
    }
}
