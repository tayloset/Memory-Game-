"use strict";

const timer = document.querySelector(".timer");
const startBtn = document.querySelector(".start-btn");

let timeLeft = 60;
let countdownId = 0;

const cardArray = [
  { type: "pumpkin" },
  { type: "witch" },
  { type: "cobweb" },
  { type: "candy" },
  { type: "ghost" },
  { type: "bats" },
];

const shuffle = (array) => {
  let copy = [];
  let n = array.length;
  let i;
  while (n) {
    i = Math.floor(Math.random() * n--);
    copy.push(array.splice(i, 1)[0]);
  }
  return copy;
};
shuffle(cardArray);

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
