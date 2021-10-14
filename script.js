"use strict";

const timer = document.querySelector(".timer");
const startBtn = document.querySelector(".start-btn");
const gameBoard = document.querySelector(".gameboard");
const resetBtn = document.querySelector(".reset-btn");

let timeLeft = 60;
let countdownId = 0;

const cardArray = [
  { type: "pumpkin", img: "assets/pumpkin.png" },
  { type: "pumpkin", img: "assets/pumpkin.png" },
  { type: "witch", img: "assets/witch.png" },
  { type: "witch", img: "assets/witch.png" },
  { type: "cobweb", img: "assets/spider-web.png" },
  { type: "cobweb", img: "assets/spider-web.png" },
  { type: "candy", img: "assets/candy.png" },
  { type: "candy", img: "assets/candy.png" },
  { type: "ghost", img: "assets/ghost.png" },
  { type: "ghost", img: "assets/ghost.png" },
  { type: "bats", img: "assets/bats.png" },
  { type: "bats", img: "assets/bats.png" },
];

const questionMark = {
  img: "assets/question-mark.png",
};

const shuffle = (array) => {
  let currentIndex = array.length,
    randomIndex;

  // While there remain elements to shuffle...
  while (currentIndex != 0) {
    // Pick a remaining element...
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;

    // And swap it with the current element.
    [array[currentIndex], array[randomIndex]] = [
      array[randomIndex],
      array[currentIndex],
    ];
  }

  return array;
};

const createCards = (array) => {
  shuffle(array);
  array.forEach((card) => {
    const flipCard = document.createElement("div");
    flipCard.classList.add("flip-card");
    const flipCardInner = document.createElement("div");
    flipCardInner.classList.add("flip-card-inner");
    const flipCardFront = document.createElement("div");
    flipCardFront.classList.add("flip-card-front");
    const flipCardBack = document.createElement("div");
    flipCardBack.classList.add("flip-card-back");
    const backImage = document.createElement("img");
    backImage.setAttribute("src", card.img);
    backImage.classList.add("back-image");
    const frontImage = document.createElement("img");
    frontImage.setAttribute("src", questionMark.img);
    frontImage.classList.add("front-image");
    flipCardFront.setAttribute("data-type", card.type);
    flipCardBack.append(backImage);
    flipCardFront.append(frontImage);
    flipCardInner.append(flipCardFront, flipCardBack);
    flipCard.append(flipCardInner);
    gameBoard.append(flipCard);
  });
};

createCards(cardArray);
let matchedCard = [];

const countdown = () => {
  if (timeLeft > 0 && matchedCard.length < 6) {
    timeLeft--;
    timer.textContent = `Timer: ${timeLeft}`;
  } else if (timeLeft === 0 && matchedCard.length < 6) {
    alert("Time's up! Muahahaha!");
  } else {
    clearInterval(countdownId);
  }
};

const alertWin = () => {
  if (matchedCard.length === 6 && timeLeft > 0) {
    alert("You won!!");
  }
};

let openedCards = [];

console.log(openedCards);
const cardOpen = (card) => {
  openedCards.push(card);

  if (openedCards.length === 2) {
    let cardOne = openedCards[0].getAttribute("data-type");
    let cardTwo = openedCards[1].getAttribute("data-type");
    if (cardOne === cardTwo) {
      matched();
      matchedCard.push(card);
    } else {
      unmatched();
    }
  }
};

//for when cards match
const matched = () => {
  setTimeout(() => {
    openedCards[0].parentNode.classList.add("match");
    openedCards[1].parentNode.classList.add("match");
    // enable();
    openedCards = [];
  }, 1100);
};

//for when cards don't match
const unmatched = () => {
  openedCards[0].parentNode.classList.add("unmatched");
  openedCards[1].parentNode.classList.add("unmatched");
  setTimeout(() => {
    openedCards[0].parentNode.classList.remove("flip", "unmatched");
    openedCards[1].parentNode.classList.remove("flip", "unmatched");
    openedCards = [];
  }, 1100);
};

const playGame = (e) => {
  e.preventDefault();
  setInterval(countdown, 1000);
  gameBoard.addEventListener("click", (e) => {
    if (e.target.classList.contains("front-image") && openedCards.length < 2) {
      e.target.parentNode.parentNode.classList.add("flip");
      cardOpen(e.target.parentNode);
    }
    alertWin();
  });
  startBtn.removeEventListener("click", playGame);
};

startBtn.addEventListener("click", playGame);

resetBtn.addEventListener("click", (e) => {
  window.location.reload();
});
