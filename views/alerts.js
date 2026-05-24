function showAlerts() {

  if (!main) return;

  main.innerHTML = `
    <div class="card">
      <h2>🚨 Alerts Panel</h2>
      <p>Monitoring system alerts...</p>
    </div>
  `;
}