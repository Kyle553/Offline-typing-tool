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

  function setCharClass(elementDOM, className = null) {
    if (elementDOM.classList.length > 0) {
      elementDOM.classList.remove("word_active", "correct", "incorrect")
    }
  
    if (className) {
      elementDOM.classList.add(className)
      console.log(className, "xxxxxxxxxxxx");
    }
  }
  
  function refreshVariables() {
    currentWordDOM = allWordsDOM[wordIndex];
    allCharsDOM = currentWordDOM.querySelectorAll("span");
    currentCharDOM = allCharsDOM[charIndex];
  }

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
      setCharClass(currentCharDOM, null);

      wordIndex -= 1;

      currentWord = words[wordIndex];
      charIndex = currentWord.length - 1;

      refreshVariables();
      setCharClass(currentCharDOM, "word_active");
      return;
    }

    if (charIndex > 0) {
      if (
        charIndex === (currentWord.length - 1) 
        && wordIndex === (words.length - 1)
        && !currentCharDOM.classList.contains("word_active")
      ) {
        setCharClass(currentCharDOM, "word_active");
        return;
      }

      setCharClass(currentCharDOM, null);
      charIndex -= 1;
      refreshVariables();
      setCharClass(currentCharDOM, "word_active");
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
    console.log(className, "aaaaaa")
    setCharClass(currentCharDOM, className);

    if (charIndex < (currentWord.length - 1)) {

    // ???????????????????????????????????????????????????
      currentCharDOM.classList.remove("word_active")
      charIndex += 1;
      refreshVariables();
      setCharClass(currentCharDOM, "word_active");
      return;
    }

    if (charIndex === (currentWord.length - 1) && wordIndex < (words.length - 1)) {
      setCharClass(currentCharDOM, null);
      wordIndex += 1;
      charIndex = 0;  
      refreshVariables();
      setCharClass(currentCharDOM, "word_active");
      return;
    }

    if (charIndex === (currentWord.length - 1) && wordIndex === (words.length - 1)) {
      setCharClass(currentCharDOM, null);
    }
  };
}

export { typingText, wordIndex, charIndex};

// після закінчення видаляти івент