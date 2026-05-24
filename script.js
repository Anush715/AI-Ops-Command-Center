// =============================
// AI OPS COMMAND CENTER (CLEAN VERSION)
// =============================


// -----------------------------
// GLOBAL STATE
// -----------------------------

console.log("Script loaded successfully");
let systemRunning = false;
let requestCount = 0;
let main;


// -----------------------------
// AI ELEMENTS (will be created after DOM loads)
// -----------------------------
let aiCard;
let statusCard;


// -----------------------------
// AI RESPONSES
// -----------------------------
const aiResponses = [
  "Analyzing system load patterns...",
  "Optimizing API response pipeline...",
  "No critical issues detected.",
  "Running background diagnostics...",
  "System performance is stable.",
  "Rebalancing server load..."
];


// -----------------------------
// ALERTS DATA
// -----------------------------
const alerts = [
  "High CPU usage detected!",
  "Memory usage spike!",
  "Network latency increased!",
  "System operating normally"
];


// -----------------------------
// MAIN INITIALIZATION
// -----------------------------
document.addEventListener("DOMContentLoaded", function () {

   main = document.querySelector(".main");
  


  // -------------------------
  // SYSTEM STATUS CARD
  // -------------------------
  const statusBox = document.createElement("div");
  statusBox.classList.add("card");
  statusBox.innerHTML = `
    <h2>System Status</h2>
    <p>🟢 All systems operational</p>
  `;
  main.appendChild(statusBox);
  statusCard = statusBox;


  // -------------------------
  // AI RESPONSE CARD
  // -------------------------
  const aiBox = document.createElement("div");
  aiBox.classList.add("card");
  aiBox.innerHTML = `
    <h2>AI Response Console</h2>
    <p>Waiting for input...</p>
  `;
  main.appendChild(aiBox);
  aiCard = aiBox;


  // -------------------------
  // COUNTER CARD
  // -------------------------
  const counterBox = document.createElement("div");
  counterBox.classList.add("card");
  counterBox.innerHTML = `
    <h2>📊 Request Counter</h2>
    <p id="counter">0 requests processed</p>
  `;
  main.appendChild(counterBox);


  // -------------------------
  // LOGS CARD
  // -------------------------
  const logBox = document.createElement("div");
  logBox.classList.add("card");
  logBox.innerHTML = `
    <h2>📜 System Logs</h2>
    <ul id="logList"></ul>
  `;
  main.appendChild(logBox);


  // -------------------------
  // CONTROLS CARD
  // -------------------------
  const controlBox = document.createElement("div");
  controlBox.classList.add("card");
  controlBox.innerHTML = `
    <h2>🎛️ System Controls</h2>
    <button id="startBtn">Start System</button>
    <button id="stopBtn">Stop System</button>
  `;
  main.appendChild(controlBox);


  // -------------------------
  // BUTTON EVENTS
  // -------------------------
  controlBox.querySelector("#startBtn").addEventListener("click", function () {
  systemRunning = true;
  addLog("🟢 System Started");
});

controlBox.querySelector("#stopBtn").addEventListener("click", function () {
  systemRunning = false;
  addLog("🔴 System Stopped");
});

const navItems = document.querySelectorAll(".nav-item");

navItems.forEach(item => {
  item.addEventListener("click", function () {

    // remove active from all
    navItems.forEach(i => i.classList.remove("active"));

    // add active to clicked
    this.classList.add("active");

    const page = this.getAttribute("data-page");

    if (page === "dashboard") showDashboard();
    if (page === "logs") showLogs();
    if (page === "alerts") showAlerts();
    if (page === "ai") showAI();

    addLog("📌 Switched to " + page);

  });
});

  // -------------------------
  // START SYSTEM LOOPS
  // -------------------------
  startAI();
  startCounter();
  startStatus();
  startAlerts();
});


// =============================
// LOG FUNCTION (SINGLE SOURCE)
// =============================
function addLog(message) {
  const list = document.getElementById("logList");
  if (!list) return;

  const li = document.createElement("li");
  li.textContent = message;

  list.prepend(li);

  // keep only last 5 logs
  if (list.children.length > 5) {
    list.removeChild(list.lastChild);
  }
}


// =============================
// AI SYSTEM
// =============================
function startAI() {
  setInterval(() => {
    if (!systemRunning) return;

    const response =
      aiResponses[Math.floor(Math.random() * aiResponses.length)];

    typeEffect("🤖 " + response, aiCard);

    addLog("🤖 AI response generated");

  }, 4000);
}


// =============================
// COUNTER SYSTEM (NO LOGS)
// =============================
function startCounter() {
  setInterval(() => {
    if (!systemRunning) return;

    requestCount++;

    const counter = document.getElementById("counter");
    if (counter) {
      counter.textContent = `${requestCount} requests processed`;
    }

  }, 2500);
}


// =============================
// STATUS SYSTEM (NO LOGS)
// =============================
function startStatus() {
  setInterval(() => {
    if (!systemRunning) return;

    const states = [
      { text: "🟢 All systems operational", color: "lightgreen" },
      { text: "🟡 Performance degraded", color: "orange" },
      { text: "🔴 System under stress", color: "red" }
    ];

    const state = states[Math.floor(Math.random() * states.length)];

    if (statusCard) {
      statusCard.innerHTML = `
        <h2>System Status</h2>
        <p style="color:${state.color}; font-weight:bold;">
          ${state.text}
        </p>
      `;
    }

  }, 4000);
}


// =============================
// ALERT SYSTEM
// =============================
function startAlerts() {
  setInterval(() => {
    if (!systemRunning) return;

    generateAlert();

  }, 5000);
}


// =============================
// ALERT FUNCTION
// =============================
function generateAlert() {

  const alert = alerts[Math.floor(Math.random() * alerts.length)];

  const box = document.createElement("div");
  box.classList.add("card");

  box.innerHTML = `
    <h2>🚨 System Alert</h2>
    <p>${alert}</p>
  `;

  document.querySelector(".main").prepend(box);

  addLog("🚨 Alert generated");

  // auto remove alert
  setTimeout(() => {
    box.remove();
  }, 5000);
}


// =============================
// TYPE EFFECT (AI FEEL)
// =============================
function typeEffect(text, element, i = 0) {
  if (!element) return;

  if (i === 0) {
    element.innerHTML = "<h2>AI Response Console</h2><p></p>";
  }

  if (i < text.length) {
    element.querySelector("p").innerHTML += text.charAt(i);
    setTimeout(() => typeEffect(text, element, i + 1), 30);
  }
}

function runCommand() {
  const inputEl = document.querySelector("#commandInput");

  if (!inputEl) return;

  const input = inputEl.value.trim().toLowerCase();
  const output = document.getElementById("commandOutput");

  let result = "";

  if (input === "status") {
    result = "🟢 System operational";
  }

  else if (input === "logs") {
    result = "📡 Opening logs...";
    showLogs();
  }

  else if (input === "ai") {
    result = "🧠 AI system active...";
    showAI();
  }

  else {
    result = "❌ Unknown command: " + input;
  }

  if (output) {
    output.innerHTML = `
      <h3>Output</h3>
      <p>${result}</p>
    `;
  }
}