* {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
    font-family: 'Segoe UI', sans-serif;
}

body {
    background-color: #0d1117;
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100vh;
    color: #c9d1d9;
}

.calculator-container {
    background-color: #161b22;
    border: 1px solid #30363d;
    border-radius: 12px;
    padding: 20px;
    width: 480px;
    box-shadow: 0 8px 24px rgba(0,0,0,0.5);
}

h2 {
    font-size: 1.1rem;
    text-align: center;
    margin-bottom: 15px;
    color: #58a6ff;
}

.display-section {
    background-color: #0d1117;
    border: 1px solid #30363d;
    border-radius: 6px;
    padding: 10px;
    margin-bottom: 20px;
}

#formula-display, #result-display {
    width: 100%;
    background: transparent;
    border: none;
    text-align: right;
    outline: none;
}

#formula-display { color: #8b949e; font-size: 0.9rem; }
#result-display { color: #ffffff; font-size: 1.8rem; font-weight: bold; margin-top: 5px; }

.main-layout {
    display: flex;
    gap: 15px;
}

.radio-panel {
    flex: 1;
    background-color: #0d1117;
    border: 1px solid #30363d;
    border-radius: 6px;
    padding: 10px;
    display: flex;
    flex-direction: column;
}

.radio-panel h3 {
    font-size: 0.85rem;
    margin-bottom: 8px;
    color: #8b949e;
}

.scrollable {
    max-height: 180px;
    overflow-y: auto;
    display: flex;
    flex-direction: column;
    gap: 6px;
    padding-right: 5px;
}

.scrollable::-webkit-scrollbar { width: 5px; }
.scrollable::-webkit-scrollbar-thumb { background: #30363d; border-radius: 4px; }

label {
    font-size: 0.95rem;
    cursor: pointer;
    display: flex;
    align-items: center;
    gap: 8px;
}

.buttons-grid {
    width: 120px;
    display: flex;
    flex-direction: column;
    gap: 8px;
}

.btn {
    background-color: #21262d;
    border: 1px solid #30363d;
    color: #c9d1d9;
    padding: 12px;
    font-size: 1.1rem;
    border-radius: 6px;
    cursor: pointer;
    transition: background 0.2s;
    text-align: center;
}

.btn:hover { background-color: #30363d; }
.btn-select { background-color: #1f6feb; color: white; font-weight: bold; margin-top: 10px; width: 100%; }
.btn-select:hover { background-color: #388bfd; }
.btn-action { background-color: #da3637; color: white; }
.btn-action:hover { background-color: #f85149; }
.btn-operator { background-color: #ff9800; color: white; }
.btn-operator:hover { background-color: #ffa726; }
.btn-equal { background-color: #238636; color: white; flex-grow: 1; font-weight: bold; }
.btn-equal:hover { background-color: #2ea043; }
