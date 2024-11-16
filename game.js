// Variáveis iniciais
let secretNumber = Math.floor(Math.random() * 100) + 1; // Número aleatório entre 1 e 100
let attempts = 0;

// Elementos da página
const guessInput = document.getElementById('guess');
const submitButton = document.getElementById('submit');
const message = document.getElementById('message');
const attemptsDisplay = document.getElementById('attempts');

// Função para verificar o palpite
function checkGuess() {
    const userGuess = Number(guessInput.value);
    attempts++;
    attemptsDisplay.textContent = attempts;

    if (userGuess === secretNumber) {
        message.textContent = `Parabéns! Você acertou o número ${secretNumber}!`;
        message.style.color = 'green';
        submitButton.disabled = true; // Desabilita o botão após acertar
    } else if (userGuess < secretNumber) {
        message.textContent = 'O número é maior!';
        message.style.color = 'orange';
    } else if (userGuess > secretNumber) {
        message.textContent = 'O número é menor!';
        message.style.color = 'orange';
    }

    guessInput.value = ''; // Limpa o campo de entrada
    guessInput.focus(); // Foca de novo no campo
}

// Evento de clique no botão
submitButton.addEventListener('click', checkGuess);

// Opcional: Permite pressionar "Enter" para adivinhar
guessInput.addEventListener('keydown', (event) => {
    if (event.key === 'Enter') {
        checkGuess();
    }
});