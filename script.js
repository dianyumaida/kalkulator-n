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

// Fungsi mengunci operator (+, -, *, /) - FIX PENJUMLAHAN RUN
function tekanOperator(op) {
    // Jika user sedang mengetik manual di mode EDIT, kunci nilainya dulu
    simpanHasilEditManual();
    
    angkaPertama = layarMemori;
    jenisOperator = op;
    statusSiapInputBaru = true; 
}

// Fungsi Eksekusi Matematika (=) - DIJAMIN JALAN
function hitungHasil() {
    simpanHasilEditManual();

    let hasilAkhir = 0;
    const n1 = parseFloat(angkaPertama);
    const n2 = parseFloat(layarMemori);

    if (isNaN(n1) || isNaN(n2)) return;

    const modePersen = document.getElementById("rad-percent").checked;
    const modeSigma = document.getElementById("rad-sigma").checked;

    // Logika Hitung Khusus Modifikasi Radio Button
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
        // Operasi Matematika Standar Utama
        if (jenisOperator === '+') {
            hasilAkhir = n1 + n2;
        } else if (jenisOperator === '-') {
            hasilAkhir = n1 - n2;
        } else if (jenisOperator === '*') {
            hasilAkhir = n1 * n2;
        } else if (jenisOperator === '/') {
            hasilAkhir = n2 !== 0 ? n1 / n2 : "Error Split";
        } else {
            return; // Tidak ada operator yang ditekan
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
    
    // Matikan mode edit jika masih menyala
    elemenLayar.contentEditable = "false";
    tombolEdit.innerText = "EDIT";
    tombolEdit.style.background = "#ffcc00";
    tombolEdit.style.color = "#000000";
    
    cetakKeLayar("0");
}

// ================================================
// FITUR BARU: TOMBOL EDIT BERFUNGSI PENUH
// ================================================
function aktifkanModeEdit() {
    if (elemenLayar.contentEditable === "true") {
        // Jika sedang mode edit lalu ditekan lagi -> Berfungsi jadi SIMPAN
        elemenLayar.contentEditable = "false";
        tombolEdit.innerText = "EDIT";
        tombolEdit.style.background = "#ffcc00";
        tombolEdit.style.color = "#000000";
        simpanHasilEditManual();
    } else {
        // Mengaktifkan mode ketik manual di layar kotak besar
        elemenLayar.contentEditable = "true";
        elemenLayar.focus();
        tombolEdit.innerText = "OK";
        tombolEdit.style.background = "#2ecc71"; // Warna hijau tanda simpan sukses
        tombolEdit.style.color = "#ffffff";
    }
}

// Sinkronisasi teks ketikan tangan ke mesin memori kalkulator
function simpanHasilEditManual() {
    let teksLayar = elemenLayar.innerText.trim();
    if (teksLayar === "" || isNaN(parseFloat(teksLayar))) {
        layarMemori = "0";
    } else {
        layarMemori = teksLayar;
    }
}
