function showLogs() {

  if (!main) return;

  main.innerHTML = `
    <div class="card">
      <h2>📡 Live Logs</h2>
      <p>System logs monitoring active...</p>
    </div>
  `;
}