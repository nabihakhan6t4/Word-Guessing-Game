const words = [
  "cat",
  "dog",
  "apple",
  "banana",
  "orange",
  "elephant",
  "giraffe",
  "computer",
  "tree",
  "pyramid",
  "moon",
  "unicorn",
  "mountain",
  "dolphin",
  "lion",
  "mango",
  "kiwi",
  "tiger",
];

let randomWord;
let guessedLetters = [];
let incorrectGuesses = 0; // To track incorrect guesses

// Function to start a new game
function newGame() {
  randomWord = words[Math.floor(Math.random() * words.length)];
  guessedLetters = [];
  incorrectGuesses = 0;
  displayWord();
  setMessage("");
  document.getElementById("hintMessage").innerText = "";
}

// Function to display the current state of the word with underscores for unguessed letters
function displayWord() {
  let wordDisplay = "";
  for (let letter of randomWord) {
    if (guessedLetters.includes(letter)) {
      wordDisplay += letter + " ";
    } else {
      wordDisplay += "_ ";
    }
  }
  document.getElementById("wordDisplay").innerHTML = wordDisplay.trim();
}

// Function to handle user guess
function guessLetter() {
  let guessInput = document.getElementById("guessInput").value.toLowerCase();
  if (guessInput.length !== 1 || !/[a-z]/.test(guessInput)) {
    setMessage("Please enter a valid single letter.");
    return;
  }

  if (guessedLetters.includes(guessInput)) {
    setMessage(
      `You already guessed "${guessInput.toUpperCase()}". Try another letter.`
    );
    return;
  }

  guessedLetters.push(guessInput);
  if (!randomWord.includes(guessInput)) {
    incorrectGuesses++; // Increment incorrect guesses if the letter is wrong
  }

  displayWord();
  checkWin();
  provideHint(); // Call provideHint function to show hint if needed
  document.getElementById("guessInput").value = "";
}

// Function to provide a hint after a certain number of wrong guesses
function provideHint() {
  if (incorrectGuesses >= 3) {
    const remainingLetters = randomWord
      .split("")
      .filter((letter) => !guessedLetters.includes(letter));
    if (remainingLetters.length > 0) {
      const hintLetter =
        remainingLetters[Math.floor(Math.random() * remainingLetters.length)];
      document.getElementById(
        "hintMessage"
      ).innerText = `Hint: Try guessing the letter "${hintLetter.toUpperCase()}".`;
    }
  }
}

// Function to check if the player has guessed the whole word
function checkWin() {
  if (randomWord.split("").every((letter) => guessedLetters.includes(letter))) {
    setMessage(
      `Congratulations! You guessed the word: ${randomWord.toUpperCase()}`
    );
    Swal.fire({
      title: "You Win!",
      text: `Congratulations! You guessed the word: ${randomWord.toUpperCase()}`,
      icon: "success",
      confirmButtonText: "Play Again",
    }).then(() => {
      newGame(); // Start a new game after success
    });
  }
}

// Function to set messages displayed to the user
function setMessage(message) {
  document.getElementById("message").innerText = message;
}

// Event listeners for guessing and starting a new game
document.getElementById("guessButton").addEventListener("click", guessLetter);
document.getElementById("newGameButton").addEventListener("click", newGame);

// Start a new game when the page loads
window.onload = newGame;
