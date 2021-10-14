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

{
  /* <div class="flip-card">
  <div class="flip-card-inner">
    <div class="flip-card-front">
    </div>
    <div class="flip-card-back">
          <img src="img_avatar.png" alt="Avatar" style="width:300px;height:300px;">
    </div>
  </div>
</div> */
}

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
    // might need to attach data attribute to flipcardinner that uses type
    flipCardFront.setAttribute("data-type", card.type);
    flipCardBack.append(backImage);
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
  } else {
    clearInterval(countdownId);
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
      console.log("matched");
      matchedCard.push(card);
      console.log(matchedCard);
    } else {
      unmatched();
      console.log("unmatched");
    }
  }
  console.log(openedCards);
};

//for when cards match
const matched = () => {
  disable();
  setTimeout(() => {
    openedCards[0].parentNode.classList.add("match");
    openedCards[1].parentNode.classList.add("match");
    enable();
    openedCards = [];
  }, 1100);
};

//for when cards don't match
const unmatched = () => {
  openedCards[0].parentNode.classList.add("unmatched");
  openedCards[1].parentNode.classList.add("unmatched");
  disable();
  setTimeout(() => {
    openedCards[0].parentNode.classList.remove("flip", "unmatched");
    openedCards[1].parentNode.classList.remove("flip", "unmatched");
    enable();
    openedCards = [];
  }, 1100);
};

const disable = () => {
  Array.prototype.filter.call(openedCards, (card) => {
    card.classList.add("disabled");
  });
};

//enable cards and disable matched cards

const enable = () => {
  Array.prototype.filter.call(openedCards, (card) => {
    card.classList.remove("disabled");
    for (let i = 0; i < matchedCard.length; i++) {
      matchedCard[i].classList.add("disabled");
    }
  });
};

const playGame = (e) => {
  e.preventDefault();
  setInterval(countdown, 1000);
  //card function here
  gameBoard.addEventListener("click", (e) => {
    if (
      e.target.classList.contains("flip-card-front") &&
      openedCards.length < 2
    ) {
      e.target.parentNode.classList.add("flip");
      cardOpen(e.target);
      console.log(e.target);
    }
  });
  startBtn.removeEventListener("click", playGame);
};

startBtn.addEventListener("click", playGame);

resetBtn.addEventListener("click", (e) => {
  window.location.reload();
});
