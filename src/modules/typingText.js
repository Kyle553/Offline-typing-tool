import { separatedWordsSpaces } from "../utils/textParser.js";
import { isCorrect } from "./elementsDOM.js";
import { setClasses, containsClasses } from "../utils/classManagerDOM.js";

const words = separatedWordsSpaces();


function typingText(event, index, newDOM) {
  let currentWord = words[index.currentWord()];

  function isLastCharOfLastWord() {
    return index.currentChar() === (currentWord.length - 1) && index.currentWord() === (words.length - 1) ? true : false;
  }

  if (event.key === "Backspace") {
    backspace();
    return;
  }

  if (event.key.length === 1) {
    handleTypingChar();
    return;
  }

  function backspace() {
    if (index.currentChar() === 0 && index.currentWord() > 0) {
      setClasses(newDOM.currentChar, "word_active");

      index.previousWord();

      currentWord = words[index.currentWord()];
      index.replaceChar(currentWord.length - 1);

      newDOM.refresh();
      setClasses(newDOM.currentChar, ["word_active", isCorrect()]);
      newDOM.currentChar.scrollIntoView({ behavior: "smooth", block: "center" });
      return;
    }

    if (index.currentChar() > 0) {
      if (
        index.currentChar() === (currentWord.length - 1) 
        && index.currentWord() === (words.length - 1)
        && !newDOM.currentChar.classList.contains("word_active")
      ) {
        setClasses(newDOM.currentChar, ["word_active", isCorrect()]);
        return;
      }

      setClasses(newDOM.currentChar, "word_active");
      index.previousChar();
      newDOM.refresh();
      setClasses(newDOM.currentChar, ["word_active", isCorrect()]);
    }
  };

  function handleTypingChar() {
    if (isLastCharOfLastWord() && !containsClasses(newDOM.currentChar, "word_active")) {
      return;
    }

    const charStatusClass = 
      currentWord[index.currentChar()] === event.key  
      || (event.key === " " && currentWord[index.currentChar()] === "\u00A0")
      ? "correct"
      : "incorrect";

    setClasses(newDOM.currentChar, charStatusClass);

    if (index.currentChar() < (currentWord.length - 1)) {
      setClasses(newDOM.currentChar, "word_active");
      index.nextChar();
      newDOM.refresh();
      setClasses(newDOM.currentChar, "word_active");
      return;
    }

    if (index.currentChar() === (currentWord.length - 1) && index.currentWord() < (words.length - 1)) {
      setClasses(newDOM.currentChar, "word_active");
      index.nextWord();
      index.replaceChar(0);  
      newDOM.refresh();
      newDOM.currentChar.scrollIntoView({ behavior: "smooth", block: "center" });
      setClasses(newDOM.currentChar, "word_active");
      return;
    }

    if (isLastCharOfLastWord()) {
      setClasses(newDOM.currentChar, "word_active");
    }
  };
};


export { typingText };