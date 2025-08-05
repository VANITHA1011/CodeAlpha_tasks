// Background particles
const canvas = document.getElementById('bgCanvas');
const ctx = canvas.getContext('2d');
let particles = [];
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

class Particle {
  constructor() {
    this.x = Math.random() * canvas.width;
    this.y = Math.random() * canvas.height;
    this.r = Math.random() * 2;
    this.dx = (Math.random() - 0.5) * 0.5;
    this.dy = (Math.random() - 0.5) * 0.5;
  }
  draw() {
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.r, 0, Math.PI * 2);
    ctx.fillStyle = '#00e5ff';
    ctx.fill();
  }
  update() {
    this.x += this.dx;
    this.y += this.dy;
    if (this.x < 0 || this.x > canvas.width) this.dx *= -1;
    if (this.y < 0 || this.y > canvas.height) this.dy *= -1;
    this.draw();
  }
}

function init() {
  particles = [];
  for (let i = 0; i < 120; i++) {
    particles.push(new Particle());
  }
}

let mouse = { x: undefined, y: undefined, radius: 120 };
window.addEventListener('mousemove', function (e) {
  mouse.x = e.x;
  mouse.y = e.y;
});

function animate() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  particles.forEach(p => {
    let dx = p.x - mouse.x;
    let dy = p.y - mouse.y;
    let dist = Math.sqrt(dx * dx + dy * dy);
    if (dist < mouse.radius) {
      p.x += dx / 15;
      p.y += dy / 15;
    }
    p.update();
  });
  requestAnimationFrame(animate);
}

window.addEventListener('resize', () => {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  init();
});

init();
animate();

// Skill bars animate every time they enter viewport
const fills = document.querySelectorAll('.progress-fill');
const obs = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      // Reset width to 0 before animating
      entry.target.style.width = '0';
      setTimeout(() => {
        entry.target.style.width = entry.target.dataset.width;
      }, 100);
    } else {
      // Reset when leaving the viewport
      entry.target.style.width = '0';
    }
  });
}, { threshold: 0.5 });

fills.forEach(f => obs.observe(f));
