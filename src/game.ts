type Choice = 'piedra' | 'papel' | 'tijera' | 'lagarto' | 'spock';

const choices: Choice[] = ['piedra', 'papel', 'tijera', 'lagarto', "spock"];

const playerChoiceDisplay = document.getElementById('player-choice')!;
const pcChoiceDisplay = document.getElementById('pc-choice')!;
const playerScoreDisplay = document.getElementById('player-score')!;
const pcScoreDisplay = document.getElementById('pc-score')!;
const tiesDisplay = document.getElementById('ties')!;

let playerScore = 0;
let pcScore = 0;
let ties = 0;

function getRandomChoice(): any {
  const index = Math.floor(Math.random() * choices.length);
  return choices[index];
}

function playRound(playerChoice: Choice) {
  const pcChoice = getRandomChoice();

  playerChoiceDisplay!.textContent = icono(playerChoice) + ' ' + capitalize(playerChoice);
  pcChoiceDisplay!.textContent = icono(pcChoice) + ' ' + capitalize(pcChoice);

  const result = determineWinner(playerChoice, pcChoice);
  if (result === 'win') {
    playerScore++;
    playerScoreDisplay!.textContent = String(playerScore);
  } else if (result === 'lose') {
    pcScore++;
    pcScoreDisplay!.textContent = String(pcScore);
  } else {
    ties++;
    tiesDisplay!.textContent = String(ties);
  }
}

function determineWinner(player: Choice, pc: Choice): 'win' | 'lose' | 'tie' {
  if (player === pc) return 'tie';

  if (
    (player === 'piedra' && pc === 'tijera') ||
    (player === 'papel' && pc === 'piedra') ||
    (player === 'tijera' && pc === 'papel') ||
    (player === 'lagarto' && pc === 'spock') ||
    (player === 'spock' && pc === 'tijera') ||
    (player === 'tijera' && pc === 'lagarto') ||
    (player === 'papel' && pc === 'spock') ||
    (player === 'spock' && pc === 'piedra') ||
    (player === 'lagarto' && pc === 'papel')
  ) {
    return 'win';
  } else {
    return 'lose';
  }
}

function capitalize(word: string) {
  return word.charAt(0).toUpperCase() + word.slice(1);
}

function icono(choice: Choice): string {
  switch (choice) {
    case 'piedra': return '🪨';
    case 'papel': return '📄';
    case 'tijera': return '✂️';
    case 'lagarto': return '🦎';
    case 'spock': return '🖖';
  }
}

// Event listeners
document.querySelectorAll('button[data-choice]').forEach(button => {
  button.addEventListener('click', () => {
    const choice = (button as HTMLButtonElement).dataset.choice as Choice;
    playRound(choice);
  });
});
