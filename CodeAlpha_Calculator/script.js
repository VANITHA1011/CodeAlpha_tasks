const display = document.getElementById("display");
const ctx = document.getElementById("graphCanvas").getContext("2d");
const themeToggle = document.getElementById("themeToggle");
let chart, justCalculated = false;

function appendChar(char) {
  if (justCalculated) { display.value = ""; justCalculated = false; }
  display.value += char;
}

function clearDisplay() { display.value = ""; }

function deleteChar() { display.value = display.value.slice(0, -1); }

function calculate() {
  try {
    const result = eval(display.value);
    display.value = result;
    justCalculated = true;
  } catch {
    display.value = "Error";
    justCalculated = true;
  }
}

themeToggle.addEventListener("click", () => {
  document.body.classList.toggle("dark");
});

function showTab(id) {
  document.querySelectorAll(".tab-content").forEach(tab => tab.style.display = "none");
  document.getElementById(id).style.display = "block";
}

function plotGraph() {
  const eq = document.getElementById("equation").value;
  const xVals = [], yVals = [];
  for (let x = -10; x <= 10; x += 0.1) {
    try {
      const y = eval(eq.replace(/x/g, `(${x})`)); // Dynamic equation
      xVals.push(x);
      yVals.push(y);
    } catch {
      alert("Invalid equation. Try using Math functions, e.g., Math.sin(x)");
      return;
    }
  }
  if (chart) chart.destroy();
  chart = new Chart(ctx, {
    type: "line",
    data: {
      labels: xVals,
      datasets: [{
        label: `y = ${eq}`,
        data: yVals,
        borderColor: "blue",
        fill: false
      }]
    },
    options: { responsive: true, scales: { x: { display: true }, y: { display: true } } }
  });
}

document.addEventListener("keydown", (e) => {
  const k = e.key;
  if (!isNaN(k) || ["+", "-", "*", "/", ".", "(", ")"].includes(k)) appendChar(k);
  else if (k === "Enter") calculate();
  else if (k === "Backspace") deleteChar();
  else if (k.toLowerCase() === "c") clearDisplay();
});