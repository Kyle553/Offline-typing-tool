import { textParser } from "./textParser.js";

const words = textParser();
let wordIndex = 0;
let charIndex = 0;

function setClassDOM(elementDOM, classAdd = null, classRemove = null) {
  const applyClasses = (classes, action) => {
    if (classes !== null && Array.isArray(classes)) {
      for (const className of classes) {
        elementDOM.classList[action](className);
      }
    } else if (typeof classes === "string") {
      elementDOM.classList[action](classes);
    }
  };

  applyClasses(classAdd, "add");
  applyClasses(classRemove, "remove");
}

function typingText(event) {
  const allWordsDOM = document.querySelectorAll(".word");
  let currentWordDOM = allWordsDOM[wordIndex];
  let allCharsDOM = currentWordDOM.querySelectorAll("span");
  let currentCharDOM = allCharsDOM[charIndex];
  
  let currentWord = words[wordIndex];

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
      setClassDOM(currentCharDOM, null, "word_active");

      wordIndex -= 1;

      currentWord = words[wordIndex];
      charIndex = currentWord.length - 1;

      refreshVariables();
      setClassDOM(currentCharDOM, "word_active", ["correct", "incorrect"]);
      return;
    }

    if (charIndex > 0) {
      if (
        charIndex === (currentWord.length - 1) 
        && wordIndex === (words.length - 1)
        && !currentCharDOM.classList.contains("word_active")
      ) {
        setClassDOM(currentCharDOM, "word_active", ["correct", "incorrect"]);
        return;
      }

      setClassDOM(currentCharDOM, null, "word_active");
      charIndex -= 1;
      refreshVariables();
      setClassDOM(currentCharDOM, "word_active", ["correct", "incorrect"]);
    }
  };

  function handleChar() {

    const className = 
      currentWord[charIndex] === event.key  
      || (event.key === " " && currentWord[charIndex] === "\u00A0")
      ? "correct"
      : "incorrect";

    setClassDOM(currentCharDOM, className, null);

    if (charIndex < (currentWord.length - 1)) {
      setClassDOM(currentCharDOM, null, "word_active");
      charIndex += 1;
      refreshVariables();
      setClassDOM(currentCharDOM, "word_active", null);
      return;
    }

    if (charIndex === (currentWord.length - 1) && wordIndex < (words.length - 1)) {
      setClassDOM(currentCharDOM, null, "word_active");
      wordIndex += 1;
      charIndex = 0;  
      refreshVariables();
      setClassDOM(currentCharDOM, "word_active", null);
      return;
    }

    if (charIndex === (currentWord.length - 1) && wordIndex === (words.length - 1)) {
      setClassDOM(currentCharDOM, null, "word_active");
    }
  };
  
  if (charIndex === (currentWord.length - 1) && wordIndex === (words.length - 1)) {
    document.removeEventListener("keydown", typingText);
  }
};

export { typingText, wordIndex, charIndex};

// після закінчення видаляти івент