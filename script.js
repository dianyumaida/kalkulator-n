let currentInput = "";
let previousInput = "";
let operator = null;

const screen = document.getElementById("screen");

function updateScreen(value) {
    screen.innerText = value || "0";
}

function appendNumber(num) {
    if (currentInput === "0") currentInput = "";
    currentInput += num;
    updateScreen(currentInput);
}

function setOperator(op) {
    if (currentInput === "") return;
    if (previousInput !== "") {
        calculate();
    }
    operator = op;
    previousInput = currentInput;
    currentInput = "";
}

function calculate() {
    let result;
    const prev = parseFloat(previousInput);
    const current = parseFloat(currentInput);

    if (isNaN(prev) || isNaN(current)) return;

    // Cek status tombol radio tambahan
    const isPercent = document.getElementById("rad-percent").checked;
    const isSigma = document.getElementById("rad-sigma").checked;

    if (isPercent) {
        // Mode Persen: Contoh menghitung nilai persen dari input sebelumnya
        // Misal: 200 + 10 (dengan radio % aktif) -> 200 + (10% dari 200) = 220
        let percentValue = (current / 100) * prev;
        switch (operator) {
            case '+': result = prev + percentValue; break;
            case '-': result = prev - percentValue; break;
            default: result = percentValue; 
        }
    } else if (isSigma) {
        // Mode Sigma: Contoh melakukan penjumlahan beruntun dari angka X ke Y
        // Misal: input 1 dan 5 -> menjumlahkan 1+2+3+4+5 = 15
        let sum = 0;
        let start = Math.min(prev, current);
        let end = Math.max(prev, current);
        for (let i = start; i <= end; i++) {
            sum += i;
        }
        result = sum;
    } else {
        // Operasi Normal Standar
        switch (operator) {
            case '+': result = prev + current; break;
            case '-': result = prev - current; break;
            case '*': result = prev * current; break;
            case '/': result = current !== 0 ? prev / current : "Error"; break;
            default: return;
        }
    }

    currentInput = result.toString();
    operator = null;
    previousInput = "";
    updateScreen(currentInput);
}

function deleteLast() {
    currentInput = currentInput.slice(0, -1);
    updateScreen(currentInput);
}

function clearAll() {
    currentInput = "";
    previousInput = "";
    operator = null;
    document.getElementById("rad-percent").checked = false;
    document.getElementById("rad-sigma").checked = false;
    updateScreen("0");
}
