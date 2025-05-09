const text = "123 All visuals and music in this video ";
// are 100% crafted by talented human artists, without the use of AI. We’re committed to delivering genuine, hand-made creations for our audience to enjoy.
const words = text.trim().split(/\s+/);
let wordIndex = 0;
let charIndex = 0;
let unfinishedWords = [];
let extraChars = [];

const target_char = document.getElementById("target_char");

(function renderText () {
  for (let element of words) {
    const createdDiv = document.createElement("div");
    createdDiv.classList.add("word");
    target_char.appendChild(createdDiv);

    for (let char of element) {
      const createdSpan = document.createElement("span");
      createdSpan.textContent = char;
      createdDiv.appendChild(createdSpan);
    }
  }
})();


// target_char.focus();
// замінити click на focus
target_char.addEventListener("click", () => { 
  //замінити document на target_char
  document.addEventListener("keydown", typingText);
});


function typingText (event) {
  // Зробити глобальними?
  const allWordsDOM = document.querySelectorAll(".word");
  let currentWordDOM = allWordsDOM[wordIndex];
  const allCharsDOM = currentWordDOM.querySelectorAll("span");
  let currentCharDOM = allCharsDOM[charIndex];

  let currentWord = words[wordIndex];

  if (event.key === " " && wordIndex < (words.length - 1)) {
    if (charIndex < currentWord.length) {
      currentWordDOM.classList.add("unfinishedWords");
      unfinishedWords.push({indexChar: charIndex, indexWord: wordIndex});
    }

    wordIndex += 1;
    currentWord = words[wordIndex];
    charIndex = 0;
    return;
  } 

  if (event.key === "Backspace") {
    if (charIndex === 0 && wordIndex > 0) {
      wordIndex -= 1;
      currentWord = words[wordIndex];

      // let extraChar = null
      // Не currentWordDOM на div не накладується extra
      // if (currentWordDOM.classList.contains("extra")) {
      //   extraChar = extraChars.find((element) => element.indexWord === wordIndex);
      //   charIndex = extraChar.indexChar;
      // }
      
      let unfinishedChar = null
      currentWordDOM = allWordsDOM[wordIndex];
      if (currentWordDOM.classList.contains("unfinishedWords")) {
        unfinishedChar = unfinishedWords.find((element) => element.indexWord === wordIndex)?.indexChar;
        charIndex = unfinishedChar;
      }

      unfinishedChar === null || extraChar === null ? charIndex = currentWord.length : null;
      return;
    } 
    
    if (charIndex > 0) { 
      charIndex -= 1;
      currentCharDOM = allCharsDOM[charIndex];

      charIndex < currentWord.length ? currentCharDOM.classList.remove("correct", "incorrect") : currentCharDOM.remove();
      return;
    } 
  }

  if (event.key.length !== 1) {
    return;
  }

  if (charIndex < currentWord.length) {
      const className = currentWord[charIndex] === event.key ? "correct" : "incorrect"
      currentCharDOM.classList.add(className);
      charIndex += 1;
      return;
  } else {
    const createdExtraSpan = document.createElement("span");
    createdExtraSpan.textContent = event.key;
    createdExtraSpan.classList.add("incorrect", "extra")
    currentWordDOM.appendChild(createdExtraSpan);

    extraChars.push({indexChar: charIndex, indexWord: wordIndex, char: event.key})
    charIndex += 1;
  }
}