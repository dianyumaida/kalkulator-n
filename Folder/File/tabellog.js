<!DOCTYPE html>
<html lang="id">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Kalkulator & Tabel Logaritma Interaktif (1-100)</title>
    <style>
        :root {
            --primary: #2563eb;
            --primary-hover: #1d4ed8;
            --bg: #f8fafc;
            --card-bg: #ffffff;
            --text: #1e293b;
            --border: #e2e8f0;
            --success: #16a34a;
        }

        body {
            font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
            background-color: var(--bg);
            color: var(--text);
            margin: 0;
            padding: 20px;
            display: flex;
            flex-direction: column;
            align-items: center;
        }

        .container {
            max-width: 1100px;
            width: 100%;
        }

        h1, h2 {
            text-align: center;
            color: #0f172a;
            margin-bottom: 10px;
        }

        .card {
            background: var(--card-bg);
            padding: 24px;
            border-radius: 12px;
            box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
            margin-bottom: 24px;
            border: 1px solid var(--border);
        }

        /* Layout Kalkulator Atas */
        .calc-box {
            display: flex;
            flex-direction: column;
            align-items: center;
            gap: 15px;
            background: #f1f5f9;
            padding: 20px;
            border-radius: 8px;
            border: 1px solid var(--border);
        }

        .input-group {
            display: flex;
            align-items: center;
            gap: 10px;
            font-size: 18px;
            font-weight: bold;
        }

        input[type="number"] {
            padding: 10px;
            border: 2px solid var(--border);
            border-radius: 6px;
            font-size: 16px;
            width: 120px;
            text-align: center;
        }

        input[type="number"]:focus {
            border-color: var(--primary);
            outline: none;
        }

        button {
            background: var(--primary);
            color: white;
            padding: 10px 24px;
            border: none;
            border-radius: 6px;
            font-size: 16px;
            font-weight: bold;
            cursor: pointer;
            transition: background 0.2s;
        }

        button:hover {
            background: var(--primary-hover);
        }

        /* Box Tampilan Hasil */
        .result-display {
            margin-top: 10px;
            font-size: 20px;
            font-weight: bold;
            color: var(--success);
            text-align: center;
            min-height: 30px;
        }

        /* Pengaturan Layout Tabel */
        .table-grid {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
            gap: 20px;
            margin-top: 15px;
        }

        .table-responsive {
            overflow-x: auto;
            background: white;
            border-radius: 8px;
            border: 1px solid var(--border);
        }

        table {
            width: 100%;
            border-collapse: collapse;
            text-align: left;
        }

        th, td {
            padding: 10px 12px;
            border-bottom: 1px solid var(--border);
            font-size: 14px;
        }

        th {
            background-color: #e2e8f0;
            color: #334155;
            font-weight: 600;
        }

        tr:hover {
            background-color: #f0fdf4;
            cursor: pointer;
        }

        /* Radio Styling di Tabel */
        .td-radio {
            text-align: center;
            width: 40px;
        }

        input[type="radio"] {
            width: 18px;
            height: 18px;
            accent-color: var(--primary);
            cursor: pointer;
            margin: 0;
            vertical-align: middle;
        }

        .highlight-text {
            font-family: 'Courier New', Courier, monospace;
            font-weight: bold;
            color: #0284c7;
        }
    </style>
</head>
<body>

<div class="container">
    <h1>Kalkulator & Tabel Logaritma Interaktif</h1>
    
    <!-- PANEL HITUNG UTAMA -->
    <div class="card">
        <h2>Kalkulator Logaritma Berbasis 10 (Log<sub>10</sub>)</h2>
        <div class="calc-box">
            <div class="input-group">
                <label for="numInput">Nilai log ( n ) = </label>
                <input type="number" id="numInput" value="1" min="0.0001" step="any" oninput="hitungLogManual()">
            </div>
            <div id="logResult" class="result-display">Hasil: log(1) = 0.0000</div>
        </div>
    </div>

    <!-- TABEL DATA LENGKAP -->
    <div class="card">
        <h2>Tabel Referensi Logaritma (n = 1 sampai 100)</h2>
        <p style="text-align: center; font-size: 14px; color: #64748b; margin-bottom: 15px;">
            💡 <b>Tips:</b> Klik tombol radio atau baris manapun pada tabel untuk memasukkan nilai bilangan langsung ke kalkulator.
        </p>
        
        <div class="table-grid" id="tablesContainer">
            <!-- JavaScript akan memecah data tabel ke dalam 3 kolom besar agar rapi secara visual -->
        </div>
    </div>
</div>

