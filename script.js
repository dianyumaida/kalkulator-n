const display = document.getElementById("screen-display");
let clickTimer = null;
let isManualEdit = false;

let rumusBarisIni = ""; 
let riwayatHitunganHTML = ""; 
let isRecordActive = true; 

function tekan(karakter) {
    if (isManualEdit) return;
    rumusBarisIni += String(karakter);
    renderLayar();
}

function klikTombolPilih() {
    document.getElementById('dropdown-menu').style.display = "block";
}

function toggleFolder(panelId, arrowId) {
    const subPanel = document.getElementById(panelId);
    const arrow = document.getElementById(arrowId);
    
    if (subPanel.style.display === "block") {
        subPanel.style.display = "none";
        arrow.innerText = "▼";
    } else {
        subPanel.style.display = "block";
        arrow.innerText = "▲";
    }
}

function pilihCucu(teksRumus, radioName) {
    const eventTarget = window.event ? window.event.currentTarget : null;
    if (eventTarget) {
        const radio = eventTarget.querySelector('input[type="radio"]');
        if (radio) radio.checked = true;
    }
    tekan(teksRumus);
    setTimeout(function() {
        tutupSemuaMenu();
        document.querySelectorAll(`input[name="${radioName}"]`).forEach(r => r.checked = false);
    }, 180);
}

function pilihOpsiRekord(status, radioId) {
    isRecordActive = status;
    document.getElementById(radioId).checked = true;
    setTimeout(function() {
        tutupSemuaMenu();
    }, 180);
}

function tutupSemuaMenu() {
    document.getElementById('dropdown-menu').style.display = "none";
    document.getElementById('simbol-panel').style.display = "none";
    document.getElementById('sigma-panel').style.display = "none";
    document.getElementById('riwayat-panel').style.display = "none";
    
    document.getElementById('arrow-simbol').innerText = "▼";
    document.getElementById('arrow-sigma').innerText = "▼";
    document.getElementById('arrow-riwayat').innerText = "▼";
}

function hapusRiwayatPermanen(event) {
    if (event) event.stopPropagation(); 
    rumusBarisIni = "";
    riwayatHitunganHTML = "";
    display.innerHTML = "";
    setTimeout(function() {
        tutupSemuaMenu();
    }, 100);
}

function renderLayar() {
    let htmlAktif = rumusBarisIni ? `<div class="calc-row">${rumusBarisIni}</div>` : "";
    display.innerHTML = riwayatHitunganHTML + htmlAktif;
    display.scrollTop = display.scrollHeight;
}

// 🌟 Fungsi Baru: Mengirim salinan angka layar ke dalam Kotak Menu Riwayat PILIH 🌟
function updateHistoryBoxMenu(dataBaru) {
    if (!isRecordActive) return; // Jika status OFF, perekaman riwayat dilewati
    const historyBox = document.getElementById("history-box-content");
    if (historyBox) {
        if (historyBox.innerText.includes("Belum ada riwayat")) {
            historyBox.innerHTML = "";
        }
        historyBox.innerHTML += dataBaru;
        historyBox.scrollTop = historyBox.scrollHeight;
    }
}

// Perbarui fungsi hitungHasil Anda agar terhubung dengan fungsi updateHistoryBoxMenu di atas
function hitungHasil() {
    if (isManualEdit || rumusBarisIni === "") return;
    try {
        let ekspresi = rumusBarisIni;
        let rumusAsli = rumusBarisIni; // Catat rumus sebelum diubah komputer
        
        if (/[Σ∑\u03A3\u2211]$/.test(ekspresi)) {
            ekspresi = ekspresi.slice(0, -1);
        }
        
        if (ekspresi === "" || ekspresi === "+" || ekspresi === "-" || ekspresi === "*" || ekspresi === ":") {
            rumusBarisIni = "";
            renderLayar();
            return;
        }

        ekspresi = ekspresi.replace(/:/g, "/"); 
        ekspresi = ekspresi.replace(/(\d+)\^(\d+)/g, "Math.pow($1,$2)");
        ekspresi = ekspresi.replace(/(\d+)%/g, "($1/100)");
        ekspresi = ekspresi.replace(/(\d+)([Σ∑\u03A3\u2211])/g, "$1*$2");

        ekspresi = ekspresi.replace(/[Σ∑\u03A3\u2211](\d+)/g, function(match, angka) {
            let total = 0; 
            let batas = parseInt(angka) || 0;
            for (let i = 1; i <= batas; i++) { total += i; } 
            return "(" + total + ")";
        });

        ekspresi = ekspresi.replace(/[Σ∑\u03A3\u2211]/g, "0");
        ekspresi = ekspresi.replace(/\+\+/g, "+");
        ekspresi = ekspresi.replace(/\-\-/g, "+");

        let hasil = eval(ekspresi);
        
        let barisRumus = `<div style="font-size:14px; color:#555;">${rumusAsli}</div>`;
        let barisHasil = `<div style="font-size:18px; color:#1a237e; border-bottom:1px dashed #ccc; padding-bottom:3px; margin-bottom:5px;">= ${hasil}</div>`;
        
        if (isRecordActive) {
            riwayatHitunganHTML += `<div class="calc-row">${rumusAsli}</div>`;
            riwayatHitunganHTML += `<div class="calc-row latest-result">= ${hasil}</div>`;
            
            // 🌟 PEREKAMAN RIWAYAT BERJALAN DI SINI (Kirim ke menu PILIH) 🌟
            updateHistoryBoxMenu(barisRumus + barisHasil);
        } else {
            riwayatHitunganHTML = `<div class="calc-row latest-result">= ${hasil}</div>`;
        }
        
        rumusBarisIni = ""; 
        renderLayar();
    } catch(e) {
        rumusBarisIni = "";
        riwayatHitunganHTML += `<div class="calc-row" style="color:red; font-size:22px;">Format Error</div>`;
        renderLayar();
    }
}

// Perbarui juga fungsi hapusRiwayatPermanen agar membersihkan teks kotak riwayat menu PILIH
function hapusRiwayatPermanen(event) {
    if (event) event.stopPropagation(); 
    rumusBarisIni = "";
    riwayatHitunganHTML = "";
    display.innerHTML = "";
    
    // Bersihkan teks di dalam kotak menu riwayat
    const historyBox = document.getElementById("history-box-content");
    if (historyBox) {
        historyBox.innerHTML = "Belum ada riwayat";
    }
    
    setTimeout(function() {
        tutupSemuaMenu();
    }, 100);
}

function aktifkanModeEdit() {
    isManualEdit = !isManualEdit;
    display.contentEditable = isManualEdit ? "true" : "false";
    document.getElementById("btn-edit").innerText = isManualEdit ? "OK" : "EDIT";
    if (isManualEdit) display.focus();
}

function handleClearClick() {
    if (clickTimer == null) {
        clickTimer = setTimeout(function () {
            clickTimer = null;
            if (rumusBarisIni.length > 0) {
                rumusBarisIni = rumusBarisIni.slice(0, -1);
                renderLayar();
            }
        }, 250);
    } else {
        clearTimeout(clickTimer);
        clickTimer = null;
        rumusBarisIni = "";
        riwayatHitunganHTML = "";
        display.innerHTML = "";
    }
}
