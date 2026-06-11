let currentInput = "0";
let previousInput = "";
let operator = null;
let isEditMode = false;

const screen = document.getElementById("screen");
const btnEdit = document.getElementById("btn-edit");

// Fungsi memperbarui teks di layar kotak besar
function updateScreen(value) {
    screen.innerText = value;
}

// Input angka lewat tombol klik kalkulator
function appendNumber(num) {
    if (isEditMode) return; // Kunci tombol fisik kalkulator jika sedang mode edit ketik
    if (currentInput === "0") {
        currentInput = num;
    } else {
        currentInput += num;
    }
    updateScreen(currentInput);
}

// Menentukan operator hitung (+, -, *, /)
function setOperator(op) {
    if (isEditMode) syncFromScreen(); 
    if (currentInput === "") return;
    
    if (previousInput !== "") {
        calculate();
    }
    
    operator = op;
    previousInput = currentInput;
    currentInput = ""; 
}

// Fungsi Hitung (=)
function calculate() {
    if (isEditMode) syncFromScreen();
    
    let result;
    const prev = parseFloat(previousInput);
    const current = parseFloat(currentInput);

    if (isNaN(prev) || isNaN(current)) return;

    const isPercent = document.getElementById("rad-percent").checked;
    const isSigma = document.getElementById("rad-sigma").checked;

    if (isPercent) {
        let percentValue = (current / 100) * prev;
        switch (operator) {
            case '+': result = prev + percentValue; break;
            case '-': result = prev - percentValue; break;
            default: result = percentValue; 
        }
    } else if (isSigma) {
        let sum = 0;
        let start = Math.min(prev, current);
        let end = Math.max(prev, current);
        for (let i = start; i <= end; i++) {
            sum += i;
        }
        result = sum;
    } else {
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

// Tombol DELET
function deleteLast() {
    if (isEditMode) return;
    currentInput = currentInput.slice(0, -1);
    if (currentInput === "") currentInput = "0";
    updateScreen(currentInput);
}

// Tombol CLEAR
function clearAll() {
    currentInput = "0";
    previousInput = "";
    operator = null;
    document.getElementById("rad-percent").checked = false;
    document.getElementById("rad-sigma").checked = false;
    if (isEditMode) toggleEditMode();
    updateScreen("0");
}

// FITUR BARU: Mengaktifkan / mematikan mode edit layar secara langsung
function toggleEditMode() {
    isEditMode = !isEditMode;
    if (isEditMode) {
        screen.contentEditable = "true";
        screen.classList.add("editing-active");
        btnEdit.innerText = "SIMPAN";
        btnEdit.style.background = "#4CAF50";
        btnEdit.style.color = "white";
        screen.focus();
    } else {
        screen.contentEditable = "false";
        screen.classList.remove("editing-active");
        btnEdit.innerText = "EDIT";
        btnEdit.style.background = "#ffcc00";
        btnEdit.style.color = "black";
        syncFromScreen();
    }
}

// Sinkronisasi teks hasil ketikan manual di layar ke sistem matematika internal
function syncFromScreen() {
    currentInput = screen.innerText.trim();
    if (currentInput === "") currentInput = "0";
}
