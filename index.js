let cards = [];
let sum = 0;
let hasBlackJack = false;
let isAlive = false;
let message = " ";

let player = {
  name: " ",
  chips: 100,
};

document
  .getElementById("name-input")
  .addEventListener("keypress", function (event) {
    if (event.key === "Enter") {
      setPlayerName();
    }
  });

let messageEl = document.getElementById("message-el");
let sumEl = document.getElementById("sum-el");
let cardsEl = document.getElementById("cards-el");
let playerEl = document.getElementById("player-el");
let nameInput = document.getElementById("name-input");

function setPlayerName() {
  player.name = nameInput.value;
  updatePlayerChips();
  nameInput.style.display = "none";
}

function winGame() {
  player.chips += 10;
  updatePlayerChips();
}

function loseGame() {
  player.chips -= 5;
  updatePlayerChips();
}

function updatePlayerChips() {
  if (player.name !== " ") {
    playerEl.textContent = player.name + ": £" + player.chips;
    playerEl.style.display = "block";
  } else {
    playerEl.style.display = "none";
  }
}

function getRandomCard() {
  let randomNumer = Math.floor(Math.random() * 13) + 1;
  if (randomNumer > 10) {
    return 10;
  } else if (randomNumer === 1) {
    return 11;
  } else {
    return randomNumer;
  }
}

function startGame() {
  if (player.name === " ") {
    setPlayerName();
  }
  if (player.chips <= 0) {
    message = "You don't have enough chips to play!";
    messageEl.textContent = message;
    return;
  }
  isAlive = true;
  hasBlackJack = false;
  let firstCard = getRandomCard();
  let secondCard = getRandomCard();
  cards = [firstCard, secondCard];
  sum = firstCard + secondCard;

  updatePlayerChips();
  renderGame();
}

function renderGame() {
  cardsEl.textContent = "Cards: ";
  for (let i = 0; i < cards.length; i++) {
    cardsEl.textContent += cards[i] + " ";
  }

  sumEl.textContent = "Sum: " + sum;
  if (sum <= 20) {
    message = "Do you want to draw a new card?";
  } else if (sum === 21) {
    message = "You've got Blackjack!";
    hasBlackJack = true;
    winGame();
  } else {
    message = "You're out of the game!";
    isAlive = false;
    loseGame();
  }
  messageEl.textContent = message;
}

function newCard() {
  if (isAlive && !hasBlackJack) {
    let card = getRandomCard();
    sum += card;
    cards.push(card);
    renderGame();
  }
}

function endGame() {
  isAlive = false;
  hasBlackJack = false;
  cards = [];
  sum = 0;
  player.chips = 100;
  message = "Game over! Press 'Start Game' to play again.";
  messageEl.textContent = message;
  cardsEl.textContent = "Cards: ";
  sumEl.textContent = "Sum: ";
  updatePlayerChips();
}

//netlify - platform to deploy websites - recommended to connect with github

