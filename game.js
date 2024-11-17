// Variáveis iniciais
let secretNumber = Math.floor(Math.random() * 100) + 1; // Número aleatório entre 1 e 100
let attempts = 0;

// Elementos da página
const guessInput = document.getElementById('guess');
const submitButton = document.getElementById('submit');
const message = document.getElementById('message');
const attemptsDisplay = document.getElementById('attempts');
const visitCountDisplay = document.getElementById('visit-count'); // Elemento para mostrar o contador de visitas
const resetButton = document.getElementById('reset'); // Botão para resetar o contador de visitas

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

// Função para contar as visitas
function updateVisitCount() {
    // Verifica se a página já foi visitada anteriormente
    let visitCount = localStorage.getItem('visitCount');
    
    if (visitCount === null) {
        visitCount = 1; // Se for a primeira visita, inicia com 1
    } else {
        visitCount = parseInt(visitCount) + 1; // Caso contrário, incrementa o contador
    }

    // Salva o novo valor no localStorage
    localStorage.setItem('visitCount', visitCount);

    // Exibe o contador de visitas na página
    visitCountDisplay.textContent = visitCount;
}

// Função para resetar o contador de visitas
function resetVisitCount() {
    // Zera o contador no localStorage
    localStorage.setItem('visitCount', 0);

    // Atualiza a exibição do contador na página
    visitCountDisplay.textContent = 0;
}

// Atualiza o contador de visitas ao carregar a página (apenas uma vez)
updateVisitCount();

// Evento de clique no botão
submitButton.addEventListener('click', checkGuess);

// Opcional: Permite pressionar "Enter" para adivinhar
guessInput.addEventListener('keydown', (event) => {
    if (event.key === 'Enter') {
        checkGuess();
    }
});

// Evento de clique para resetar o contador de visitas
resetButton.addEventListener('click', function() {
    resetVisitCount();
    updateVisitCount();  // Reatualiza o contador de visitas após o reset
});