<script>
    // Data Array mentah sesuai data tabel log(n) 1-100 yang Anda berikan
    const logData = [
        {n: 1, val: "0,0000"}, {n: 2, val: "0,3010"}, {n: 3, val: "0,4771"}, {n: 4, val: "0,6021"}, {n: 5, val: "0,6990"},
        {n: 6, val: "0,7782"}, {n: 7, val: "0,8451"}, {n: 8, val: "0,9031"}, {n: 9, val: "0,9542"}, {n: 10, val: "1,0000"},
        {n: 11, val: "1,0414"}, {n: 12, val: "1,0792"}, {n: 13, val: "1,1139"}, {n: 14, val: "1,1461"}, {n: 15, val: "1,1761"},
        {n: 16, val: "1,2041"}, {n: 17, val: "1,2304"}, {n: 18, val: "1,2553"}, {n: 19, val: "1,2788"}, {n: 20, val: "1,3010"},
        {n: 21, val: "1,3222"}, {n: 22, val: "1,3424"}, {n: 23, val: "1,3617"}, {n: 24, val: "1,3802"}, {n: 25, val: "1,3979"},
        {n: 26, val: "1,4150"}, {n: 27, val: "1,4314"}, {n: 28, val: "1,4472"}, {n: 29, val: "1,4624"}, {n: 30, val: "1,4771"},
        {n: 31, val: "1,4914"}, {n: 32, val: "1,5051"}, {n: 33, val: "1,5185"}, {n: 34, val: "1,5315"}, {n: 35, val: "1,5441"},
        {n: 36, val: "1,5563"}, {n: 37, val: "1,5682"}, {n: 38, val: "1,5798"}, {n: 39, val: "1,5911"}, {n: 40, val: "1,6021"},
        {n: 41, val: "1,6128"}, {n: 42, val: "1,6232"}, {n: 43, val: "1,6335"}, {n: 44, val: "1,6435"}, {n: 45, val: "1,6532"},
        {n: 46, val: "1,6628"}, {n: 47, val: "1,6721"}, {n: 48, val: "1,6812"}, {n: 49, val: "1,6902"}, {n: 50, val: "1,6990"},
        {n: 51, val: "1,7076"}, {n: 52, val: "1,7160"}, {n: 53, val: "1,7243"}, {n: 54, val: "1,7324"}, {n: 55, val: "1,7404"},
        {n: 56, val: "1,7482"}, {n: 57, val: "1,7559"}, {n: 58, val: "1,7634"}, {n: 59, val: "1,7709"}, {n: 60, val: "1,7782"},
        {n: 61, val: "1,7853"}, {n: 62, val: "1,7924"}, {n: 63, val: "1,7993"}, {n: 64, val: "1,8062"}, {n: 65, val: "1,8129"},
        {n: 66, val: "1,8195"}, {n: 67, val: "1,8261"}, {n: 68, val: "1,8325"}, {n: 69, val: "1,8388"}, {n: 70, val: "1,8451"},
        {n: 71, val: "1,8513"}, {n: 72, val: "1,8573"}, {n: 73, val: "1,8633"}, {n: 74, val: "1,8692"}, {n: 75, val: "1,8751"},
        {n: 76, val: "1,8808"}, {n: 77, val: "1,8865"}, {n: 78, val: "1,8921"}, {n: 79, val: "1,8976"}, {n: 80, val: "1,9031"},
        {n: 81, val: "1,9085"}, {n: 82, val: "1,9138"}, {n: 83, val: "1,9191"}, {n: 84, val: "1,9243"}, {n: 85, val: "1,9294"},
        {n: 86, val: "1,9345"}, {n: 87, val: "1,9395"}, {n: 88, val: "1,9445"}, {n: 89, val: "1,9494"}, {n: 90, val: "1,9542"},
        {n: 91, val: "1,9590"}, {n: 92, val: "1,9638"}, {n: 93, val: "1,9685"}, {n: 94, val: "1,9731"}, {n: 95, val: "1,9777"},
        {n: 96, val: "1,9823"}, {n: 97, val: "1,9868"}, {n: 98, val: "1,9912"}, {n: 99, val: "1,9956"}, {n: 100, val: "2,0000"}
    ];

    // Merender tabel secara otomatis terbagi menjadi 3 segmen kolom agar hemat ruang layar
    function renderTables() {
        const container = document.getElementById('tablesContainer');
        const itemsPerTable = Math.ceil(logData.length / 3); // Dibagi rata ke 3 blok tabel
        
        let htmlContent = '';
        
        for (let i = 0; i < 3; i++) {
            const start = i * itemsPerTable;
            const end = Math.min(start + itemsPerTable, logData.length);
            
            let tableChunk = `
                <div class="table-responsive">
                    <table>
                        <thead>
                            <tr>
                                <th class="td-radio">Pilih</th>
                                <th>Bilangan (n)</th>
                                <th>Nilai log(n)</th>
                            </tr>
                        </thead>
                        <tbody>`;
            
            for (let j = start; j < end; j++) {
                const item = logData[j];
                tableChunk += `
                    <tr onclick="pilihDariBaris(${item.n}, 'rad-${item.n}')">
                        <td class="td-radio">
                            <input type="radio" name="log-select" id="rad-${item.n}" value="${item.n}" ${item.n === 1 ? 'checked' : ''}>
                        </td>
                        <td><b>${item.n}</b></td>
                        <td class="highlight-text">${item.val}</td>
                    </tr>`;
            }
            
            tableChunk += `</tbody></table></div>`;
            htmlContent += tableChunk;
        }
        
        container.innerHTML = htmlContent;
    }

    // Dipicu saat sebuah baris tabel / radio button di-klik
    function pilihDariBaris(nilaiN, radioId) {
        // Centang radio button target
        document.getElementById(radioId).checked = true;
        
        // Pindahkan nilai ke input box atas
