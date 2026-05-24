function showDashboard() {

  if (!main) return;

  main.innerHTML = `
    <div class="card">
      <h2>📊 Dashboard</h2>
      <p>System overview active</p>
    </div>

    <div class="card">
      <h2>⚡ Command Center</h2>

      <input
        id="commandInput"
        placeholder="Type command..."
      />

      <button id="runBtn">Execute</button>
    </div>

    <div class="card" id="commandOutput">
      <h3>Output</h3>
      <p>Waiting for command...</p>
    </div>
  `;

  document
    .getElementById("runBtn")
    .addEventListener("click", runCommand);
}