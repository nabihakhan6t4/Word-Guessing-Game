// JavaScript
const words = ["apple", "banana", "orange", "grape", "kiwi"]; // Array of words to guess
let randomWord; // Variable to store the randomly selected word
let guessedLetters = []; // Array to store guessed letters

// Function to start a new game
function newGame() {
  randomWord = words[Math.floor(Math.random() * words.length)]; // Pick a random word
  guessedLetters = []; // Clear guessed letters array
  displayWord(); // Display underscores for the new word
  setMessage("");
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
    setMessage("Please enter a single letter from A-Z.");
    return;
  }
  if (guessedLetters.includes(guessInput)) {
    setMessage(
      `You already guessed "${guessInput.toUpperCase()}". Try another letter.`
    );
    return;
  }
  guessedLetters.push(guessInput);
  displayWord();
  checkWin();
  document.getElementById("guessInput").value = "";
}

// Function to check if the player has guessed the whole word
function checkWin() {
  if (randomWord.split("").every((letter) => guessedLetters.includes(letter))) {
    setMessage(
      `Congratulations! You guessed the word: ${randomWord.toUpperCase()}`
    );
  }
}

// Function to set messages displayed to the user
function setMessage(message) {
  document.getElementById("message").innerText = message;
}

// Event listeners
document.getElementById("guessButton").addEventListener("click", guessLetter);
document.getElementById("newGameButton").addEventListener("click", newGame);

// Start a new game when the page loads
window.onload = newGame;
