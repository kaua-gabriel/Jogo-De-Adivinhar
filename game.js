// Número secreto aleatório entre 1 e 100
let secretNumber = Math.floor(Math.random() * 100) + 1;
let attempts = 0;

// Elementos da interface
const guessInput = document.getElementById('guess');
const submitButton = document.getElementById('submit');
const message = document.getElementById('message');
const attemptsDisplay = document.getElementById('attempts');

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

    if (
        resetButton &&
        resetButton.textContent === 'Jogar Novamente'
    ) {
        resetButton.remove();
    }
}



// ==============================
// INICIALIZAÇÃO
// ==============================

guessInput.focus();


// ==============================
// EVENTOS
// ==============================

submitButton.addEventListener(
    'click',
    checkGuess
);


guessInput.addEventListener(
    'keydown',
    (event) => {
        if (event.key === 'Enter') {
            checkGuess();
        }
    }
);