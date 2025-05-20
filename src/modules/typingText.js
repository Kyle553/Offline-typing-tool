import { textParser } from "./textParser.js";

const words = textParser();
let wordIndex = 0;
let charIndex = 0;

function typingText(event) {
  const allWordsDOM = document.querySelectorAll(".word");
  let currentWordDOM = allWordsDOM[wordIndex];
  let allCharsDOM = currentWordDOM.querySelectorAll("span");
  let currentCharDOM = allCharsDOM[charIndex];

  let currentWord = words[wordIndex];

  if (event.key === "Backspace") {
    backspace();
    return;
  }

  if (event.key.length === 1) {
    handleChar();
    return;
  }

  function backspace() {
    if (charIndex === 0 && wordIndex > 0) {
      currentCharDOM.classList.remove("word_active");

      wordIndex -= 1;

      currentWord = words[wordIndex];
      charIndex = currentWord.length - 1;

      currentWordDOM = allWordsDOM[wordIndex];
      allCharsDOM = currentWordDOM.querySelectorAll("span");
      currentCharDOM = allCharsDOM[charIndex];
      currentCharDOM.classList.remove("correct", "incorrect");
      currentCharDOM.classList.add("word_active");
      return;
    }

    if (charIndex > 0) {
      if (
        charIndex === (currentWord.length - 1) 
        && wordIndex === (words.length - 1)
        && !currentCharDOM.classList.contains("word_active")
      ) {
        currentCharDOM.classList.remove("correct", "incorrect");
        currentCharDOM.classList.add("word_active");
        return;
      }

      currentCharDOM.classList.remove("word_active");
      charIndex -= 1;
      currentCharDOM = allCharsDOM[charIndex];
      currentCharDOM.classList.remove("correct", "incorrect");
      currentCharDOM.classList.add("word_active");
    }
  };

  function handleChar() {
    let className = "";
    if (
      currentWord[charIndex] === event.key || 
      (event.key === " " && currentWord[charIndex] === "\u00A0")
    ) {
      className = "correct";
    } else {
      className = "incorrect";
    }
    currentCharDOM.classList.add(className);

    if (charIndex < (currentWord.length - 1)) {
      currentCharDOM.classList.remove("word_active");
      charIndex += 1;
      currentCharDOM = allCharsDOM[charIndex];
      currentCharDOM.classList.add("word_active");
      return;
    }

    if (charIndex === (currentWord.length - 1) && wordIndex < (words.length - 1)) {
      currentCharDOM.classList.remove("word_active");
      wordIndex += 1;
      charIndex = 0;  
      currentWordDOM = allWordsDOM[wordIndex];
      allCharsDOM = currentWordDOM.querySelectorAll("span");
      currentCharDOM = allCharsDOM[charIndex];
      currentCharDOM.classList.add("word_active");
    }

    if (charIndex === (currentWord.length - 1) && wordIndex === (words.length - 1)) {
      currentCharDOM.classList.remove("word_active");
    }
  };
}

export { typingText, wordIndex, charIndex};

// після закінчення видаляти івент