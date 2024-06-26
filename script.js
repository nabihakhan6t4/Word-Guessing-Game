const options = {
  aroma: "Pleasing smell",
  pepper: "Salt's partner",
  halt: "Put a stop to",
  jump: "Rise suddenly",
  shuffle: "Mix cards up",
  combine: "Add; Mix",
  chaos: "Total disorder",
  labyrinth: "Maze",
  disturb: "Interrupt; Upset",
  shift: "Move; Period of word",
  machine: "Device or appliances",
};

// Initial References
const message = document.getElementById("message");
const hintRef = document.querySelector(".hint-ref");
const controlsContainer = document.querySelector(".controls-container");
const startBtn = document.getElementById("start");
const letterContainer = document.getElementById("letter-container");
const userInputSection = document.getElementById("user-input-section");
const result = document.getElementById("result");
const wordDisplay = document.getElementById("word");

let randomWord = "";
let randomHint = "";
let winCount = 0;
let loseCount = 5;

// Generate random value function
const generateRandomValue = (array) => Math.floor(Math.random() * array.length);

// Start game event listener
startBtn.addEventListener("click", () => {
  controlsContainer.classList.add("hide");
  init();
});

// Stop game function
const stopGame = () => {
  controlsContainer.classList.remove("hide");
};

// Generate word function
const generateWord = () => {
  let words = Object.keys(options);
  let randomIndex = generateRandomValue(words);
  randomWord = words[randomIndex].toUpperCase();
  randomHint = options[randomWord.toLowerCase()];
  hintRef.innerText = randomHint;
  console.log(randomWord);
};

// Check if letter is in the word
const checkLetter = (letter) => {
  let found = false;
  let displayWord = wordDisplay.innerText;
  for (let i = 0; i < randomWord.length; i++) {
    if (randomWord[i] === letter) {
      displayWord =
        displayWord.substring(0, i) + letter + displayWord.substring(i + 1);
      found = true;
    }
  }
  wordDisplay.innerText = displayWord;

  if (!displayWord.includes("_")) {
    // All letters guessed correctly
    result.innerText = "Congratulations! You guessed the word.";
    stopGame();
  }

  if (!found) {
    loseCount--;
    message.innerText = `Incorrect guess. ${loseCount} attempts left.`;
    if (loseCount === 0) {
      result.innerText = `Game over. The word was "${randomWord}".`;
      stopGame();
    }
  }
};

// Initialize game function
const init = () => {
  winCount = 0;
  loseCount = 5;
  randomWord = "";
  wordDisplay.innerText = "";
  randomHint = "";
  message.innerText = "";
  userInputSection.innerHTML = "";
  letterContainer.classList.remove("hide");
  letterContainer.innerHTML = "";
  generateWord();

  // For creating letter buttons
  for (let i = 65; i <= 90; i++) {
    let button = document.createElement("button");
    button.classList.add("letters");
    button.innerText = String.fromCharCode(i);
    button.addEventListener("click", () => {
      if (button.classList.contains("disabled")) return;
      button.classList.add("disabled");
      checkLetter(button.innerText);
    });
    letterContainer.appendChild(button);
  }

  for (let i = 0; i < randomWord.length; i++) {
    if (randomWord[i] === " ") {
      wordDisplay.innerText += " ";
    } else {
      wordDisplay.innerText += "_";
    }
    wordDisplay.innerText += " ";
  }
};
