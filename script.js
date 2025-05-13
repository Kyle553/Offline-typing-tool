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
  function getCharIndex(array, wordIndex) {
    return array.find((element) => element.indexWord === wordIndex)?.indexChar;
  }

  function getElemIndex(array, wordIndex) {
    return array.findIndex((element) => element.indexWord === wordIndex);
  }

  const allWordsDOM = document.querySelectorAll(".word");
  let currentWordDOM = allWordsDOM[wordIndex];
  const allCharsDOM = currentWordDOM.querySelectorAll("span");
  let currentCharDOM = allCharsDOM[charIndex];

  let currentWord = words[wordIndex];
  let unfElementIndex = null;

  if (event.key === " ") {
    spase();
    return;
  }
  
  if (event.key === "Backspace") {
    backspace();
    return;
  }
  
  if (event.key.length === 1) {
    classes();
    return;
  }

  function spase () {
    if (wordIndex === (words.length - 1)) {
      return;
    } 

    if (charIndex < currentWord.length) {
      currentWordDOM.classList.add("unfinishedWords");

      unfElementIndex = getElemIndex(unfinishedWords, wordIndex);
      if (unfElementIndex >= 0) {
        unfinishedWords[unfElementIndex].indexChar = charIndex;
      } else {
        unfinishedWords.push({indexChar: charIndex, indexWord: wordIndex});
      }
    }

    wordIndex += 1;
    currentWord = words[wordIndex];
    charIndex = 0;
  };
  
  function backspace () {
    const unfWord = currentWordDOM.classList.contains("unfinishedWords");
    
    if (wordIndex === 0 && charIndex === 0 && unfWord) {
      currentWordDOM.classList.remove("unfinishedWords");
    }

    if (charIndex === 0 && wordIndex > 0) {
      if (unfWord) {
        currentWordDOM.classList.remove("unfinishedWords");
        unfElementIndex = getElemIndex(unfinishedWords, wordIndex);
        unfinishedWords.splice(unfElementIndex, 1);
      }

      wordIndex -= 1;
      currentWord = words[wordIndex];
      
      let unfCharIndex = null;
      currentWordDOM = allWordsDOM[wordIndex];
      if (unfWord) {
        unfCharIndex = getCharIndex(unfinishedWords, wordIndex);
        charIndex = unfCharIndex;
      }
    
      unfCharIndex === null ? charIndex = currentWord.length : null;
      return;
    } 
    
    if (charIndex > 0) { 
      charIndex -= 1;
      currentCharDOM = allCharsDOM[charIndex];
    
      charIndex < currentWord.length ? currentCharDOM.classList.remove("correct", "incorrect") : currentCharDOM.remove();
    } 
  };
  
  function classes () {
    if (charIndex < currentWord.length) {
      const className = currentWord[charIndex] === event.key ? "correct" : "incorrect";
      currentCharDOM.classList.add(className);
      charIndex += 1;
    } else {
      const createdExtraSpan = document.createElement("span");
      createdExtraSpan.textContent = event.key;
      createdExtraSpan.classList.add("incorrect", "extra");
      currentWordDOM.appendChild(createdExtraSpan);

      extraChars.push({indexChar: charIndex, indexWord: wordIndex});
      charIndex += 1;
    }
  };
}