


const scene = document.getElementById('scene');
const startBtn = document.getElementById('startBtn');
const scoreEl = document.getElementById('score');
const timeEl = document.getElementById('time');
const missEl = document.getElementById('miss');
const banner = document.getElementById('banner');

let running = false;
let score = 0;
let timeLeft = 30;
let misses = 0;
let spawnTimer, countdownTimer;

function rand(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function showBanner(text) {
  banner.textContent = text;
  banner.classList.add('show');
  setTimeout(() => banner.classList.remove('show'), 1200);
}

function spawnApple() {
  const crowns = document.querySelectorAll('.crown');
  const crown = crowns[rand(0, crowns.length - 1)];

  const crownRect = crown.getBoundingClientRect();
  const sceneRect = scene.getBoundingClientRect();

  const apple = document.createElement('div');
  apple.className = 'apple';

  // Placering INDE i kronen
  const x = rand(crownRect.left + 20, crownRect.right - 40) - sceneRect.left;
  const y = rand(crownRect.top + 10, crownRect.bottom - 30) - sceneRect.top;

  apple.style.left = x + "px";
  apple.style.top = y + "px";

  // Klik for at samle
  apple.addEventListener('click', (e) => {
    if (!running) return;
    score++;
    scoreEl.textContent = score;
    apple.remove();
    showBanner("🍎 Samlet!");
  });

  // Miss
  setTimeout(() => {
    if (!apple.isConnected) return;
    apple.remove();
    misses++;
    missEl.textContent = misses;
    showBanner("Misset æble ❌");
    if (misses >= 5) endGame("For mange misses");
  }, rand(1500, 2500));

  scene.appendChild(apple);
}


function startGame() {
  running = true;
  score = 0;
  timeLeft = 30;
  misses = 0;
  scoreEl.textContent = score;
  timeEl.textContent = timeLeft;
  missEl.textContent = misses;

  // Fjern gamle æbler
  document.querySelectorAll('.apple').forEach(a => a.remove());

  showBanner('Klik på æblerne!');
  startBtn.textContent = 'Spiller...';
  startBtn.disabled = true;

  spawnTimer = setInterval(spawnApple, 1200);

  countdownTimer = setInterval(() => {
    timeLeft--;
    timeEl.textContent = timeLeft;
    if (timeLeft <= 0) endGame('Tiden er gået ⏱️');
  }, 1000);
}

function endGame(reason) {
  running = false;
  clearInterval(spawnTimer);
  clearInterval(countdownTimer);
  startBtn.textContent = 'Start igen';
  startBtn.disabled = false;
  showBanner(`${reason} — Score: ${score}`);
}

startBtn.addEventListener('click', () => {
  if (!running) startGame();
});
