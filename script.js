const wordText = document.querySelector(".word"),
  hintText = document.querySelector(".hint span"),
  timeText = document.querySelector(".time b"),
  inputField = document.querySelector("input"),
  refreshBtn = document.querySelector(".refresh-word"),
  checkBtn = document.querySelector(".check-word");

let correctWord, timer;

const initTimer = (maxTime) => {
  clearInterval(timer);
  timer = setInterval(() => {
    if (maxTime > 0) {
      maxTime--; // decrement maxTime by -1
      return (timeText.innerText = maxTime);
    }
    //alert(`Time Up! ${correctWord.toUpperCase()} was the correct word`);
    initGame(); //calling initGame function, so the game restarts
  }, 1000);
};

const initGame = () => {
  initTimer(30); // calling initTimer function with passing 30 as maxTime value
  let randomObj = words[Math.floor(Math.random() * words.length)]; // getting random objects from words
  let wordArray = randomObj.word.split("");
  for (let i = wordArray.length - 1; i > 0; i--) {
    let j = Math.floor(Math.random() * (i + 1)); //getting random number
    // shuffling and swiping wordarray letters randomly
    [wordArray[i], wordArray[j]] = [wordArray[j], wordArray[i]];
  }
  wordText.innerHTML = wordArray.join(""); // passing shuffled word as word text
  hintText.innerHTML = randomObj.hint; // passing random object hint as hint text
  correctWord = randomObj.word.toLowerCase(); // passing random word to correctWord
  inputField.value = "";
  inputField.setAttribute("maxlength", correctWord.length); //setting input maxlength attr to correct word length
};

initGame();

const checkWord = () => {
  let userWord = inputField.value.toLowerCase(); // getting user value
  if (!userWord) return alert("Please enter a correct word"); // if user didn't put anything in the input

  // if user word doesn't matches with the correct word
  if (userWord !== correctWord)
    return alert(`OOPS! ${userWord} is not a correct word`);

  // if abouve two if conditions are failed then show congrats alert because user has guessed the word
  alert(`Congrats! ${userWord} is a correct word`);
  initGame();
};

refreshBtn.addEventListener("click", initGame);
checkBtn.addEventListener("click", checkWord);
