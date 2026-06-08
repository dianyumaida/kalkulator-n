// Mengambil elemen HTML ke JavaScript
const display = document.getElementById('display');
const tombolPilih = document.getElementById('tombolPilih');
const modalSimbol = document.getElementById('modalSimbol');
const tombolBatal = document.getElementById('tombolBatal');
const formSimbol = document.getElementById('formSimbol');

// ==========================================
// 1. KODE PERINTAH PANGGIL MODAL SIMBOL
// ==========================================
// Ketika tombol "PILIH" diklik, buka jendela modal radio button
tombolPilih.addEventListener('click', () => {
    modalSimbol.showModal(); // Perintah panggil bawaan browser
});

// Jika tombol "Batal" di dalam modal diklik, tutup jendela
tombolBatal.addEventListener('click', () => {
    modalSimbol.close();
});

// ==========================================
// 2. CARA MELETAKKAN SIMBOL KE INDEKS DISPLAY
// ==========================================
// Ketika user memilih salah satu radio button lalu menekan "Masukkan"
formSimbol.addEventListener('submit', (event) => {
    // Cari radio button yang sedang dalam keadaan dicentang (checked)
    const radioTerpilih = document.querySelector('input[name="simbol_mat"]:checked');
    
    // Jika ada radio yang dipilih
    if (radioTerpilih) {
        const simbol = radioTerpilih.value;
        
        // Letakkan simbol ke indeks teks paling akhir di layar display
        display.value = display.value + simbol;
        
        // Reset radio button agar kembali kosong saat modal dibuka lagi
        radioTerpilih.checked = false;
    }
});

// Fungsi tambahan untuk tombol angka standar
function tekanAngka(angka) {
    display.value = display.value + angka;
}

// Fungsi tambahan untuk tombol DELETE (Clear)
function hapusSemua() {
    display.value = "";
}
