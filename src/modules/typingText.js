import { textParser } from "./textParser.js";
import { i } from "../utils/indexes.js";
// import { domElements, refreshVariables } from "../utils/elementsDOM.js";
import { setClassDOM } from "../utils/setClassDOM.js";

const words = textParser();

// let { allWordsDOM, currentWordDOM, allCharsDOM, currentCharDOM } = domElements;
const allWordsDOM = document.querySelectorAll(".word");
let currentWordDOM = allWordsDOM[i.word];
let allCharsDOM = currentWordDOM.querySelectorAll("span");
let currentCharDOM = allCharsDOM[i.char];

// експортувати =================================
function refreshVariables() {
  currentWordDOM = allWordsDOM[i.word];
  allCharsDOM = currentWordDOM.querySelectorAll("span");
  currentCharDOM = allCharsDOM[i.char];
}

function typingText(event) {
  currentWordDOM = allWordsDOM[i.word];
  allCharsDOM = currentWordDOM.querySelectorAll("span");
  currentCharDOM = allCharsDOM[i.char];

  let currentWord = words[i.word];

  if (event.key === "Backspace") {
    backspace();
    return;
  }

  if (event.key.length === 1) {
    handleChar();
    return;
  }

  function backspace() {
    if (i.char === 0 && i.word > 0) {
      setClassDOM(currentCharDOM, null, "word_active");

      i.word -= 1;

      currentWord = words[i.word];
      i.char = currentWord.length - 1;

      refreshVariables();
      setClassDOM(currentCharDOM, "word_active", ["correct", "incorrect"]);
      return;
    }

    if (i.char > 0) {
      if (
        i.char === (currentWord.length - 1) 
        && i.word === (words.length - 1)
        && !currentCharDOM.classList.contains("word_active")
      ) {
        setClassDOM(currentCharDOM, "word_active", ["correct", "incorrect"]);
        return;
      }

      setClassDOM(currentCharDOM, null, "word_active");
      i.char -= 1;
      refreshVariables();
      setClassDOM(currentCharDOM, "word_active", ["correct", "incorrect"]);
    }
  };

  function handleChar() {

    const className = 
      currentWord[i.char] === event.key  
      || (event.key === " " && currentWord[i.char] === "\u00A0")
      ? "correct"
      : "incorrect";

    setClassDOM(currentCharDOM, className, null);

    if (i.char < (currentWord.length - 1)) {
      setClassDOM(currentCharDOM, null, "word_active");
      i.char += 1;
      refreshVariables();
      setClassDOM(currentCharDOM, "word_active", null);
      return;
    }

    if (i.char === (currentWord.length - 1) && i.word < (words.length - 1)) {
      setClassDOM(currentCharDOM, null, "word_active");
      i.word += 1;
      i.char = 0;  
      refreshVariables();
      setClassDOM(currentCharDOM, "word_active", null);
      return;
    }

    if (i.char === (currentWord.length - 1) && i.word === (words.length - 1)) {
      setClassDOM(currentCharDOM, null, "word_active");
    }
  };
};

export { typingText, currentCharDOM };

// після закінчення видаляти івент