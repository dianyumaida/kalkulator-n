let layarMemori = "0";
let angkaPertama = "";
let jenisOperator = "";
let statusSiapInputBaru = false;

const elemenLayar = document.getElementById("screen");
const tombolEdit = document.getElementById("btn-edit");

// Menampilkan angka ke layar kotak kustom
function cetakKeLayar(teks) {
    elemenLayar.innerText = teks;
}

// Fungsi input angka dari tombol fisik kalkulator
function tekanAngka(angka) {
    if (elemenLayar.contentEditable === "true") return; // Kunci tombol bawah jika sedang mengetik manual di layar
    
    if (statusSiapInputBaru) {
        layarMemori = angka;
        statusSiapInputBaru = false;
    } else {
        if (layarMemori === "0") {
            layarMemori = angka;
        } else {
            layarMemori += angka;
        }
    }
    cetakKeLayar(layarMemori);
}

// Fungsi mengunci operator (+, -, *, /)
function tekanOperator(op) {
    simpanHasilEditManual();
    angkaPertama = layarMemori;
    jenisOperator = op;
    statusSiapInputBaru = true; 
}

// Fungsi Eksekusi Matematika (=)
function hitungHasil() {
    simpanHasilEditManual();

    let hasilAkhir = 0;
    const n1 = parseFloat(angkaPertama);
    const n2 = parseFloat(layarMemori);

    // Jika belum memasukkan operator atau angka pertama kosong, abaikan hitungan
    if (jenisOperator === "" || isNaN(n1) || isNaN(n2)) return;

    const modePersen = document.getElementById("rad-percent").checked;
    const modeSigma = document.getElementById("rad-sigma").checked;

    if (modePersen) {
        let nilaiPersen = (n2 / 100) * n1;
        if (jenisOperator === '+') hasilAkhir = n1 + nilaiPersen;
        else if (jenisOperator === '-') hasilAkhir = n1 - nilaiPersen;
        else hasilAkhir = nilaiPersen;
    } else if (modeSigma) {
        let totalSigma = 0;
        let awal = Math.min(n1, n2);
        let akhir = Math.max(n1, n2);
        for (let i = awal; i <= akhir; i++) {
            totalSigma += i;
        }
        hasilAkhir = totalSigma;
    } else {
        // Operasi Standar Utama
        if (jenisOperator === '+') {
            hasilAkhir = n1 + n2;
        } else if (jenisOperator === '-') {
            hasilAkhir = n1 - n2;
        } else if (jenisOperator === '*') {
            hasilAkhir = n1 * n2;
        } else if (jenisOperator === '/') {
            hasilAkhir = n2 !== 0 ? n1 / n2 : "Error";
        }
    }

    layarMemori = hasilAkhir.toString();
    jenisOperator = "";
    angkaPertama = "";
    statusSiapInputBaru = true;
    cetakKeLayar(layarMemori);
}

// Fungsi Tombol DELET (Hapus Backspace)
function hapusSatuAngka() {
    if (elemenLayar.contentEditable === "true") return;
    layarMemori = layarMemori.slice(0, -1);
    if (layarMemori === "") layarMemori = "0";
    cetakKeLayar(layarMemori);
}

// Fungsi Tombol CLEAR (Reset Total)
function bersihkanSemua() {
    layarMemori = "0";
    angkaPertama = "";
    jenisOperator = "";
    statusSiapInputBaru = false;
    document.getElementById("rad-percent").checked = false;
    document.getElementById("rad-sigma").checked = false;
    
    // Matikan mode edit jika masih aktif
    elemenLayar.contentEditable = "false";
    tombolEdit.innerText = "EDIT";
    tombolEdit.style.background = "#ffcc00";
    tombolEdit.style.color = "#000000";
    
    cetakKeLayar("0");
}

// Fitur Tombol EDIT Layar Langsung
function aktifkanModeEdit() {
    if (elemenLayar.contentEditable === "true") {
        // Mode Simpan
        elemenLayar.contentEditable = "false";
        tombolEdit.innerText = "EDIT";
        tombolEdit.style.background = "#ffcc00";
        tombolEdit.style.color = "#000000";
        simpanHasilEditManual();
    } else {
        // Mode Ketik Manual
        elemenLayar.contentEditable = "true";
        elemenLayar.focus();
        tombolEdit.innerText = "OK";
        tombolEdit.style.background = "#2ecc71"; 
        tombolEdit.style.color = "#ffffff";
    }
}

// Sinkronisasi tulisan manual di layar ke memori internal
function simpanHasilEditManual() {
    let teksLayar = elemenLayar.innerText.trim();
    if (teksLayar === "" || isNaN(parseFloat(teksLayar))) {
        layarMemori = "0";
    } else {
        layarMemori = teksLayar;
    }
}
