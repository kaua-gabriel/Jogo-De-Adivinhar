// Número secreto aleatório entre 1 e 100
let secretNumber = Math.floor(Math.random() * 100) + 1;
let attempts = 0;

// Elementos da interface
const guessInput = document.getElementById('guess');
const submitButton = document.getElementById('submit');
const message = document.getElementById('message');
const attemptsDisplay = document.getElementById('attempts');
const visitCountDisplay = document.getElementById('visit-count');

// Verifica palpite
function checkGuess() {
    const userGuess = Number(guessInput.value);

    // Validação
    if (!userGuess || userGuess < 1 || userGuess > 100) {
        message.textContent = 'Digite um número entre 1 e 100.';
        message.className = 'wrong-low';
        return;
    }

    attempts++;
    attemptsDisplay.textContent = attempts;

    if (userGuess === secretNumber) {
        message.textContent = `🎉 Parabéns! Você acertou o número ${secretNumber}!`;
        message.className = 'correct';
        submitButton.disabled = true;

        // Adiciona botão "Jogar Novamente"
        const resetGameBtn = document.createElement('button');
        resetGameBtn.textContent = 'Jogar Novamente';
        resetGameBtn.style.marginTop = '15px';
        resetGameBtn.addEventListener('click', resetGame);
        message.after(resetGameBtn);

    } else if (userGuess < secretNumber) {
        message.textContent = '🔺 O número é maior!';
        message.className = 'wrong-low';
    } else {
        message.textContent = '🔻 O número é menor!';
        message.className = 'wrong-high';
    }

    guessInput.value = '';
    guessInput.focus();
}

// Reseta o jogo
function resetGame() {
    secretNumber = Math.floor(Math.random() * 100) + 1;
    attempts = 0;
    attemptsDisplay.textContent = attempts;
    message.textContent = '';
    message.className = '';
    guessInput.disabled = false;
    submitButton.disabled = false;
    guessInput.value = '';
    guessInput.focus();

    // Remove o botão "Jogar Novamente" se existir
    const resetButton = message.nextElementSibling;
    if (resetButton && resetButton.textContent === 'Jogar Novamente') {
        resetButton.remove();
    }
}

(() => {
  const canvas = document.getElementById('neon-grid');
  const ctx = canvas.getContext('2d');

  let width, height;
  const gridSize = 50;
  let offsetX = 0;
  let offsetY = 0;
  const speedX = 0.4;
  const speedY = 0.25;

  function resize() {
    width = window.innerWidth;
    height = window.innerHeight;
    canvas.width = width;
    canvas.height = height;
  }
  window.addEventListener('resize', resize);
  resize();

  function drawGrid() {
    ctx.clearRect(0, 0, width, height);

    ctx.strokeStyle = 'rgba(0, 255, 255, 0.15)';
    ctx.lineWidth = 1;

    // Linhas verticais
    for (let x = -offsetX % gridSize; x < width; x += gridSize) {
      ctx.beginPath();
      ctx.moveTo(x, 0);
      ctx.lineTo(x, height);
      ctx.stroke();
    }

    // Linhas horizontais
    for (let y = -offsetY % gridSize; y < height; y += gridSize) {
      ctx.beginPath();
      ctx.moveTo(0, y);
      ctx.lineTo(width, y);
      ctx.stroke();
    }

    // Linhas mais brilhantes pulsando no centro
    const pulseX = width / 2 - offsetX % gridSize;
    const pulseY = height / 2 - offsetY % gridSize;

    ctx.strokeStyle = 'rgba(0, 255, 255, 0.4)';
    ctx.lineWidth = 2;

    ctx.beginPath();
    ctx.moveTo(pulseX, 0);
    ctx.lineTo(pulseX, height);
    ctx.stroke();

    ctx.beginPath();
    ctx.moveTo(0, pulseY);
    ctx.lineTo(width, pulseY);
    ctx.stroke();
  }

  function animate() {
    offsetX += speedX;
    offsetY += speedY;

    drawGrid();
    requestAnimationFrame(animate);
  }

  animate();
})();

// contador de visistas
function updateVisitCount() {
    let visitCount = localStorage.getItem('visitCount');

    visitCount = visitCount ? parseInt(visitCount) + 1 : 1;
    localStorage.setItem('visitCount', visitCount);
    visitCountDisplay.textContent = visitCount;
}

// Inicializa
updateVisitCount();
guessInput.focus();

// Eventos
submitButton.addEventListener('click', checkGuess);
guessInput.addEventListener('keydown', (event) => {
    if (event.key === 'Enter') checkGuess();
});