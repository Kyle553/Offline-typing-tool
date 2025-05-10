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
  const allWordsDOM = document.querySelectorAll(".word");
  let currentWordDOM = allWordsDOM[wordIndex];
  const allCharsDOM = currentWordDOM.querySelectorAll("span");
  let currentCharDOM = allCharsDOM[charIndex];
  
  let currentWord = words[wordIndex];
  function getExtraCharIndex() {
    return extraChars.findIndex((element) => element.indexWord === wordIndex);
  }
  let extraCharIndex = getExtraCharIndex();

  function getUnfinishedWordIndex() {
    return unfinishedWords.findIndex((element) => element.indexWord === wordIndex);
  }
  let unfinishedWordIndex = getUnfinishedWordIndex();
  
  if (event.key === " " && wordIndex < (words.length - 1)) {
    if (charIndex < currentWord.length) {
      currentWordDOM.classList.add("unfinishedWords");

      if (unfinishedWordIndex >= 0) {
        unfinishedWords[unfinishedWordIndex].indexChar = charIndex;
      } else {
        unfinishedWords.push({indexChar: charIndex, indexWord: wordIndex, index: unfinishedWords.length});   
      }
      console.log(unfinishedWords);
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
      
      extraCharIndex = getExtraCharIndex();
      if (extraCharIndex >= 0) {
        charIndex = extraChars[extraCharIndex].indexChar + 1;
        return
      }
      
      let unfinishedChar = null
      currentWordDOM = allWordsDOM[wordIndex];
      if (currentWordDOM.classList.contains("unfinishedWords")) {
        unfinishedChar = unfinishedWords.find((element) => element.indexWord === wordIndex)?.indexChar;

        charIndex = unfinishedChar;
      }

      unfinishedChar === null ? charIndex = currentWord.length : null;
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
      const className = currentWord[charIndex] === event.key ? "correct" : "incorrect";
      currentCharDOM.classList.add(className);
      charIndex += 1;
      return;
  } else {
    const createdExtraSpan = document.createElement("span");
    createdExtraSpan.textContent = event.key;
    createdExtraSpan.classList.add("incorrect", "extra");
    currentWordDOM.appendChild(createdExtraSpan);

    if (extraCharIndex >= 0) {
      extraChars[extraCharIndex].indexChar = charIndex;
    } else {
      extraChars.push({indexChar: charIndex, indexWord: wordIndex});
    }

    charIndex += 1;
  }
}