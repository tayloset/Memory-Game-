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
    flipCardBack.append(backImage);
    flipCardInner.append(flipCardFront, flipCardBack);
    flipCard.append(flipCardInner);
    gameBoard.append(flipCard);
  });
};

createCards(cardArray);

const countdown = () => {
  if (timeLeft > 0) {
    timeLeft--;
    timer.textContent = `Timer: ${timeLeft}`;
  } else {
    clearInterval(countdownId);
  }
};

startBtn.addEventListener("click", (e) => {
  e.preventDefault();
  setInterval(countdown, 1000);

  //card function here
});

gameBoard.addEventListener("click", (e) => {
  if (e.target.classList.contains("flip-card-front")) {
    e.target.parentNode.classList.add("flip");
  }
});

resetBtn.addEventListener("click", (e) => {
  window.location.reload();
});
